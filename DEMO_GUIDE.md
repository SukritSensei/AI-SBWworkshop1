# 🎬 Visual Demo & Tutorial

สวัสดีครับ! นี่คือคำแนะนำทีละขั้นตอนเพื่อให้คุณเข้าใจระบบได้ชัดเจน 👋

## 📺 Interface Tour

### 1. หน้าแรกเมื่อเปิด

```
┌─────────────────────────────────────────────────────────────┐
│  🔐 AI Gesture Password  │  🔒 LOCKED  │  [รีเซ็ต]         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────┐  ┌────────────────┐                │
│  │                     │  │ 📄 Paper       │                │
│  │  📹 CAMERA          │  │ ✂️ Scissors    │  ┌──────────┐ │
│  │  (Live Feed)        │  │ 🔨 Hammer      │  │   🔒    │ │
│  │  [Show gesture]     │  │ ❌ No action   │  │  LOCKED  │ │
│  │                     │  │                │  │          │ │
│  │ FPS: 30 | 45ms | ✓  │  │ ⬤ ⬤ ◌ ◌ ◌   │  └──────────┘ │
│  │                     │  │ (0/5)          │                │
│  └─────────────────────┘  └────────────────┘                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │  📋 ACCESS HISTORY (Latest 10)                         ││
│  ├────────────────────────────────────────────────────────┤│
│  │ Time  │ Status │ Sequence      │ Attempt              ││
│  │14:30  │ ✓ OK   │📄 ✂️ 🔨 📄 ✂️  │ ครั้งแรก          ││
│  │14:25  │ ✗ FAIL │📄 ✂️ 🔨       │ ครั้งที่ 2        ││
│  └────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 2. สถานะต่างๆ

#### 🔒 Locked State
```
┌─────────────────┐
│      🔒        │
│   ล็อกอยู่      │
│  สีแดง ❤️      │
│ ยังไม่ถูกต้อง   │
└─────────────────┘
```

#### 🔓 Unlocked State (2 วินาที)
```
┌─────────────────┐
│      🔓        │
│  ปลดล็อกแล้ว!   │
│  สีเขียว 💚    │
│  สำเร็จ ✓       │
└─────────────────┘
```

### 3. Gesture Indicators

```
ระหว่างทำท่า 5 ท่า:

ท่า 1 ทำเสร็จ:      ⬤ ◌ ◌ ◌ ◌  (1/5)
ท่า 2 ทำเสร็จ:      ⬤ ⬤ ◌ ◌ ◌  (2/5)
ท่า 3 ทำเสร็จ:      ⬤ ⬤ ⬤ ◌ ◌  (3/5)
ท่า 4 ทำเสร็จ:      ⬤ ⬤ ⬪ ⬤ ◌  (4/5)
ท่า 5 ทำเสร็จ:      ⬤ ⬪ ⬪ ⬪ ⬪  (5/5) ✓

⬤ = Complete (สีเขียว)
◌ = Pending (สีเทา)
⬪ = Processing (ตรวจสอบอยู่)
```

## 🎯 Step-by-Step Walkthrough

### ขั้น 1: เปิดระบบ

```
1️⃣ เปิด Terminal/CMD
   $ cd /workspaces/AI-SBWworkshop1
   
2️⃣ เรียกใช้ Server
   $ npx http-server -p 8000
   
   📝 Output:
   Starting up http-server...
   Server running at http://localhost:8000
   
3️⃣ เปิด Browser
   🌐 http://localhost:8000
   
   💥 ระบบเปิดแล้ว!
```

### ขั้น 2: ยินยอมกล้อง

```
🔔 Popup Notification:
┌─────────────────────────────────────┐
│ Camera (localhost:8000)             │
│ Wants to use your camera            │
│                                     │
│  [Block]  [Allow]  ← Click this!   │
└─────────────────────────────────────┘

✅ หลังคลิก "Allow":
   - Webcam stream ปรากฏ
   - Indicator light เปลี่ยน
   - FPS อ่านค่าได้
```

### ขั้น 3: สร้างรหัส

```
🔑 PASSWORD CREATION FLOW:

┌─────────────────────────────────┐
│ 🔑 ตั้งรหัสผ่าน                 │
│ ───────────────────────         │
│ รหัสผ่าน (ท่าทาง):             │
│ [สร้างรหัส]                     │
└─────────────────────────────────┘
      ↓ Click "สร้างรหัสใหม่"
      
🔔 NOTIFICATION:
┌────────────────────────────────────┐
│ 🔑 โหมดสร้างรหัส เริ่มต้น!       │
└────────────────────────────────────┘

💡 ตอนนี้ทำท่า 5 ท่า:

ท่า 1️⃣: เปิดมือ (Paper)
  👆 ยื่นมือหน้ากล้อง
  👆 เปิดนิ้วให้กว้าง
  👆 ระบบอ่านค่า...
  ✓ บันทึกท่า 1 ✓
  ⬤ ◌ ◌ ◌ ◌

ท่า 2️⃣: ทำวี (Scissors)
  👆 แต่ก่อน: รอ 0.5 วินาที
  👆 นิ้วชี้ + กลาง ทำ V
  ✓ บันทึกท่า 2 ✓
  ⬤ ⬤ ◌ ◌ ◌

ท่า 3️⃣: ทำหมัด (Hammer)
  👆 แต่ก่อน: รอ 0.5 วินาที
  👆 ทำหมัด เหมือนทุบมือ
  ✓ บันทึกท่า 3 ✓
  ⬤ ⬪ ⬪ ◌ ◌

ท่า 4️⃣: เปิดมือ (Paper)
  👆 เหมือนท่า 1 แต่ครั้ง 2
  ✓ บันทึกท่า 4 ✓
  ⬪ ⬪ ⬪ ⬪ ◌

ท่า 5️⃣: ทำวี (Scissors)
  👆 เหมือนท่า 2 แต่ครั้ง 2
  ✓ บันทึกท่า 5 ✓
  ⬪ ⬪ ⬪ ⬪ ⬪

✅ เสร็จแล้ว!

🔔 SUCCESS NOTIFICATION:
┌────────────────────────────────┐
│ ✓ รหัสผ่านสร้างสำเร็จ!       │
└────────────────────────────────┘

🔐 Status เปลี่ยน:
   📄 ✂️ 🔨 📄 ✂️
   (นี่คือรหัสของคุณ!)
```

### ขั้น 4: ปลดล็อก

```
🔐 UNLOCK ATTEMPT:

ลำดับที่ 1 ✓ (Correct):
┌─────────────────────────────┐
│ ทำท่า: 📄 ✂️ 🔨 📄 ✂️     │
│ (ตามลำดับเดิม)             │
│                             │
│ ⬤ ⬪ ⬪ ⬪ ⬪              │
│     ↓                       │
│   ✅ Comparing...           │
│     ↓                       │
│   ✓ MATCH!                  │
│                             │
│ 🔓 ปลดล็อกแล้ว!           │
│ UNLOCKED ✓                 │
│ สีเขียว 💚                 │
└─────────────────────────────┘
     ↓ (2 วินาทีหลัง)
│ 🔄 อัตโนมัติรีเซ็ต...     │
│ 🔒 LOCKED                 │
     ↓
  เตรียมพร้อมสำหรับครั้งต่อไป


ลำดับที่ 2 ✗ (Wrong):
┌─────────────────────────────┐
│ ทำท่า: 📄 📄 🔨 📄 ✂️    │
│ (ท่า 2 ผิด - ทำ 📄 แทน)   │
│                             │
│ ⬤ ⬪ ◌ ◌ ◌              │
│     ↓                       │
│   ✅ Comparing...           │
│     ↓                       │
│   ✗ NO MATCH!              │
│                             │
│ 🔒 ยังล็อก                │
│ LOCKED ✗                  │
│ สีแดง ❤️                  │
└─────────────────────────────┘
     ↓ (ทันที)
│ 🔄 ล้างลำดับ              │
│ ⬭ ◌ ◌ ◌ ◌               │
     ↓
  ลองใหม่อีกครั้ง
```

## 📊 UI Components Explained

### Camera Preview Box

```
┌─────────────────────────────────┐
│  📹 Camera Preview              │
├─────────────────────────────────┤
│                                 │
│  ┌────────────────────────────┐ │
│  │                            │ │
│  │   (Live Webcam Stream)     │ │
│  │   You should see yourself  │ │
│  │   moving in real-time      │ │
│  │                            │ │
│  │       [Gesture overlay]    │ │
│  │       📄 Paper             │ │
│  │       Conf: 95.2%          │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌──────┬──────┬──────┐        │
│  │ FPS  │ Infer│Model │        │
│  │  30  │ 45ms │  ✓   │        │
│  └──────┴──────┴──────┘        │
└─────────────────────────────────┘

🔍 What to check:
✓ You see video
✓ Confident score visible
✓ FPS ≥ 20
✓ Inference < 500ms
✓ Model status = ✓
```

### Status Indicator

```
🔒 When LOCKED:
┌────────────────────┐
│      🔒           │
│    ล็อกอยู่        │
│     LOCKED         │
│                    │
│   (Red glow)       │
│   (Pulse anim)     │
└────────────────────┘

🔓 When UNLOCKED:
┌────────────────────┐
│      🔓           │
│  ปลดล็อกแล้ว!      │
│    UNLOCKED        │
│                    │
│  (Green glow)      │
│  (Pulse anim)      │
└────────────────────┘
```

### Statistics Section

```
📈 Statistics
┌───────────────────┐
│ ทั้งหมด: 10       │
│ สำเร็จ: 7 ✓      │
│ ล้มเหลว: 3 ✗     │
├───────────────────┤
│ Success Rate      │
│ 70% ████████░░░░  │
└───────────────────┘

📝 Calculation:
   Success Rate = (7 / 10) × 100 = 70%
```

## 🎮 Control Panel

```
⚙️ CONTROLS SECTION:

┌──────────────────┐
│ 🔄 ล้างลำดับ    │  → Clear current attempt
│ ▶️ เปิดกล้อง    │  → Start camera
│ ⏹️ ปิดกล้อง    │  → Stop camera
└──────────────────┘

🔑 PASSWORD SETUP:

┌────────────────────┐
│ ชื่อ: "Password"  │  (Read-only)
│ ท่า: 📄✂️🔨📄✂️ │
│ [สร้างรหัสใหม่]  │
│ 0/5 ท่า          │
└────────────────────┘
```

## 📋 Access History Log

```
┌─────────────────────────────────────────────────┐
│ 📋 Access History                               │
├─────────────────────────────────────────────────┤
│ เวลา      สถานะ    ลำดับท่า       ผลลัพธ์       │
├─────────────────────────────────────────────────┤
│ 14:35  ✓ สำเร็จ   📄✂️🔨📄✂️  ครั้งแรก    │
│ 14:33  ✗ ล้มเหลว  📄📄🔨        ครั้งที่ 2   │
│ 14:30  ✓ สำเร็จ   📄✂️🔨📄✂️  ครั้งที่ 3   │
│ 14:25  ✗ ล้มเหลว  ✂️🔨🔨        ครั้งที่ 4   │
│ 14:20  ✓ สำเร็จ   📄✂️🔨📄✂️  ครั้งที่ 5   │
│ ...                                              │
└─────────────────────────────────────────────────┘

📊 Data stored:
• Timestamp (Time)
• Status (✓ or ✗)
• Gestures performed
• Attempt number
```

## 🎬 Animation Sequences

### Loading Animation
```
When opening page:
┌──────────────┐
│   ⏳ ↻      │
│ Loading...   │
└──────────────┘
   ↓
┌──────────────┐
│   ✓ Ready    │
│ AI System    │
└──────────────┘
```

### Gesture Detection
```
When gesture recognized:
📄 (pulse out)
   ↓
📄 (pulse in)
   ↓
✓ Add to sequence
   ↓
Update indicators
```

### Notification Toast
```
When action completed:
┌─────────────────────────┐
│ ✓ Password created!     │ ← Shows for 3s
└─────────────────────────┘

Or:

┌─────────────────────────┐
│ ❌ Wrong password!      │ ← Shows for 3s
└─────────────────────────┘
```

## 🔧 Performance Monitoring

### Real-time Metrics

```
┌──────────────────────────┐
│ FPS      Inference  Model│
│ 30 ✓     45ms ✓     ✓   │
└──────────────────────────┘

📊 Meaning:
FPS = Frames per second
  ✓ 30 = Smooth
  ✓ 20+ = Good
  ✗ <10 = Lag

Inference = Time to detect gesture
  ✓ 45ms = Fast
  ✓ <500ms = OK
  ✗ >1000ms = Slow

Model = Ready status
  ✓ = Loaded
  ⏳ = Loading
  ✗ = Error
```

## 🎓 Learning Outcomes

After going through this demo, you'll understand:

```
1. ✅ How AI detects hand gestures
   └─ TensorFlow.js inference
   └─ Real-time video processing

2. ✅ How gesture sequences become passwords
   └─ Recording to arrays
   └─ Pattern matching

3. ✅ How UI provides feedback
   └─ Real-time indicators
   └─ Status displays

4. ✅ How data gets stored
   └─ Local browser storage
   └─ Cloud Firebase

5. ✅ How security works
   └─ Gesture debouncing
   └─ Sequence validation

6. ✅ How performance is monitored
   └─ FPS tracking
   └─ Inference timing
```

## 📝 Quick Reference

### Gesture Emojis
```
📄 Paper       (Open hand, spread fingers)
✂️ Scissors    (V with two fingers)
🔨 Hammer      (Closed fist)
❌ NoAction    (Anything else)
```

### States
```
🔒 LOCKED       (Initial state, ready for attempt)
⏳ PROCESSING   (Checking gesture)
🔓 UNLOCKED     (Successful authentication)
🔄 RESET        (Automatic after 2s)
```

### Icons
```
✓ Success       (Green, positive)
✗ Failed        (Red, negative)
⏳ Loading       (Blue, wait)
⬭ Pending       (Gray, not done)
⬤ Complete      (Green, done)
◌ Empty         (Gray, future)
```

---

**Now you're ready to use the system!** 🚀

👉 **Next:** Read [QUICKSTART.md](QUICKSTART.md) for step-by-step setup!
