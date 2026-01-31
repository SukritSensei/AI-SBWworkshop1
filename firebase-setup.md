# 🔥 Firebase Setup Guide

## 1️⃣ สร้าง Firebase Project

### ขั้นตอน:

1. ไปที่ https://console.firebase.google.com/
2. คลิก **"Create a project"** หรือ **"Add project"**
3. ป้อนชื่อ project (เช่น "gesture-password-v1")
4. ปิด Google Analytics (ไม่จำเป็น)
5. คลิก **"Create Project"**

## 2️⃣ ได้รับ Firebase Config

### ในหน้า Firebase Console:

1. ไปที่ **Project Settings** (โลโก้เฟืองที่ด้านบน)
2. เลือก tab **"General"**
3. Scroll ลงหา **"Your apps"**
4. ถ้ายังไม่มี app → คลิก **"Web"** (ไอคอน `</> `)
5. ป้อน App Nickname (เช่น "gesture-password-web")
6. ✓ Firebase Hosting (ถ้าต้องการ)
7. คลิก **"Register App"**

### คัดลอก Config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxxxxxxxx",
    authDomain: "gesture-password-v1.firebaseapp.com",
    databaseURL: "https://gesture-password-v1.firebaseio.com",
    projectId: "gesture-password-v1",
    storageBucket: "gesture-password-v1.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefg1234567"
};
```

📌 **สำคัญ:** เก็บ values เหล่านี้ไว้

## 3️⃣ ตั้งค่า Realtime Database

### สร้าง Database:

1. ที่ Firebase Console sidebar → **"Build"** → **"Realtime Database"**
2. คลิก **"Create Database"**
3. เลือก Location (เช่น Southeast Asia: asia-southeast1)
4. เลือก **"Start in test mode"** (สำหรับ Development)
5. คลิก **"Enable"**

### ตั้งค่า Security Rules:

```json
{
  "rules": {
    "access_logs": {
      ".read": true,
      ".write": true,
      "$userid": {
        ".validate": "newData.hasChildren(['timestamp', 'status', 'sequence'])"
      }
    },
    ".read": false,
    ".write": false
  }
}
```

📌 **⚠️ สำหรับ Production:**

```json
{
  "rules": {
    "access_logs": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$logid": {
        ".validate": "newData.hasChildren(['timestamp', 'status', 'sequence', 'userId'])"
      }
    },
    ".read": false,
    ".write": false
  }
}
```

## 4️⃣ แทน Config ใน app.js

### เปิด `/workspaces/AI-SBWworkshop1/app.js`

```javascript
// บรรทัด ~8-17

// ❌ ก่อน:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ✅ หลัง (แทนด้วย config จริง):
const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxxxxxxxx",
    authDomain: "gesture-password-v1.firebaseapp.com",
    databaseURL: "https://gesture-password-v1.firebaseio.com",
    projectId: "gesture-password-v1",
    storageBucket: "gesture-password-v1.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefg1234567"
};
```

## 5️⃣ ทดสอบ Firebase Connection

1. เปิด index.html ใน browser
2. เปิด **Developer Console** (F12)
3. ดู Console tabs
4. ถ้าสำเร็จ → "✓ Model loaded successfully"
5. ลองทำท่าทาง และดู Firebase Logs

### ใน Firebase Console:

- ไปที่ **Realtime Database**
- ดู **Data** tab
- ควรเห็น `access_logs` ที่มี entries

## 6️⃣ Troubleshooting Firebase

### ❌ Error: "Cannot read property 'database' of undefined"

**วิธีแก้:**
1. ตรวจสอบ Firebase Config ถูกต้อง
2. ตรวจสอบ `databaseURL` มี protocol `https://`
3. ทดสอบ connection: 
   ```javascript
   firebase.database().ref('.info/connected').on('value', function(snapshot) {
       console.log('Connected:', snapshot.val());
   });
   ```

### ❌ Error: "Permission denied"

**วิธีแก้:**
1. ตรวจสอบ Security Rules
2. ป้อนใน Realtime Database → **Rules** tab
3. Test ด้วย Simulator

### ❌ Logs ไม่ปรากฏใน Firebase

**วิธีแก้:**
1. ตรวจสอบ browser console ไม่มี errors
2. Network tab → ตรวจสอบ Firebase requests
3. ลองรีโหลด page แล้วทำท่าใหม่

## 7️⃣ Upgrade ไป Production

### ⚠️ ใน Production ต้องมี Authentication

```javascript
// ใน app.js
firebase.auth().signInAnonymously().then((user) => {
    console.log('Signed in:', user.uid);
}).catch((error) => {
    console.error('Auth error:', error);
});
```

### Enable Anonymous Auth:

1. Firebase Console → **Build** → **Authentication**
2. **Sign-up method** tab
3. เปิด **Anonymous**

### Update Security Rules:

```json
{
  "rules": {
    "access_logs": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$logid": {
        "timestamp": { ".validate": "newData.isNumber()" },
        "status": { ".validate": "newData.val() === 'success' || newData.val() === 'failed'" },
        "sequence": { ".validate": "newData.isArray()" },
        "userId": { ".validate": "newData.val() === auth.uid" }
      }
    }
  }
}
```

## 📊 Firebase Data Structure

```
/
└── access_logs/
    └── log_id_1/
        ├── timestamp: 1701234567890
        ├── status: "success"
        ├── sequence: ["paper", "scissors", "hammer", "paper", "scissors"]
        └── attemptNumber: 1
    └── log_id_2/
        ├── timestamp: 1701234568000
        ├── status: "failed"
        ├── sequence: ["paper", "scissors"]
        └── attemptNumber: 2
```

## 🔑 API Keys Best Practices

### ❌ ห้าม:
- ปล่อยใน Code ต่อ GitHub Public Repo
- ใช้ API Keys ของ Production ใน Development
- Share API Keys กับคนอื่น

### ✅ ควร:
- ใช้ `.env` ไฟล์ (เพิ่มใน `.gitignore`)
- Rotate keys เป็นระยะ
- ใช้ Service Accounts สำหรับ Backend
- Enable API Restrictions ใน Google Cloud Console

## 📝 Environment Variables (Advanced)

### สร้าง `.env.local`:

```
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxx
VITE_FIREBASE_PROJECT_ID=gesture-password-v1
```

### ใน app.js:

```javascript
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // ... rest
};
```

📌 ต้อง Webpack/Vite build tool

## 🚀 Deploy กับ Firebase Hosting

### Option 1: Firebase CLI

```bash
# 1. Install
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Init
firebase init hosting

# 4. Deploy
firebase deploy
```

### Option 2: Vercel/Netlify

1. Push ไปที่ GitHub
2. Connect ใน Vercel.com
3. Environment variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
4. Deploy (automatic)

## 📱 Real-time Monitoring

### Dashboard ที่ Firebase Console:

1. **Realtime Database** → **Data**
   - ดู incoming logs

2. **Usage** tab
   - Monitor database reads/writes

3. **Backups**
   - Auto backup enabled

## 🔗 Links

- Firebase Console: https://console.firebase.google.com/
- Firebase Docs: https://firebase.google.com/docs/
- Realtime DB Rules: https://firebase.google.com/docs/database/security/
- Firebase CLI: https://firebase.google.com/docs/cli

---

✅ **ตรวจสอบ Checklist:**

- [ ] Firebase Project สร้างแล้ว
- [ ] Realtime Database เปิดแล้ว
- [ ] Firebase Config คัดลอกลงใน app.js
- [ ] ทดสอบ Logs ปรากฏ
- [ ] Security Rules ตั้งค่าแล้ว
- [ ] Ready for Production ✨
