# 🔍 Browser Anomaly Checker

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue.svg)](https://zhaslantoishybayev.github.io/browser-anomaly-checker)

> **Professional Browser Fingerprinting & Behavior Analysis Tool**

🧠 **Advanced web security tool that detects browser anomalies, headless environments, and analyzes user behavior patterns in real-time. Built with vanilla JavaScript for maximum compatibility and performance.**

## 🎯 Live Demo

**[👉 Try it now!](https://zhaslantoishybayev.github.io/browser-anomaly-checker)**

![Browser Anomaly Checker Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Browser+Anomaly+Checker+Demo)

## ✨ Key Features

### 🛡️ Advanced Spoof Detection
- **12+ Security Checks** - WebDriver, User Agent, Hardware fingerprinting
- **Risk Scoring System** - Intelligent threat assessment (0-10 scale)
- **Real-time Analysis** - Instant anomaly detection
- **Professional Reports** - Detailed JSON export functionality

### 👁️‍🗨️ Behavior Analytics
- **Real-time Tracking** - Mouse, keyboard, scroll, focus events
- **Pattern Recognition** - Automated suspicious behavior detection
- **Activity Monitoring** - User engagement level analysis
- **Session Statistics** - Comprehensive interaction metrics

### 🎨 Professional UI/UX
- **Modern Design** - Gradient backgrounds, smooth animations
- **Interactive Dashboard** - Real-time data visualization
- **Responsive Layout** - Works on all devices and screen sizes
- **Export Functionality** - Download analysis reports as JSON

### 🔧 Technical Excellence
- **Zero Dependencies** - Pure vanilla JavaScript, HTML5, CSS3
- **High Performance** - Optimized for speed and efficiency
- **Cross-browser Compatible** - Works in all modern browsers
- **Easy Integration** - Simple API for embedding in other projects

## 🔎 Spoof Detection Engine

### Detection Capabilities

| Check Type | Description | Risk Weight | Detection Method |
|------------|-------------|-------------|------------------|
| **WebDriver** | Automated browser detection | 🔴 Critical (4) | `navigator.webdriver` |
| **User Agent** | Headless browser signatures | 🔴 High (3) | String pattern matching |
| **Hardware** | Suspicious system specs | 🟡 Medium (1-2) | `deviceMemory`, `hardwareConcurrency` |
| **Languages** | Browser language anomalies | 🟡 Medium (1-2) | `navigator.languages` |
| **WebGL** | Graphics rendering analysis | 🟡 Medium (1-2) | Canvas fingerprinting |
| **Eval Function** | JavaScript environment checks | 🟡 Medium (2) | Function introspection |
| **Plugins** | Browser plugin availability | 🟡 Low (1) | `navigator.plugins` |
| **Screen** | Display characteristics | 🟡 Low (1) | Resolution patterns |
| **Timezone** | Geographic inconsistencies | 🟡 Low (1) | `Intl.DateTimeFormat` |
| **Permissions** | API availability checks | 🟡 Low (1) | Permissions API |
| **Touch Support** | Input method detection | ℹ️ Info | Touch event support |
| **Battery API** | Device API presence | ℹ️ Info | Battery status API |

### Risk Assessment Algorithm

```javascript
// Risk scoring system (0-10 scale)
🟢 LOW RISK (0-39%):     Normal browser environment
🟡 MEDIUM RISK (40-69%): Potential anomalies detected
🔴 HIGH RISK (70%+):     Likely automated/headless browser
```

## 👁️‍🗨️ Behavior Analytics Engine

### Event Tracking Matrix

| Event Type | Purpose | Frequency | Analysis Method |
|------------|---------|-----------|-----------------|
| **Mouse Movement** | User activity detection | High | Coordinate tracking |
| **Click Events** | Interaction patterns | Medium | Target element analysis |
| **Scroll Behavior** | Content engagement | Medium | Position & velocity |
| **Keyboard Input** | Text interaction | Low-Medium | Key pattern analysis |
| **Focus Changes** | Window attention | Low | Visibility state |
| **Tab Switching** | Multi-tasking behavior | Low | Page visibility API |
| **Window Resize** | Environment changes | Very Low | Dimension tracking |
| **Context Menu** | Advanced usage | Very Low | Right-click detection |

### Behavioral Intelligence

```javascript
// Activity Level Classification
🔥 VERY HIGH (>50 EPM):  Intensive interaction
⚡ HIGH (20-50 EPM):     Active engagement
📊 MEDIUM (10-20 EPM):   Normal browsing
📉 LOW (5-10 EPM):       Passive viewing
😴 VERY LOW (<5 EPM):    Minimal activity
```

### Pattern Recognition
- **🤖 Bot Detection**: Repetitive/mechanical patterns
- **📈 Engagement Scoring**: User interest measurement
- **⚠️ Anomaly Detection**: Unusual behavior identification
- **🕒 Session Analysis**: Time-based activity patterns

## 🚀 Quick Start

### Option 1: Direct Usage
```bash
# Clone the repository
git clone https://github.com/ZhaslanToishybayev/browser-anomaly-checker.git
cd browser-anomaly-checker

# Open index.html in your browser or serve locally
python -m http.server 8000
# Navigate to http://localhost:8000
```

### Option 2: GitHub Pages Deployment
1. **Fork** this repository
2. Go to **Settings** → **Pages**
3. Select **Source**: Deploy from a branch → **main**
4. Your site will be available at: `https://yourusername.github.io/browser-anomaly-checker`

### Option 3: One-Click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ZhaslanToishybayev/browser-anomaly-checker)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ZhaslanToishybayev/browser-anomaly-checker)

## 📁 Структура проекта

```
browser-anomaly-checker/
├── index.html          # 🏠 Главная страница с UI
├── spoof-check.js      # 🔍 Анализ аномалий браузера
├── behavior-tracker.js # 👁️ Отслеживание поведения
└── README.md          # 📖 Документация
```

## 💻 API Usage Examples

### Browser Console Integration
```javascript
// Export complete behavior analysis
const behaviorData = exportBehaviorData();
console.log('Behavior Analysis:', behaviorData);

// Export spoof detection report
const spoofReport = exportSpoofReport();
console.log('Spoof Detection:', spoofReport);

// Get real-time session statistics
const stats = window.behaviorTracker.getSessionStats();
console.log('Session Stats:', stats);
```

### Embedding in Your Project
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Application</title>
</head>
<body>
    <!-- Your content -->

    <!-- Include the scripts -->
    <script src="https://cdn.jsdelivr.net/gh/ZhaslanToishybayev/browser-anomaly-checker/spoof-check.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/ZhaslanToishybayev/browser-anomaly-checker/behavior-tracker.js"></script>

    <script>
    // Access analysis results
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            // Get risk assessment
            const riskScore = window.spoofChecker?.riskScore || 0;
            const riskLevel = window.spoofChecker?.getRiskLevel()?.level || 'UNKNOWN';

            // Get behavior metrics
            const behaviorStats = window.behaviorTracker?.getSessionStats();

            // Send to your analytics
            sendToAnalytics({
                riskScore,
                riskLevel,
                behaviorStats,
                timestamp: new Date().toISOString()
            });
        }, 2000); // Wait for analysis to complete
    });
    </script>
</body>
</html>
```

### REST API Integration Example
```javascript
// Send analysis data to your backend
async function sendAnalysisToServer() {
    const data = {
        spoof: exportSpoofReport(),
        behavior: exportBehaviorData(),
        timestamp: new Date().toISOString(),
        sessionId: generateSessionId()
    };

    try {
        const response = await fetch('/api/browser-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log('Analysis sent to server:', await response.json());
    } catch (error) {
        console.error('Failed to send analysis:', error);
    }
}
```

## 🎯 Real-World Applications

### 🔒 Cybersecurity & Fraud Prevention
- **Bot Detection**: Identify automated traffic and scrapers
- **Account Security**: Prevent unauthorized access attempts
- **Transaction Monitoring**: Detect suspicious payment behavior
- **API Protection**: Guard against automated abuse

### 📊 Web Analytics & Business Intelligence
- **Traffic Quality**: Distinguish human vs automated visitors
- **User Engagement**: Measure genuine interaction levels
- **Conversion Optimization**: Identify friction points in user journeys
- **A/B Testing**: Ensure test validity with real user data

### 🎨 UX Research & Product Development
- **Usability Studies**: Track natural user interaction patterns
- **Interface Optimization**: Identify confusing or problematic areas
- **Mobile vs Desktop**: Compare behavior across device types
- **Accessibility**: Monitor assistive technology usage

### 🏢 Enterprise & Compliance
- **Regulatory Compliance**: Meet data authenticity requirements
- **Risk Assessment**: Automated threat scoring for users
- **Audit Trails**: Comprehensive interaction logging
- **Quality Assurance**: Validate testing environments

## 🚀 Future Enhancements

- 🔌 **Backend Integration** - REST API for data collection
- 🤖 **Machine Learning** - AI-powered pattern recognition
- 📊 **Analytics Dashboard** - Real-time monitoring interface
- 🔒 **Advanced Security** - Additional fingerprinting techniques
- 📱 **Mobile Detection** - Device-specific behavior analysis
- 🌐 **Multi-language** - Internationalization support

## 📄 License

MIT License - Feel free to use in your projects!

## 👨‍💻 Author

**Zhaslan Toishybayev** - Mid-level Developer specializing in JavaScript, Web Security & Browser Technologies

### 📫 Contact & Connect
- 📧 **Email**: [znurlanuly203@gmail.com](mailto:znurlanuly203@gmail.com)
- 💼 **GitHub**: [@ZhaslanToishybayev](https://github.com/ZhaslanToishybayev)
- 💬 **Telegram**: [@your_telegram](https://t.me/your_telegram)
- 🔗 **LinkedIn**: [Connect with me](https://linkedin.com/in/your-profile)

### 🎯 Why This Project?
Created to demonstrate expertise in:
- **Browser Security** - Advanced fingerprinting techniques
- **JavaScript Proficiency** - Modern ES6+ features and APIs
- **Real-time Analytics** - Event-driven architecture
- **Professional UI/UX** - Modern web design principles
- **Open Source** - Community-driven development

---

### 🌟 Show Your Support
If this project helped you or showcases skills you value, please:
- ⭐ **Star this repository**
- 🍴 **Fork for your own projects**
- 📢 **Share with your network**
- 💼 **Consider for collaboration opportunities**

---

*Built with ❤️ and lots of ☕ to showcase modern web development capabilities*
