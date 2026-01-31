# 🎓 Google Teachable Machine Setup Guide

## เลือก Pose Model สำหรับ Gesture Recognition

## 1️⃣ สร้าง Teachable Machine Project

### ขั้นตอน:

1. ไปที่ https://teachablemachine.withgoogle.com/
2. คลิก **"Get Started"**
3. เลือก **"Pose Model"** (สำหรับ Gesture Detection)
4. เลือก **"Standard pose"** (เดสก์ท็อป/แล็ปท็อป)

## 2️⃣ สร้าง Classes (ท่าทาง)

### ทำให้ครบ 4 Classes:

#### Class 1: **Paper** (📄 เปิดมือ)

```
ชื่อ: Paper
ท่า: มือเปิด กว้าง นิ้วตรง

ตัวอย่าง:
- นั่ง/ยืน ทำมือเปิดขึ้นหน้า (เหมือนท่า stop)
- มือด้านข้าง
- มือด้านบน
- หมุนมือ
- อื่นๆ 20+ ตัวอย่าง
```

#### Class 2: **Scissors** (✂️ วีนิ้ว)

```
ชื่อ: Scissors
ท่า: นิ้วชี้-กลาง ทำเป็น V

ตัวอย่าง:
- วีด้านบน
- วีด้านข้าง
- ไปทางซ้าย/ขวา
- มุมต่างๆ
- 20+ ตัวอย่าง
```

#### Class 3: **Hammer** (🔨 หมัด)

```
ชื่อ: Hammer
ท่า: หมัด เหมือนทุบของ

ตัวอย่าง:
- หมัดตรงหน้า
- หมัดด้านข้าง
- หมัดขึ้นลง
- หมัดจากมุมต่างๆ
- 20+ ตัวอย่าง
```

#### Class 4: **NoAction** (❌ อื่นๆ)

```
ชื่อ: NoAction
ท่า: ท่าที่ไม่ใช่ 3 อย่างข้างบน

ตัวอย่าง:
- ท่าธรรมชาติ
- มือแนบตัว
- ท่าแปลก
- ท่าผิดของ
- Negative samples (20+ ตัวอย่าง)
```

## 3️⃣ เก็บตัวอย่าง (Training Data)

### แนวทางการเก็บข้อมูล:

#### ✅ ที่ดี:

```
- Light conditions หลากหลาย (สว่าง/มืด/ธรรมชาติ)
- มุมกล้องต่างๆ (หน้า/ข้าง/มุม)
- ระยะห่างกล้องต่างกัน
- ท่านั่ง/ยืน
- พื้นหลังต่างกัน
- เสื้อแขนสั้น/ยาว
- 30+ ตัวอย่างต่อ class ขั้นต่ำ
```

#### ❌ ที่ไม่ดี:

```
- ภาพทั้งหมดในแสงเดียว
- มุมเดียว
- เสื้อสีเดียว
- ท่าเดียว
- ตัวอย่างไม่เพียงพอ
- ท่าที่ซ้ำกับ class อื่น
```

### วิธีการเก็บ:

1. **Webcam Upload:**
   - คลิก **"Webcam"** ใน class
   - ทำท่า → เก็บ 3-5 ตัวอย่างต่อการทำ
   - ทำ 5-10 รอบต่างๆ

2. **Batch Upload:**
   - เตรียมรูป (.jpg, .png)
   - คลิก **"Upload"**
   - เลือกรูปจำนวนมาก

### ตัวอย่างขั้นต่ำ:

| Class | ตัวอย่าง | ประเภท |
|-------|---------|--------|
| Paper | 30+ | วิดีโอ/รูป |
| Scissors | 30+ | วิดีโอ/รูป |
| Hammer | 30+ | วิดีโอ/รูป |
| NoAction | 40+ | วิดีโอ/รูป |

## 4️⃣ Train Model

### ขั้นตอน:

1. เมื่อเก็บข้อมูลพอแล้ว → คลิก **"Train Model"**
2. รอ 2-5 นาที
3. ทำให้ Accuracy ≥ 90%

### ตรวจสอบ Accuracy:

```
ที่ Preview section ด้านล่าง:
- Accuracy ≥ 90% → ดีมาก ✓
- Accuracy 80-89% → พอใช้ △
- Accuracy < 80% → ต้องเก็บข้อมูลเพิ่มเติม ✗
```

## 5️⃣ Export Model สำหรับ Web

### Export Settings:

1. คลิก **"Export Model"** (ปุ่มมุมขวา)
2. เลือก **"TensorFlow.js"**
3. เลือก **"Floating point"** (ความแม่นยำสูง)
4. คลิก **"Download"**

### แล้วจะได้ไฟล์:

```
model/
├── model.json
├── metadata.json
└── weights.bin (หรือ weights1.bin, weights2.bin, ...)
```

## 6️⃣ Host Model ออนไลน์

### Option A: GitHub (ฟรี)

```bash
# 1. สร้าง repo ชื่อ "gesture-models"
# 2. Upload ไฟล์ model ลงใน folder

# 3. URL จะเป็น:
https://raw.githubusercontent.com/YOUR_USERNAME/gesture-models/main/model.json
```

### Option B: Google Drive

```
1. Upload ไฟล์ลงใน Google Drive
2. Share → Anyone with link can view
3. URL format:
https://drive.google.com/uc?export=download&id=FILE_ID
```

### Option C: Teachable Machine Direct

```
ใน Teachable Machine UI มี URL สำเร็จรูป:
https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/
```

## 7️⃣ ใช้ Model ใน Project

### ใน app.js:

```javascript
// บรรทัด ~69
const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";

// หรือ GitHub:
const URL = "https://raw.githubusercontent.com/YOUR_USERNAME/gesture-models/main/";

// หรือ Google Drive:
const modelURL = "https://drive.google.com/uc?export=download&id=FILE_ID/model.json";
const metadataURL = "https://drive.google.com/uc?export=download&id=FILE_ID/metadata.json";
```

### Code ตัวอย่าง:

```javascript
async init(videoElement) {
    try {
        const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";
        
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        this.model = await tmPose.load(modelURL, metadataURL);
        this.webcam = new tmPose.Webcam(160, 120, true);
        await this.webcam.setup();
        await this.webcam.play();
        
        this.isReady = true;
        console.log('✓ Model loaded');
    } catch (error) {
        console.error('Load error:', error);
    }
}
```

## 8️⃣ ทดสอบ Real-time

### ใน Teachable Machine Preview:

1. **Preview:** ทำท่าที่กล้องเห็น
2. ตรวจสอบ Confidence:
   - `Paper: 95%` ← ดี ✓
   - `Scissors: 50%` ← ไม่ชัด
   - `Hammer: 3%` ← ถูกต้อง
3. ถ้า Confidence < 85% → ต้องเก็บข้อมูลเพิ่ม

## 🎯 Optimization Tips

### 1. Improve Accuracy

```
- เก็บ 50+ ตัวอย่างต่อ class
- หลายท่ากล้อง
- หลายแสง
- หลายพื้นหลัง
```

### 2. Faster Inference

```javascript
// ลด input size:
this.webcam = new tmPose.Webcam(96, 72, true); // from 160x120

// Inference จะเร็วขึ้น 2-3x
```

### 3. Reduce Model Size

```javascript
// Download เวอร์ชัน Lite (ถ้ามี):
const URL = ".../model-lite/";
// Size: ~15MB → ~5MB
```

## 🔍 Monitoring

### ใน Browser Console:

```javascript
// Log confidence scores
const pred = await classifier.predict();
console.log(`${pred.gesture}: ${(pred.confidence*100).toFixed(1)}%`);
```

### Expected Performance:

| Metric | Target | Current |
|--------|--------|---------|
| Accuracy | ≥ 90% | ? |
| Confidence | ≥ 85% | ? |
| Inference | ≤ 500ms | ? |
| Load Time | ≤ 3s | ? |

## 🐛 Troubleshooting

### ❌ "Model loads but predictions are always NoAction"

**วิธีแก้:**
1. เก็บข้อมูล training ใหม่
2. ยืนหรือนั่งให้ชัดขึ้น
3. มุมกล้องให้ดีขึ้น
4. Re-train model

### ❌ "Confidence score บ่อยครั้งต่ำ"

**วิธีแก้:**
1. ต้องการตัวอย่างเพิ่ม (50+)
2. ท่าทางต่างกันพอ
3. ทดสอบใน preview ก่อน

### ❌ "Model file 404 not found"

**วิธีแก้:**
1. ตรวจสอบ URL ถูกต้อง
2. File host ยังใช้ได้ (GitHub, Drive)
3. CORS headers ถูกต้อง

## 📊 Advanced: Custom Pose Classification

### Teachable Machine Outputs:

```javascript
const predictions = await model.estimatePose(canvas);
// [
//   {
//     pose: { keypoints, score },
//     posenetOutput: [...],
//     class: "Paper",
//     classIndex: 0,
//     score: 0.95
//   }
// ]
```

### Manual Pose Logic (Advanced):

```javascript
function classifyPose(pose) {
    const keypoints = pose.pose.keypoints;
    
    // Get hand positions
    const leftWrist = keypoints[9]; // Left wrist
    const rightWrist = keypoints[10]; // Right wrist
    
    // Calculate distances
    const distance = Math.sqrt(
        Math.pow(leftWrist.x - rightWrist.x, 2) + 
        Math.pow(leftWrist.y - rightWrist.y, 2)
    );
    
    // Classification logic
    if (distance > 100) return "paper";
    if (distance < 50) return "hammer";
    return "scissors";
}
```

## 🚀 Best Practices

1. **Version Control Model**
   ```
   models/
   ├── v1/ (accuracy 88%)
   ├── v2/ (accuracy 91%)
   └── v3-current/ (accuracy 94%)
   ```

2. **Document Training Data**
   ```
   - Date: 2024-01-31
   - Samples: 150 per class
   - Accuracy: 94%
   - Test environment: Laptop + Webcam
   ```

3. **Test Before Deploy**
   ```
   - Different lighting
   - Different devices
   - Different people
   - Different clothes
   ```

4. **Monitor Performance**
   ```
   - Log confidence scores
   - Track failed predictions
   - Update model monthly
   ```

## 📝 Checklist

- [ ] Teachable Machine account สร้าง
- [ ] 4 Classes สร้างแล้ว
- [ ] 30+ ตัวอย่างต่อ class
- [ ] Model trained (≥90% accuracy)
- [ ] Model exported (.json, .bin)
- [ ] Model hosted online
- [ ] URL ใส่ใน app.js
- [ ] ทดสอบได้สำเร็จ ✅

## 🔗 Resources

- Teachable Machine: https://teachablemachine.withgoogle.com/
- TFLite Pose: https://www.tensorflow.org/lite/models/pose_detection
- Documentation: https://github.com/googlecreativelab/teachablemachine-community

---

💡 **Tip:** ถ้าตัวอย่างไม่พอ ให้ใช้ Data Augmentation (หมุน/ปรับขนาด)

---

**ลำดับขั้นตอน:**
1. สร้าง Classes ✓
2. เก็บข้อมูล (30+ ตัวอย่าง) ✓
3. Train Model ✓
4. Export & Host ✓
5. ใส่ URL ใน app.js ✓
6. ทดสอบ ✓
