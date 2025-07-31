# 🤝 Contributing to Browser Anomaly Checker

Thank you for your interest in contributing to the Browser Anomaly Checker! This document provides guidelines and information for contributors.

## 🎯 Ways to Contribute

### 🐛 Bug Reports
- Use GitHub Issues to report bugs
- Include detailed reproduction steps
- Provide browser version and OS information
- Check existing issues before creating new ones

### 💡 Feature Requests
- Suggest new detection methods
- Propose UI/UX improvements
- Request integration examples
- Share use case scenarios

### 🔧 Code Contributions
- Fix bugs and improve existing features
- Add new detection techniques
- Enhance documentation
- Improve test coverage

### 📚 Documentation
- Improve README and technical docs
- Add usage examples
- Create tutorials and guides
- Fix typos and clarify explanations

## 🚀 Getting Started

### Development Setup
```bash
# Clone the repository
git clone https://github.com/ZhaslanToishybayev/browser-anomaly-checker.git
cd browser-anomaly-checker

# No build process required - pure HTML/JS/CSS
# Start local development server
python -m http.server 8000
# Or use Node.js
npx http-server

# Open in browser
open http://localhost:8000
```

### Project Structure
```
browser-anomaly-checker/
├── index.html              # Main UI and demo page
├── spoof-check.js          # Spoof detection engine
├── behavior-tracker.js     # Behavior analysis engine
├── README.md              # Project documentation
├── EXAMPLES.md            # Usage examples
├── TECHNICAL.md           # Technical documentation
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # This file
└── LICENSE                # MIT license
```

## 📝 Contribution Guidelines

### Code Style

#### JavaScript
- Use ES6+ features (classes, arrow functions, const/let)
- Follow camelCase naming convention
- Add JSDoc comments for functions
- Handle errors gracefully
- Use meaningful variable names

```javascript
/**
 * Analyzes canvas fingerprint for bot detection
 * @returns {Object} Analysis result with risk assessment
 */
checkCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        // Implementation...
        return { suspicious: false, risk: 0 };
    } catch (error) {
        return { error: error.message, suspicious: true, risk: 1 };
    }
}
```

#### HTML/CSS
- Use semantic HTML5 elements
- Follow BEM methodology for CSS classes
- Ensure responsive design
- Maintain accessibility standards

### Commit Messages
Follow conventional commit format:
```
type(scope): description

Examples:
feat(detection): add canvas fingerprinting
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
test(behavior): add mouse tracking tests
```

### Pull Request Process

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/browser-anomaly-checker.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clean, documented code
   - Test your changes thoroughly
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Test in multiple browsers
   # Verify all existing functionality works
   # Check console for errors
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(detection): add new fingerprinting method"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

## 🔍 Adding New Detection Methods

### Detection Method Template
```javascript
checkNewMethod() {
    try {
        // Your detection logic here
        const result = performDetection();
        const isSuspicious = evaluateResult(result);
        
        this.results.newMethod = {
            value: result,
            suspicious: isSuspicious,
            risk: isSuspicious ? riskWeight : 0
        };
        
        if (isSuspicious) this.riskScore += riskWeight;
        
    } catch (error) {
        this.results.newMethod = {
            error: error.message,
            suspicious: true,
            risk: 1
        };
        this.riskScore += 1;
    }
}
```

### Integration Steps
1. Add method to `runAllChecks()`
2. Update `formatCheckName()` with display name
3. Test across different browsers
4. Document the new method
5. Update risk scoring if needed

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Verify mobile responsiveness
- [ ] Check console for errors
- [ ] Test export functionality
- [ ] Validate risk scoring accuracy
- [ ] Ensure graceful error handling

### Browser Testing
```javascript
// Test detection accuracy
const testCases = [
    { browser: 'Chrome', expected: 'low_risk' },
    { browser: 'Firefox', expected: 'low_risk' },
    { browser: 'Headless Chrome', expected: 'high_risk' }
];
```

### Performance Testing
- Monitor analysis completion time (<2 seconds)
- Check memory usage during long sessions
- Verify event handler performance
- Test with high-frequency interactions

## 📋 Issue Templates

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Environment**
- Browser: [e.g. Chrome 91]
- OS: [e.g. Windows 10]
- Version: [e.g. 2.0.0]

**Additional Context**
Screenshots, console logs, etc.
```

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Any other relevant information
```

## 🏆 Recognition

### Contributors
All contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md acknowledgments
- GitHub contributors page

### Types of Contributions
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation
- 🎨 UI/UX improvements
- 🔧 Code refactoring
- 🧪 Testing
- 💡 Ideas and suggestions

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: znurlanuly203@gmail.com for direct contact

### Response Times
- Issues: Within 48 hours
- Pull requests: Within 72 hours
- Questions: Within 24 hours

## 📜 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Spam or off-topic content

## 🎉 Thank You!

Your contributions make this project better for everyone. Whether you're fixing a typo, adding a feature, or sharing ideas, every contribution is valuable and appreciated!

---

**Questions?** Feel free to reach out via GitHub Issues or email. We're here to help! 🚀
