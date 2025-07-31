# 📚 Usage Examples

This document provides practical examples of how to integrate and use the Browser Anomaly Checker in various scenarios.

## 🚀 Quick Start

### Basic Integration
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Application</title>
</head>
<body>
    <!-- Your content -->
    
    <!-- Include Browser Anomaly Checker -->
    <script src="spoof-check.js"></script>
    <script src="behavior-tracker.js"></script>
    
    <script>
        // Wait for analysis to complete
        setTimeout(() => {
            const riskScore = window.spoofChecker?.riskScore || 0;
            const behaviorData = window.behaviorTracker?.getSessionStats();
            
            console.log('Risk Score:', riskScore);
            console.log('Behavior Data:', behaviorData);
        }, 2000);
    </script>
</body>
</html>
```

## 🔒 Security Use Cases

### 1. Login Protection
```javascript
// Check for suspicious behavior during login
function validateLogin(username, password) {
    const riskScore = window.spoofChecker?.riskScore || 0;
    const behaviorStats = window.behaviorTracker?.getSessionStats();
    
    if (riskScore > 10) {
        // High risk - require additional verification
        showCaptcha();
        return false;
    }
    
    if (behaviorStats.totalEvents < 5) {
        // Very low activity - suspicious
        requireEmailVerification();
        return false;
    }
    
    // Proceed with normal login
    return authenticateUser(username, password);
}
```

### 2. Transaction Monitoring
```javascript
// Monitor suspicious activity during checkout
function processPayment(paymentData) {
    const analysis = {
        spoof: exportSpoofReport(),
        behavior: exportBehaviorData(),
        timestamp: new Date().toISOString()
    };
    
    // Send to fraud detection service
    fetch('/api/fraud-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            payment: paymentData,
            browserAnalysis: analysis
        })
    }).then(response => {
        if (response.ok) {
            proceedWithPayment(paymentData);
        } else {
            flagSuspiciousTransaction();
        }
    });
}
```

## 📊 Analytics Integration

### Google Analytics Custom Events
```javascript
// Send browser anomaly data to Google Analytics
function sendToGA() {
    const riskLevel = window.spoofChecker?.getRiskLevel()?.level || 'UNKNOWN';
    const behaviorStats = window.behaviorTracker?.getSessionStats();
    
    // Send custom event
    gtag('event', 'browser_analysis', {
        'risk_level': riskLevel,
        'total_events': behaviorStats.totalEvents,
        'session_duration': behaviorStats.duration,
        'is_active': behaviorStats.isActive
    });
}
```

### Custom Analytics Dashboard
```javascript
// Collect data for custom dashboard
class AnalyticsDashboard {
    constructor() {
        this.data = [];
        this.startCollection();
    }
    
    startCollection() {
        setInterval(() => {
            this.collectData();
        }, 30000); // Collect every 30 seconds
    }
    
    collectData() {
        const dataPoint = {
            timestamp: new Date().toISOString(),
            riskScore: window.spoofChecker?.riskScore || 0,
            behaviorStats: window.behaviorTracker?.getSessionStats(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        this.data.push(dataPoint);
        this.sendToServer(dataPoint);
    }
    
    async sendToServer(data) {
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Failed to send analytics:', error);
        }
    }
}

// Initialize dashboard
const dashboard = new AnalyticsDashboard();
```

## 🎯 A/B Testing

### Validate Test Participants
```javascript
// Ensure A/B test participants are real users
function assignTestGroup(userId) {
    const riskScore = window.spoofChecker?.riskScore || 0;
    const behaviorStats = window.behaviorTracker?.getSessionStats();
    
    // Exclude high-risk users from tests
    if (riskScore > 8) {
        return 'excluded_high_risk';
    }
    
    // Exclude users with no interaction
    if (behaviorStats.totalEvents < 3) {
        return 'excluded_low_activity';
    }
    
    // Assign to test group
    return Math.random() < 0.5 ? 'group_a' : 'group_b';
}
```

## 🔧 Advanced Configuration

### Custom Risk Thresholds
```javascript
// Override default risk assessment
class CustomSpoofChecker extends SpoofChecker {
    getRiskLevel() {
        const percentage = (this.riskScore / this.maxRisk) * 100;
        
        // Custom thresholds for your use case
        if (percentage >= 60) return { level: 'HIGH', class: 'risk-high', text: 'High Risk' };
        if (percentage >= 30) return { level: 'MEDIUM', class: 'risk-medium', text: 'Medium Risk' };
        return { level: 'LOW', class: 'risk-low', text: 'Low Risk' };
    }
}
```

### Custom Behavior Patterns
```javascript
// Add custom behavior analysis
class CustomBehaviorTracker extends BehaviorTracker {
    analyzeBehaviorPatterns() {
        let analysis = super.analyzeBehaviorPatterns();
        
        // Add custom patterns
        const mouseEvents = this.events.mouse || 0;
        const timeSpent = Date.now() - this.sessionStart;
        
        if (mouseEvents > 1000 && timeSpent < 60000) {
            analysis += '   🤖 Suspicious: Too many mouse events in short time\n';
        }
        
        return analysis;
    }
}
```

## 📱 Mobile Detection

### Device-Specific Analysis
```javascript
// Detect mobile vs desktop behavior
function analyzeDeviceType() {
    const touchSupport = 'ontouchstart' in window;
    const screenWidth = window.screen.width;
    const behaviorStats = window.behaviorTracker?.getSessionStats();
    
    if (touchSupport && screenWidth < 768) {
        // Mobile device
        if (behaviorStats.mouseEvents > behaviorStats.touchEvents) {
            console.warn('Suspicious: Mouse events on mobile device');
        }
    } else {
        // Desktop device
        if (behaviorStats.touchEvents > 0 && !touchSupport) {
            console.warn('Suspicious: Touch events on non-touch device');
        }
    }
}
```

## 🚨 Real-time Alerts

### Immediate Threat Detection
```javascript
// Set up real-time monitoring
function setupRealTimeMonitoring() {
    // Monitor for immediate threats
    setInterval(() => {
        const currentRisk = window.spoofChecker?.riskScore || 0;
        
        if (currentRisk > 15) {
            // Critical threat detected
            sendImmediateAlert({
                level: 'CRITICAL',
                riskScore: currentRisk,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });
        }
    }, 5000);
}

async function sendImmediateAlert(alertData) {
    try {
        await fetch('/api/security-alert', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Priority': 'HIGH'
            },
            body: JSON.stringify(alertData)
        });
        
        console.error('🚨 Security Alert Sent:', alertData);
    } catch (error) {
        console.error('Failed to send security alert:', error);
    }
}
```

## 📈 Performance Optimization

### Lazy Loading
```javascript
// Load analysis scripts only when needed
function loadBrowserAnalysis() {
    return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        
        script1.src = 'spoof-check.js';
        script2.src = 'behavior-tracker.js';
        
        let loaded = 0;
        const onLoad = () => {
            loaded++;
            if (loaded === 2) resolve();
        };
        
        script1.onload = onLoad;
        script2.onload = onLoad;
        script1.onerror = script2.onerror = reject;
        
        document.head.appendChild(script1);
        document.head.appendChild(script2);
    });
}

// Use when needed
document.getElementById('secure-area').addEventListener('click', async () => {
    await loadBrowserAnalysis();
    // Now analysis is available
    const riskScore = window.spoofChecker?.riskScore || 0;
    console.log('Risk Score:', riskScore);
});
```

---

For more examples and advanced use cases, check out our [GitHub repository](https://github.com/ZhaslanToishybayev/browser-anomaly-checker) or contact the author.
