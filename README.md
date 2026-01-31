# 🔐 AI Gesture Password System

ระบบยืนยันตัวตนด้วยท่าทาง (Gesture Password) โดยใช้ AI Teachable Machine ที่ทันสมัยและสวยงาม

## ✨ ฟีเจอร์หลัก

### 🎯 Functional Requirements

✅ **[FR1] Image Classification** - ตรวจจับท่าทาง Real-time จากกล้องเว็บแคม
- รองรับ: Paper (📄), Scissors (✂️), Hammer (🔨), No Action (❌)
- ใช้ TensorFlow.js + Teachable Machine
- Confidence Score ≥ 85%

✅ **[FR2] Sequence Detection** - บันทึกลำดับท่าทาง
- Array: [gesture1, gesture2, gesture3, ...]
- ความยาวมาตรฐาน: 5 ท่า

✅ **[FR3] Password Verification** - ตรวจสอบรหัส
- เปรียบเทียบลำดับที่กรอกกับรหัสที่ตั้งไว้

✅ **[FR4] Access Control** - สถานะการเข้าถึง
- 🔒 Locked / 🔓 Unlocked

✅ **[FR5] Data Logging (Firebase)** - บันทึกประวัติ
- Timestamp, Status, Sequence, Result

✅ **[FR6] Auto-Reset** - รีเซ็ตอัตโนมัติ
- หลังสำเร็จ หรือ หลังล้มเหลว

### ⚡ Non-Functional Requirements

✅ **[NFR1] Accuracy** - Confidence ≥ 85%
✅ **[NFR2] Performance** - Inference ≤ 500ms
✅ **[NFR3] Security** - Debounce ป้องกันรหัสผ่านรัว (300ms)
✅ **[NFR4] Usability** - UI Feedback พร้อม Gesture Indicators

## 🛠️ ติดตั้ง & เตรียมการ

### 1️⃣ สร้าง Teachable Machine Model

1. ไปที่ https://teachablemachine.withgoogle.com/
2. เลือก **Pose Model**
3. สร้าง Classes:
   - **Paper**: ท่ามือเปิด (อ้าปาก)
   - **Scissors**: V ด้วยนิ้ว
   - **Hammer**: หมัดชั้นเดียว
   - **No Action**: ท่าอื่นๆ
4. เก็บตัวอย่าง 20+ รูปต่อ class
5. **Export** → JavaScript (Tensorflow.js)
6. คัดลอก URL ของโมเดล

### 2️⃣ ตั้งค่า Firebase

```javascript
// ใน app.js แก้ไขค่า firebaseConfig:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

📌 ได้มาจาก Firebase Console:
- Project Settings → General
- Copy config values

### 3️⃣ แทน Model URL

```javascript
// ใน app.js, ที่ method init():
const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";
```

### 4️⃣ เปิดใช้ HTTPS

- ใช้ Local: `npx http-server` (พอร์ต 8000)
- หรือ Deploy ที่ Vercel/Netlify (ฟรี!)

## 📁 โครงสร้างไฟล์

```
/
├── index.html          # HTML + Vue Template
├── app.js              # Vue.js Logic + Firebase
├── README.md           # Documentation (ไฟล์นี้)
└── firebase-setup.md   # Firebase Config Guide
```

## 🚀 วิธีเรียกใช้

### Local Development

```bash
# 1. ไปที่ directory
cd /workspaces/AI-SBWworkshop1

# 2. เปิด HTTP Server
npx http-server -p 8000

# 3. เข้าที่ http://localhost:8000
# (หรือ HTTPS ถ้า Deploy)
```

### Deploy ที่ Vercel

```bash
# 1. Push ไปที่ GitHub
git add .
git commit -m "Initial AI Gesture Password"
git push origin main

# 2. Connect ที่ Vercel.com
# - Import repository
# - Deploy (ไม่ต้องการ configuration)
```

## 📊 วิธีใช้งาน

### 🔑 ขั้นตอนการสร้างรหัส

1. คลิก **"สร้างรหัสใหม่"**
2. ทำท่าทาง 5 ท่า ตามลำดับ (ที่ต้องการ)
3. ระบบจะบันทึก: 📄 → ✂️ → 🔨 → 📄 → ✂️
4. ✓ รหัสผ่านสร้างสำเร็จ!

### 🔐 ขั้นตอนปลดล็อก

1. ทำท่าทาง 5 ท่า ให้ตรงกับรหัส
2. ระบบตรวจสอบ
3. ✓ หรือ ✗ ผลลัพธ์

### ⚙️ ควบคุม

- **🔄 ล้างลำดับ** - ยกเลิกท่าทางปัจจุบัน
- **▶️ เปิดกล้อง** - เปิดกล้องเว็บแคม
- **⏹️ ปิดกล้อง** - ปิดกล้อง

## 📈 Monitoring

### Performance Dashboard

| ตัวชี้วัด | ที่อยู่ |
|---------|--------|
| **FPS** | มุมบนซ้ายของกล้อง |
| **Inference Time** | ต้องน้อยกว่า 500ms |
| **Model Status** | ✓ = พร้อม / ⏳ = กำลังโหลด |

### Access History

- **Timestamp** - วันเวลา
- **Status** - ✓ สำเร็จ / ✗ ล้มเหลว
- **Sequence** - ท่าทางที่ทำ
- **Attempt** - ลำดับครั้งที่

## 🐛 Troubleshooting

### ปัญหา: "กล้องไม่ทำงาน"

**วิธีแก้:**
1. ตรวจสอบว่ากล้องเชื่อมต่ออยู่
2. อนุญาต browser เข้าถึงกล้อง
3. ใช้ HTTPS (http-server หรือ Vercel)

### ปัญหา: "Confidence score ต่ำ"

**วิธีแก้:**
1. เก็บตัวอย่าง 30+ รูปต่อ class
2. รวมหลายตำแหน่ง/ที่ ของกล้อง
3. ทำให้ class มีความหลากหลาย

### ปัญหา: "Firebase ไม่ปลดล็อก"

**วิธีแก้:**
1. ตรวจสอบ Config API Keys
2. ดู Browser Console เพื่อ Error
3. ใช้ localStorage Fallback (มี automatic!)

## 🎨 Customization

### เปลี่ยนจำนวนท่าทาง

```javascript
// ใน data():
passwordSequence: ['paper', 'scissors', 'hammer', 'paper', 'scissors'],

// เปลี่ยนความยาว (ตัวอย่าง 4 ท่า):
passwordSequence: ['paper', 'scissors', 'hammer', 'paper'],
```

### เปลี่ยนสีธีม

```html
<!-- ใน index.html, เปลี่ยน Tailwind classes -->
<!-- ปัจจุบัน: bg-gradient-to-br from-slate-900 -->
<!-- เปลี่ยนเป็น: from-purple-900 หรือ from-blue-900 -->
```

### เพิ่ม Sounds

```javascript
// ใน app.js, recordGesture() method:
const audio = new Audio('success.mp3');
audio.play();
```

## 📝 API Reference

### GestureClassifier

```javascript
// Initialize
const classifier = new GestureClassifier();
await classifier.init(videoElement);

// Predict
const prediction = await classifier.predict();
// Returns: { gesture: 'paper', confidence: 0.95 }

// Close
classifier.close();
```

### Firebase Logging

```javascript
// Auto-logged ที่ db.ref('access_logs')
{
    timestamp: 1701234567890,
    status: "success" | "failed",
    sequence: ["paper", "scissors", ...],
    attemptNumber: 1
}
```

## 🌐 Environment Variables

สร้างไฟล์ `.env` (optional):

```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_MODEL_URL=https://teachablemachine.withgoogle.com/...
```

## 📚 Resources

- **Teachable Machine**: https://teachablemachine.withgoogle.com/
- **TensorFlow.js Docs**: https://www.tensorflow.org/js/
- **Firebase Console**: https://console.firebase.google.com/
- **Vue.js 3**: https://vuejs.org/
- **Tailwind CSS**: https://tailwindcss.com/

## 🔒 Security Notes

1. **ไม่เก็บ Passwords ใน Code**
   - ส่วนสำคัญต้องใน Firebase Rules

2. **HTTPS เท่านั้น**
   - ต้องสำหรับ Webcam Access

3. **Rate Limiting**
   - ขณะนี้: 300ms debounce
   - ควรเพิ่ม server-side rate limiting

4. **Data Privacy**
   - ไม่บันทึกรูป เพียง gesture type
   - Timestamp เท่านั้น

## 📝 License

MIT License - ใช้ได้อย่างอิสระ

---

👨‍💻 **สร้างโดย**: AI Gesture Password System
📅 **วันที่**: January 2026
🌟 **เวอร์ชัน**: 1.0.0
