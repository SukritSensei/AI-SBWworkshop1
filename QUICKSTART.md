# 🚀 Quick Start Guide

สตาร์ทระบบ AI Gesture Password ได้ง่ายๆ ใน 5 นาที!

## ⚡ 30 วินาที - Setup เบื้องต้น

```bash
# 1. ไปที่ project directory
cd /workspaces/AI-SBWworkshop1

# 2. เปิด local server
npx http-server -p 8000

# 3. ไปที่ http://localhost:8000
# ✅ ระบบจะทำงาน (mode simulated)
```

## 📋 Checklist ก่อนใช้งาน

- [ ] ขั้น 1: สร้าง Teachable Machine Model
- [ ] ขั้น 2: ตั้งค่า Firebase (optional แต่แนะนำ)
- [ ] ขั้น 3: เปิดใช้กล้องเว็บแคม
- [ ] ขั้น 4: สร้างรหัสผ่าน
- [ ] ขั้น 5: ทดสอบปลดล็อก

## ขั้นที่ 1: 🎓 Teachable Machine (5 นาที)

### ก่อนสำเร็จ:

1. https://teachablemachine.withgoogle.com/
2. สร้าง **Pose Model**
3. สร้าง 4 Classes:
   - Paper (📄)
   - Scissors (✂️)
   - Hammer (🔨)
   - NoAction (❌)
4. เก็บ 20+ ตัวอย่างต่อ class
5. Train Model
6. Export → JavaScript
7. Copy URL

📝 **ต้องการคำแนะนำ?** ดู [teachable-machine.md](teachable-machine.md)

### สำหรับการทดสอบ:

ถ้าไม่อยากตั้ง Teachable Machine ตอนนี้:
- ใช้ **Simulated Mode** ได้เลย
- ระบบจะจำลองท่าทางแบบสุ่ม

## ขั้นที่ 2: 🔥 Firebase (3 นาที - Optional)

### ไม่ต้อง Firebase ได้:
- ใช้ Local Storage แทน
- ประวัติจะเก็บใน browser

### ต้อง Firebase:
1. https://console.firebase.google.com/
2. สร้าง Project
3. สร้าง Realtime Database
4. Copy Config
5. Paste ใน app.js (บรรทัด ~8)

📝 **ต้องการคำแนะนำ?** ดู [firebase-setup.md](firebase-setup.md)

## ขั้นที่ 3: 🔗 Update Model URL

### ใน app.js บรรทัด ~69:

```javascript
// ปัจจุบัน:
const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";

// เปลี่ยนเป็น URL ของคุณ:
const URL = "https://teachablemachine.withgoogle.com/models/abc123def456/";
```

## ขั้นที่ 4: 🚀 เรียกใช้งาน

### Local Development:

```bash
# Terminal 1: เปิด Server
cd /workspaces/AI-SBWworkshop1
npx http-server -p 8000

# Terminal 2: (optional) ดู logs
tail -f ~/.http-server-logs
```

### ไปที่ Browser:

```
http://localhost:8000
```

### ให้ Permission:

```
🔔 Popup "ผอก้อนใช้กล้อง?"
👉 คลิก "อนุญาต"
```

## ขั้นที่ 5: 🔑 สร้างรหัสผ่าน

### ขั้นตอน:

1. เปิด index.html ที่ browser
2. รอ Model โหลด (ป้ายด้านบน: ✓)
3. ยื่นมือหน้ากล้อง
4. คลิก **"🔑 สร้างรหัสใหม่"**
5. ทำท่า 5 ท่า ตามลำดับ:
   - ท่า 1: 📄 (ทำมือเปิด)
   - ท่า 2: ✂️ (ทำวี)
   - ท่า 3: 🔨 (ทำหมัด)
   - ท่า 4: 📄 (ทำมือเปิด)
   - ท่า 5: ✂️ (ทำวี)
6. ✓ รหัสสร้างแล้ว!

### เคล็ดลับ:

```
- ทำท่าชัดๆ หน้ากล้อง
- รอ 2-3 วินาทีระหว่างท่า
- ส่องกล้องให้ทั่ว
- ระดับสว่างดีพอ
```

## ขั้นที่ 6: 🔓 ปลดล็อก

### ขั้นตอน:

1. ทำท่า 5 ท่า ให้ตรงกับรหัส:
   - 📄 → ✂️ → 🔨 → 📄 → ✂️
2. ระบบตรวจสอบ
3. ✅ หรือ ❌ ผลลัพธ์

### ถ้าสำเร็จ:

```
🔓 ปลดล็อกแล้ว!
✓ UNLOCKED
💚 สีเขียว
```

### ถ้าล้มเหลว:

```
🔒 ยังล็อก
✗ LOCKED
❤️ สีแดง
💡 ลองใหม่
```

## 🎮 UI ตัวอักษร

```
🛒 Menu Bar (บน):
  🔐 AI Gesture Password     [สถานะ]  [รีเซ็ต]

📹 Main Area (กลาง-ขวา):
  ┌─ Camera Preview ─────────────┐
  │  📹 Live Webcam Feed        │
  │  [Gesture Display]          │
  │  FPS: 30  Inference: 45ms  │
  └─────────────────────────────┘
  
  📊 Gesture Sequence
  📄 #1  →  ✂️ #2  →  🔨 #3
  ⬤ ⬤ ◌ (3/5)

🔒 Status Sidebar (ขวา):
  ┌─ Status ─────────────────┐
  │   🔒 ล็อก              │
  │   LOCKED                │
  └──────────────────────────┘
  
  🔑 Password Setup
  🔄 ล้างลำดับ
  ▶️ เปิดกล้อง
  
  📈 Stats
  ทั้งหมด: 5
  สำเร็จ: 3
  ล้มเหลว: 2

📋 History (ล่าง):
  [ตารางประวัติการเข้าใช้งาน]
```

## 🔧 Commands ที่สำคัญ

### ล้างลำดับท่า:

```
คลิก: 🔄 ล้างลำดับ
```

### เปิด/ปิดกล้อง:

```
คลิก: ▶️ เปิดกล้อง หรือ ⏹️ ปิดกล้อง
```

### รีเซ็ตระบบ:

```
คลิก: [รีเซ็ต] มุมบนขวา
```

## 📊 Monitoring

### ดู Performance:

```
กล้อง Preview มุมบนขวา:
- FPS: Frame Per Second (ควร 20+)
- Inference: Time (ควร < 500ms)
- Status: ✓ (Model Ready)
```

### ดู Logs:

```
ด้านล่าง: Access History
- Timestamp
- Status (✓/✗)
- Sequence
- Attempt
```

### ดู Console:

```
F12 → Console tab
- ✓ Model loaded successfully
- Errors (ถ้ามี)
```

## 🐛 ทำอะไรถ้า...

### "กล้องไม่ทำงาน"

```
1. F12 → Console ดู Error
2. ตรวจสอบ HTTPS (ต้องใช้ HTTPS)
3. ลอง localhost:8000 ให้ HTTPS
   (ใช้ ngrok หรือ Deploy ก่อน)
4. ตรวจสอบ Permission ของกล้อง
```

### "ระบบเข้าใจท่าไม่ได้"

```
1. ทำท่าชัดๆ
2. ตรวจสอบ Confidence (ควร > 85%)
3. ทำให้กว่าง 0.3 วินาที
4. ต้องเก็บตัวอย่างมากกว่า
5. Re-train Teachable Machine
```

### "Firebase ไม่บันทึก"

```
1. ตรวจสอบ Config ถูก
2. ดู Browser Console → Error
3. ใช้ Local Storage แทน (auto fallback)
4. ไปที่ Firebase Console ตรวจสอบ
```

### "Confidence เกือบ 85% เสมอ"

```
1. ต้องการตัวอย่าง Train มากกว่า
2. เก็บ 50+ ท่าต่อ class
3. หลายท่ากล้อง
4. Re-train model
```

## 🎯 Success Criteria

✅ **ระบบทำงานได้เมื่อ:**

```
1. ✓ Model โหลดสำเร็จ
2. ✓ กล้องเปิดได้
3. ✓ ท่าทางตรวจจับได้
4. ✓ รหัสบันทึกได้
5. ✓ ปลดล็อกได้ (Confidence ≥ 85%)
6. ✓ Logs ปรากฏ
7. ✓ FPS ≥ 20
8. ✓ Inference ≤ 500ms
```

## 📱 วิธี Deploy

### Local (ใช้งานเองได้):

```bash
npx http-server
# http://localhost:8080
```

### Vercel (ฟรี):

```bash
npm install -g vercel
vercel
# → กรอก project details
# → auto deploy
```

### GitHub Pages:

```bash
git push origin main
# → ไปที่ Settings → Pages
# → Deploy
```

### Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📚 Next Steps

1. **ทำให้ดีขึ้น:**
   - [ ] เปลี่ยนท่าทาง (6-10 ท่า)
   - [ ] เพิ่ม Sound Effects
   - [ ] Dark/Light Mode

2. **Advanced Features:**
   - [ ] Multi-user (Firebase Auth)
   - [ ] Statistical Analysis
   - [ ] Mobile Responsive

3. **Production Ready:**
   - [ ] Rate Limiting
   - [ ] Encryption
   - [ ] Backup & Recovery

## 🔗 Links เร็ว

| ที่ต้องไป | URL |
|---------|-----|
| Teachable Machine | https://teachablemachine.withgoogle.com/ |
| Firebase Console | https://console.firebase.google.com/ |
| Local Server | http://localhost:8000 |
| Documentation | [README.md](README.md) |
| Firebase Guide | [firebase-setup.md](firebase-setup.md) |
| TM Guide | [teachable-machine.md](teachable-machine.md) |

## ✅ Final Checklist

- [ ] Model สร้างและโหลดได้
- [ ] Firebase ตั้งค่า (optional)
- [ ] Server เปิดทำงาน
- [ ] กล้องอนุญาต
- [ ] รหัสสร้างแล้ว
- [ ] ปลดล็อกได้
- [ ] Logs บันทึกได้
- [ ] Performance OK (FPS ≥ 20, Inference ≤ 500ms)

---

🎉 **ยินดีด้วย! ระบบพร้อมใช้งานแล้ว!**

---

**⏱️ Time to Setup:**
- ถ้ามี Teachable Machine Model: **2 นาที**
- ถ้าต้องสร้าง Model: **30 นาที**
- ถ้าต้อง Firebase: **+5 นาที**

---

💡 **ชำนำ:** ลองใช้งาน Simulated Mode ก่อน ปล่อย Model URL ไว้ค่า Default

**ทำนายผล:** ✅ ควรทำงานทันที!
