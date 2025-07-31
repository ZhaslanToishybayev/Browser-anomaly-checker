# 🔬 Technical Documentation

## Architecture Overview

The Browser Anomaly Checker consists of two main modules working in tandem:

### 🛡️ Spoof Detection Engine (`spoof-check.js`)
- **Purpose**: Detect headless browsers, bots, and spoofed environments
- **Architecture**: Class-based ES6 with modular check methods
- **Risk Scoring**: Weighted scoring system (0-20 scale)
- **Output**: Structured analysis with risk assessment

### 👁️‍🗨️ Behavior Tracking Engine (`behavior-tracker.js`)
- **Purpose**: Monitor and analyze user interaction patterns
- **Architecture**: Event-driven with real-time processing
- **Data Collection**: Comprehensive user activity logging
- **Output**: Behavioral metrics and pattern analysis

## Detection Methods

### Core Browser Fingerprinting

#### 1. WebDriver Detection
```javascript
// Critical indicator of automation
const hasWebDriver = navigator.webdriver === true;
// Risk Weight: 4 (highest)
```

#### 2. User Agent Analysis
```javascript
// Pattern matching for known headless signatures
const suspicious = ['HeadlessChrome', 'PhantomJS', 'SlimerJS'];
const isSuspicious = suspicious.some(term => userAgent.includes(term));
// Risk Weight: 3
```

#### 3. Hardware Fingerprinting
```javascript
// Analyze system specifications
const memory = navigator.deviceMemory; // RAM in GB
const cores = navigator.hardwareConcurrency; // CPU cores
// Risk Weight: 1-2 (low memory/cores suspicious)
```

### Advanced Fingerprinting Techniques

#### 4. Canvas Fingerprinting
```javascript
// Generate unique visual fingerprint
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Draw complex patterns
ctx.fillText('Fingerprint test 🔍', 2, 15);
ctx.arc(50, 50, 50, 0, Math.PI * 2, true);

// Extract fingerprint
const fingerprint = canvas.toDataURL();
const hash = simpleHash(fingerprint);
// Risk Weight: 3 (if matches known bot patterns)
```

#### 5. Audio Context Fingerprinting
```javascript
// Create unique audio signature
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const analyser = audioContext.createAnalyser();

// Generate frequency data
const frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);
const audioHash = simpleHash(Array.from(frequencyData).join(''));
// Risk Weight: 2 (if suspicious patterns detected)
```

#### 6. WebGL Renderer Detection
```javascript
// Analyze graphics rendering capabilities
const gl = canvas.getContext('webgl');
const vendor = gl.getParameter(gl.VENDOR);
const renderer = gl.getParameter(gl.RENDERER);

// Check for headless indicators
const suspicious = renderer.includes('SwiftShader') || 
                  renderer.includes('Mesa') ||
                  vendor.includes('Google');
// Risk Weight: 1-2
```

## Behavior Analysis Algorithms

### Event Classification

#### Mouse Events
```javascript
// Track cursor movement patterns
document.addEventListener('mousemove', (e) => {
    const pattern = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        velocity: calculateVelocity(lastPosition, currentPosition)
    };
    
    // Detect mechanical patterns
    if (isLinearMovement(pattern)) {
        flagSuspiciousBehavior('mechanical_mouse');
    }
});
```

#### Interaction Timing
```javascript
// Analyze time between events
const timingAnalysis = {
    averageInterval: calculateAverageInterval(events),
    variance: calculateVariance(intervals),
    humanLikeness: assessHumanLikeness(timingPattern)
};

// Human users have natural variance in timing
if (timingAnalysis.variance < threshold) {
    flagSuspiciousBehavior('robotic_timing');
}
```

### Activity Level Classification

```javascript
// Events Per Minute (EPM) analysis
const eventsPerMinute = totalEvents / (sessionDuration / 60000);

const activityLevels = {
    'VERY_HIGH': eventsPerMinute > 50,   // Intensive interaction
    'HIGH': eventsPerMinute > 20,        // Active engagement
    'MEDIUM': eventsPerMinute > 10,      // Normal browsing
    'LOW': eventsPerMinute > 5,          // Passive viewing
    'VERY_LOW': eventsPerMinute <= 5     // Minimal activity
};
```

### Pattern Recognition

#### Suspicious Patterns
1. **Only Mouse Movement**: No keyboard/scroll events
2. **Perfect Timing**: Identical intervals between events
3. **Linear Paths**: Straight-line mouse movements
4. **No Idle Time**: Continuous activity without breaks
5. **Repetitive Actions**: Identical event sequences

## Risk Scoring Algorithm

### Weighted Risk Assessment
```javascript
const riskWeights = {
    webDriver: 4,           // Critical indicator
    userAgent: 3,           // High confidence
    canvasFingerprint: 3,   // Advanced detection
    evalFunction: 2,        // Medium confidence
    audioContext: 2,        // Medium confidence
    hardware: 1,            // Low confidence
    plugins: 1,             // Environmental factor
    // ... other checks
};

// Calculate total risk
let totalRisk = 0;
Object.entries(results).forEach(([check, data]) => {
    if (data.suspicious) {
        totalRisk += riskWeights[check] || 1;
    }
});

// Normalize to percentage
const riskPercentage = (totalRisk / maxPossibleRisk) * 100;
```

### Risk Level Thresholds
```javascript
const riskLevels = {
    LOW: riskPercentage < 40,      // 0-39%: Normal browser
    MEDIUM: riskPercentage < 70,   // 40-69%: Potential anomalies
    HIGH: riskPercentage >= 70     // 70%+: Likely bot/headless
};
```

## Performance Considerations

### Optimization Strategies

#### 1. Lazy Initialization
```javascript
// Only run expensive checks when needed
class SpoofChecker {
    constructor() {
        this.basicChecks();
        
        // Defer expensive operations
        setTimeout(() => this.advancedChecks(), 100);
    }
}
```

#### 2. Event Throttling
```javascript
// Limit high-frequency events
const throttledMouseMove = throttle((e) => {
    this.logEvent('mouse', e);
}, 50); // Max 20 events per second
```

#### 3. Memory Management
```javascript
// Limit log size to prevent memory leaks
if (this.behaviorLog.length > 1000) {
    this.behaviorLog = this.behaviorLog.slice(-500);
}
```

### Browser Compatibility

#### Supported Browsers
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

#### Graceful Degradation
```javascript
// Handle missing APIs gracefully
try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Use audio fingerprinting
} catch (error) {
    // Fallback to other methods
    this.results.audioContext = { error: 'Not supported', risk: 0 };
}
```

## Security Considerations

### Data Privacy
- **No PII Collection**: Only technical browser characteristics
- **Local Processing**: All analysis happens client-side
- **Optional Export**: User controls data sharing

### Anti-Evasion Measures
- **Multiple Vectors**: Combines various detection methods
- **Dynamic Thresholds**: Adapts to new evasion techniques
- **Continuous Monitoring**: Real-time behavior analysis

### False Positive Mitigation
- **Weighted Scoring**: Reduces impact of single indicators
- **Context Awareness**: Considers legitimate use cases
- **Threshold Tuning**: Configurable sensitivity levels

## Integration Patterns

### Microservice Architecture
```javascript
// Standalone service for browser analysis
class BrowserAnalysisService {
    async analyze(request) {
        const spoof = await this.runSpoofDetection();
        const behavior = await this.analyzeBehavior();
        
        return {
            riskScore: spoof.riskScore,
            behaviorMetrics: behavior.stats,
            recommendations: this.generateRecommendations(spoof, behavior)
        };
    }
}
```

### Event-Driven Integration
```javascript
// Emit events for external systems
class EventEmitter extends BehaviorTracker {
    logEvent(type, data) {
        super.logEvent(type, data);
        
        // Emit to external systems
        this.emit('behaviorEvent', { type, data, timestamp: Date.now() });
    }
}
```

## Testing Strategy

### Unit Testing
```javascript
// Test individual detection methods
describe('SpoofChecker', () => {
    it('should detect WebDriver', () => {
        // Mock navigator.webdriver
        Object.defineProperty(navigator, 'webdriver', { value: true });
        
        const checker = new SpoofChecker();
        expect(checker.results.webDriver.suspicious).toBe(true);
    });
});
```

### Integration Testing
```javascript
// Test complete analysis flow
describe('Full Analysis', () => {
    it('should complete analysis within time limit', async () => {
        const startTime = Date.now();
        const checker = new SpoofChecker();
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        expect(Date.now() - startTime).toBeLessThan(3000);
        expect(checker.results).toBeDefined();
    });
});
```

## Deployment Considerations

### CDN Distribution
```html
<!-- Use CDN for production -->
<script src="https://cdn.jsdelivr.net/gh/ZhaslanToishybayev/browser-anomaly-checker@latest/spoof-check.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ZhaslanToishybayev/browser-anomaly-checker@latest/behavior-tracker.js"></script>
```

### Content Security Policy
```http
Content-Security-Policy: script-src 'self' 'unsafe-eval' cdn.jsdelivr.net;
```

### Performance Monitoring
```javascript
// Monitor analysis performance
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.name.includes('spoof-check')) {
            console.log(`Analysis took ${entry.duration}ms`);
        }
    });
});
```

---

For implementation details and advanced configurations, see [EXAMPLES.md](EXAMPLES.md).
