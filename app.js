const { createApp } = Vue;

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1peOkzCygc6T8Mg4cJV_KxoxUUlJV8QA",
  authDomain: "oguricapiscute.firebaseapp.com",
  databaseURL: "https://oguricapiscute-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oguricapiscute",
  storageBucket: "oguricapiscute.firebasestorage.app",
  messagingSenderId: "37252832489",
  appId: "1:37252832489:web:eee46cd3f4f8523e296478"
};

// Initialize Firebase
let db = null;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log('✓ Firebase initialized');
} catch (error) {
    console.warn('⚠ Firebase not configured. Using local storage only.', error);
}

// Gesture Classifier - Simulated Mode
class GestureClassifier {
    constructor() {
        this.model = null;
        this.webcam = null;
        this.isReady = false;
        this.lastPrediction = null;
        this.lastPredictionTime = 0;
        this.debounceTime = 300; // ms
        this.isSimulated = true;
        this.simulatedGestures = ['paper', 'scissors', 'hammer', 'noaction'];
    }

    async init(videoElement) {
        try {
            this.useSimulatedModel();
            return true;
        } catch (error) {
            console.error('Model init error:', error);
            this.useSimulatedModel();
            return true;
        }
    }

    useSimulatedModel() {
        console.warn('ใช้ Simulated Gesture Detection สำหรับทดสอบ');
        this.isReady = true;
        this.isSimulated = true;
    }

    async predict() {
        if (!this.isReady) return null;

        const now = Date.now();
        if (now - this.lastPredictionTime < this.debounceTime) {
            return this.lastPrediction;
        }

        try {
            const prediction = this.getSimulatedPrediction();
            this.lastPrediction = prediction;
            this.lastPredictionTime = now;
            return prediction;
        } catch (error) {
            console.error('Prediction error:', error);
            return null;
        }
    }

    getSimulatedPrediction() {
        const randomIndex = Math.floor(Math.random() * 100);
        let gesture;

        if (randomIndex < 70) {
            gesture = 'noaction';
        } else {
            gesture = this.simulatedGestures[Math.floor(Math.random() * 3)];
        }

        return {
            gesture: gesture,
            confidence: Math.random() * 0.3 + 0.7
        };
    }

    close() {
        if (this.webcam) {
            this.webcam.stop();
        }
    }
}

// Main Vue App
createApp({
    data() {
        return {
            // Video and Camera
            cameraActive: false,
            videoElement: null,
            
            // Model
            isModelReady: false,
            classifier: null,
            
            // Firebase Auth
            isLoggedIn: false,
            currentUser: null,
            showLoginModal: false,
            loginEmail: '',
            loginPassword: '',
            loginError: '',
            loginSuccess: '',
            
            // Gestures
            currentGesture: null,
            confidence: 0,
            gestureEmoji: {
                'paper': '📄',
                'scissors': '✂️',
                'hammer': '🔨',
                'noaction': '❌'
            },
            
            // Sequences
            currentSequence: [],
            passwordSequence: ['paper', 'scissors', 'hammer', 'paper', 'scissors'],
            isSetupMode: false,
            setupMode: '',
            
            // Status
            isUnlocked: false,
            
            // Performance
            fps: 0,
            inferenceTime: 0,
            lastFrameTime: 0,
            frameCount: 0,
            
            // Firebase & Logging
            accessLogs: [],
            totalAttempts: 0,
            successfulAttempts: 0,
            failedAttempts: 0,
            attemptCount: 0,
            
            // Animation control
            lastGestureTime: 0,
            gestureLockDuration: 500 // ms
        };
    },

    computed: {
        successRate() {
            if (this.totalAttempts === 0) return 0;
            return Math.round((this.successfulAttempts / this.totalAttempts) * 100);
        }
    },

    methods: {
        async init() {
            // Initialize gesture classifier
            this.classifier = new GestureClassifier();
            
            // Check Firebase auth state
            if (firebase && firebase.auth) {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.isLoggedIn = true;
                        this.currentUser = user;
                        console.log('✓ Logged in as:', user.uid);
                    } else {
                        this.isLoggedIn = false;
                        this.currentUser = null;
                    }
                });
            }
            
            // Try to load real model, fall back to simulated
            await this.classifier.init(this.$refs.videoElement);
            
            this.isModelReady = true;
            this.loadAccessLogs();
            this.startCamera();
        },

        async startCamera() {
            try {
                this.videoElement = this.$refs.videoElement;
                
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'user'
                    },
                    audio: false
                });

                this.videoElement.srcObject = stream;
                this.cameraActive = true;
                
                this.videoElement.onloadedmetadata = () => {
                    this.startGestureDetection();
                };
                
                console.log('✓ Camera started');
            } catch (error) {
                console.error('Camera error:', error);
                alert('ไม่สามารถเข้าถึงกล้องได้\n\nกรุณา:\n1. ตรวจสอบว่ากล้องเชื่อมต่ออยู่\n2. อนุญาตให้เข้าถึงกล้อง\n3. หน้านี้ใช้ HTTPS');
            }
        },

        stopCamera() {
            if (this.videoElement && this.videoElement.srcObject) {
                this.videoElement.srcObject.getTracks().forEach(track => track.stop());
                this.cameraActive = false;
                console.log('✓ Camera stopped');
            }
        },

        startGestureDetection() {
            const detect = async () => {
                if (!this.cameraActive) return;

                const startTime = performance.now();

                try {
                    const prediction = await this.classifier.predict();
                    
                    if (prediction && prediction.gesture !== 'noaction' && prediction.confidence > 0.85) {
                        this.currentGesture = prediction.gesture;
                        this.confidence = prediction.confidence;

                        // Debounce gesture recording
                        const now = Date.now();
                        if (now - this.lastGestureTime > this.gestureLockDuration) {
                            this.recordGesture(prediction.gesture);
                            this.lastGestureTime = now;
                        }
                    } else {
                        this.currentGesture = null;
                        this.confidence = 0;
                    }
                } catch (error) {
                    console.error('Detection error:', error);
                }

                const endTime = performance.now();
                this.inferenceTime = Math.round(endTime - startTime);

                // Calculate FPS
                this.frameCount++;
                if (endTime - this.lastFrameTime >= 1000) {
                    this.fps = this.frameCount;
                    this.frameCount = 0;
                    this.lastFrameTime = endTime;
                }

                requestAnimationFrame(detect);
            };

            detect();
        },

        recordGesture(gesture) {
            if (this.isSetupMode) {
                // Setup mode: record gestures for new password
                if (this.passwordSequence.length < 5) {
                    this.passwordSequence.push(gesture);
                    this.showNotification(`✓ บันทึก: ${this.gestureEmoji[gesture]} (${this.passwordSequence.length}/5)`, 'success');
                    
                    if (this.passwordSequence.length >= 5) {
                        this.isSetupMode = false;
                        this.showNotification('✅ รหัสผ่านสร้างแล้ว!', 'success');
                    }
                }
            } else {
                // Normal mode: record gestures for verification
                if (this.currentSequence.length < 5) {
                    this.currentSequence.push(gesture);
                    this.showNotification(`✓ ท่า: ${this.gestureEmoji[gesture]} (${this.currentSequence.length}/5)`, 'success');

                    if (this.currentSequence.length >= this.passwordSequence.length) {
                        this.verifyPassword();
                    }
                }
            }
        },

        verifyPassword() {
            const isCorrect = JSON.stringify(this.currentSequence) === JSON.stringify(this.passwordSequence);
            
            this.attemptCount++;
            this.totalAttempts++;

            if (isCorrect) {
                this.isUnlocked = true;
                this.successfulAttempts++;
                this.logAccess('success', this.currentSequence);
                this.showNotification('🔓 ปลดล็อกสำเร็จ!', 'success');
                
                setTimeout(() => {
                    this.resetSystem();
                }, 2000);
            } else {
                this.failedAttempts++;
                this.logAccess('failed', this.currentSequence);
                this.showNotification('❌ รหัสผ่านไม่ถูกต้อง!', 'error');
                this.clearSequence();
            }
        },

        clearSequence() {
            this.currentSequence = [];
            this.isUnlocked = false;
        },

        resetSystem() {
            this.clearSequence();
            this.isUnlocked = false;
            this.currentGesture = null;
            this.confidence = 0;
        },

        startSetupMode() {
            this.isSetupMode = true;
            this.passwordSequence = [];
            this.showNotification('🔑 โหมดสร้างรหัส เริ่มต้น!', 'info');
        },

        logAccess(status, sequence) {
            const log = {
                timestamp: new Date().toLocaleString('th-TH'),
                status: status,
                sequence: sequence,
                attemptNumber: this.attemptCount
            };

            this.accessLogs.unshift(log);
            
            // Save to localStorage
            localStorage.setItem('accessLogs', JSON.stringify(this.accessLogs));
            
            // Save to Firebase if available
            if (db) {
                try {
                    db.ref('access_logs').push({
                        timestamp: firebase.database.ServerValue.TIMESTAMP,
                        status: status,
                        sequence: sequence,
                        attemptNumber: this.attemptCount
                    }).catch(error => {
                        console.warn('Firebase logging failed:', error);
                    });
                } catch (error) {
                    console.warn('Firebase error:', error);
                }
            }
        },

        loadAccessLogs() {
            const saved = localStorage.getItem('accessLogs');
            if (saved) {
                try {
                    this.accessLogs = JSON.parse(saved);
                    
                    // Calculate statistics
                    this.totalAttempts = this.accessLogs.length;
                    this.successfulAttempts = this.accessLogs.filter(log => log.status === 'success').length;
                    this.failedAttempts = this.totalAttempts - this.successfulAttempts;
                } catch (error) {
                    console.error('Error loading logs:', error);
                }
            }
        },

        formatTime(timeString) {
            return timeString;
        },

        showNotification(message, type) {
            // Create and show a toast notification
            const notification = document.createElement('div');
            notification.className = `fixed top-6 right-6 px-6 py-3 rounded-lg font-semibold text-white z-50 animate-pulse 
                ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`;
            notification.textContent = message;
            document.body.appendChild(notification);

            console.log(`[${type.toUpperCase()}] ${message}`);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        },

        // Firebase Authentication Methods
        async loginAnonymous() {
            try {
                this.loginError = '';
                this.loginSuccess = '';
                const result = await firebase.auth().signInAnonymously();
                this.isLoggedIn = true;
                this.currentUser = result.user;
                this.showLoginModal = false;
                this.showNotification('✓ Logged in as: ' + result.user.uid.substring(0, 8), 'success');
                this.loginSuccess = '✓ Logged in successfully as Anonymous User';
            } catch (error) {
                this.loginError = '❌ Error: ' + error.message;
                this.showNotification('Login failed: ' + error.message, 'error');
                console.error('Login error:', error);
            }
        },

        async loginWithEmail() {
            try {
                this.loginError = '';
                this.loginSuccess = '';

                if (!this.loginEmail || !this.loginPassword) {
                    this.loginError = '❌ Please enter both email and password';
                    return;
                }

                // Try to sign in, or create new account if doesn't exist
                try {
                    const result = await firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword);
                    this.isLoggedIn = true;
                    this.currentUser = result.user;
                    this.showLoginModal = false;
                    this.loginEmail = '';
                    this.loginPassword = '';
                    this.showNotification('✓ Welcome back: ' + this.currentUser.email, 'success');
                    this.loginSuccess = '✓ Signed in successfully';
                } catch (signInError) {
                    // If sign in fails with "user not found", try to create account
                    if (signInError.code === 'auth/user-not-found') {
                        const result = await firebase.auth().createUserWithEmailAndPassword(this.loginEmail, this.loginPassword);
                        this.isLoggedIn = true;
                        this.currentUser = result.user;
                        this.showLoginModal = false;
                        this.loginEmail = '';
                        this.loginPassword = '';
                        this.showNotification('✓ Account created: ' + this.currentUser.email, 'success');
                        this.loginSuccess = '✓ Account created successfully';
                    } else {
                        throw signInError;
                    }
                }
            } catch (error) {
                this.loginError = '❌ Error: ' + error.message;
                this.showNotification('Login failed: ' + error.message, 'error');
                console.error('Email login error:', error);
            }
        },

        async logoutFirebase() {
            try {
                await firebase.auth().signOut();
                this.isLoggedIn = false;
                this.currentUser = null;
                this.showNotification('✓ Logged out successfully', 'success');
            } catch (error) {
                this.showNotification('Logout failed: ' + error.message, 'error');
                console.error('Logout error:', error);
            }
        }
    },

    mounted() {
        this.init();
        
        // Cleanup on unmount
        window.addEventListener('beforeunload', () => {
            this.stopCamera();
            if (this.classifier) {
                this.classifier.close();
            }
        });
    }
}).mount('#app');
