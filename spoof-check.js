/**
 * Browser Anomaly & Spoof Detection Script
 * Анализирует браузер на предмет headless-режима, подмены и нестандартного окружения
 */

class SpoofChecker {
  constructor() {
    this.results = {};
    this.riskScore = 0;
    this.maxRisk = 20; // Увеличили максимальный риск из-за новых проверок
    this.init();
  }

  init() {
    console.log('🔍 Запуск анализа браузера...');
    this.runAllChecks();
    this.displayResults();
  }

  runAllChecks() {
    this.checkUserAgent();
    this.checkWebDriver();
    this.checkLanguages();
    this.checkHardware();
    this.checkTouchSupport();
    this.checkEvalFunction();
    this.checkPlugins();
    this.checkScreenProperties();
    this.checkTimezone();
    this.checkWebGL();
    this.checkPermissions();
    this.checkBatteryAPI();
    this.checkCanvasFingerprint();
    this.checkAudioContext();
    this.checkAdvancedPermissions();
    this.checkNavigatorProperties();
  }

  checkUserAgent() {
    const ua = navigator.userAgent;
    const suspicious = [
      'HeadlessChrome',
      'PhantomJS',
      'SlimerJS',
      'HtmlUnit',
      'bot',
      'crawler',
      'spider'
    ];
    
    const isSuspicious = suspicious.some(term => ua.includes(term));
    
    this.results.userAgent = {
      value: ua,
      suspicious: isSuspicious,
      risk: isSuspicious ? 3 : 0
    };
    
    if (isSuspicious) this.riskScore += 3;
  }

  checkWebDriver() {
    const hasWebDriver = navigator.webdriver === true;
    
    this.results.webDriver = {
      value: hasWebDriver,
      suspicious: hasWebDriver,
      risk: hasWebDriver ? 4 : 0
    };
    
    if (hasWebDriver) this.riskScore += 4;
  }

  checkLanguages() {
    const languages = navigator.languages;
    const isEmpty = !languages || languages.length === 0;
    const onlyEnglish = languages && languages.length === 1 && languages[0] === 'en-US';
    
    this.results.languages = {
      value: languages,
      suspicious: isEmpty || onlyEnglish,
      risk: isEmpty ? 2 : (onlyEnglish ? 1 : 0)
    };
    
    if (isEmpty) this.riskScore += 2;
    else if (onlyEnglish) this.riskScore += 1;
  }

  checkHardware() {
    const memory = navigator.deviceMemory || 'unknown';
    const cores = navigator.hardwareConcurrency || 'unknown';
    
    const lowMemory = memory <= 2;
    const lowCores = cores <= 2;
    
    this.results.hardware = {
      memory: memory,
      cores: cores,
      suspicious: lowMemory || lowCores,
      risk: (lowMemory ? 1 : 0) + (lowCores ? 1 : 0)
    };
    
    if (lowMemory) this.riskScore += 1;
    if (lowCores) this.riskScore += 1;
  }

  checkTouchSupport() {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    this.results.touchSupport = {
      value: hasTouch,
      suspicious: false, // Отсутствие touch не всегда подозрительно
      risk: 0
    };
  }

  checkEvalFunction() {
    let evalBlocked = false;
    let evalString = '';
    
    try {
      evalString = eval.toString();
      // Проверяем, не подменена ли функция eval
      if (evalString.includes('[native code]') === false) {
        evalBlocked = true;
      }
    } catch (e) {
      evalBlocked = true;
    }
    
    this.results.evalFunction = {
      blocked: evalBlocked,
      string: evalString,
      suspicious: evalBlocked,
      risk: evalBlocked ? 2 : 0
    };
    
    if (evalBlocked) this.riskScore += 2;
  }

  checkPlugins() {
    const pluginCount = navigator.plugins ? navigator.plugins.length : 0;
    const noPlugins = pluginCount === 0;
    
    this.results.plugins = {
      count: pluginCount,
      suspicious: noPlugins,
      risk: noPlugins ? 1 : 0
    };
    
    if (noPlugins) this.riskScore += 1;
  }

  checkScreenProperties() {
    const screen = window.screen;
    const suspiciousResolutions = [
      '1024x768', '800x600', '1280x1024'
    ];
    
    const resolution = `${screen.width}x${screen.height}`;
    const isSuspicious = suspiciousResolutions.includes(resolution);
    
    this.results.screen = {
      resolution: resolution,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      suspicious: isSuspicious,
      risk: isSuspicious ? 1 : 0
    };
    
    if (isSuspicious) this.riskScore += 1;
  }

  checkTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset();
    
    // Проверяем на стандартные "подозрительные" часовые пояса
    const suspiciousTimezones = ['UTC', 'GMT'];
    const isSuspicious = suspiciousTimezones.includes(timezone);
    
    this.results.timezone = {
      timezone: timezone,
      offset: offset,
      suspicious: isSuspicious,
      risk: isSuspicious ? 1 : 0
    };
    
    if (isSuspicious) this.riskScore += 1;
  }

  checkWebGL() {
    let webglSupported = false;
    let renderer = 'unknown';
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (gl) {
        webglSupported = true;
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
    } catch (e) {
      // WebGL не поддерживается
    }
    
    const noWebGL = !webglSupported;
    const suspiciousRenderer = renderer.includes('SwiftShader') || renderer.includes('Mesa');
    
    this.results.webgl = {
      supported: webglSupported,
      renderer: renderer,
      suspicious: noWebGL || suspiciousRenderer,
      risk: (noWebGL ? 1 : 0) + (suspiciousRenderer ? 1 : 0)
    };
    
    if (noWebGL) this.riskScore += 1;
    if (suspiciousRenderer) this.riskScore += 1;
  }

  checkPermissions() {
    // Проверяем доступность Permissions API
    const hasPermissionsAPI = 'permissions' in navigator;
    
    this.results.permissions = {
      hasAPI: hasPermissionsAPI,
      suspicious: !hasPermissionsAPI,
      risk: !hasPermissionsAPI ? 1 : 0
    };
    
    if (!hasPermissionsAPI) this.riskScore += 1;
  }

  checkBatteryAPI() {
    // Проверяем Battery API (deprecated, но может быть индикатором)
    const hasBatteryAPI = 'getBattery' in navigator;

    this.results.battery = {
      hasAPI: hasBatteryAPI,
      suspicious: false, // Отсутствие Battery API нормально
      risk: 0
    };
  }

  checkCanvasFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Устанавливаем размер canvas
      canvas.width = 200;
      canvas.height = 50;

      // Рисуем текст с различными стилями
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);

      ctx.fillStyle = '#069';
      ctx.fillText('Canvas fingerprint test 🔍', 2, 15);

      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Canvas fingerprint test 🔍', 4, 17);

      // Добавляем геометрические фигуры
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgb(255,0,255)';
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      // Получаем fingerprint
      const canvasData = canvas.toDataURL();
      const canvasHash = this.simpleHash(canvasData);

      // Известные хеши для headless браузеров
      const suspiciousHashes = [
        '1234567890', // Пример подозрительного хеша
        '0987654321', // Еще один пример
      ];

      const isSuspicious = suspiciousHashes.includes(canvasHash) ||
                          canvasData.length < 5000; // Слишком короткий результат

      this.results.canvasFingerprint = {
        hash: canvasHash,
        dataLength: canvasData.length,
        suspicious: isSuspicious,
        risk: isSuspicious ? 3 : 0
      };

      if (isSuspicious) this.riskScore += 3;

    } catch (error) {
      this.results.canvasFingerprint = {
        error: error.message,
        suspicious: true,
        risk: 2
      };
      this.riskScore += 2;
    }
  }

  checkAudioContext() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      const gainNode = audioContext.createGain();
      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

      // Создаем уникальную аудио-подпись
      oscillator.type = 'triangle';
      oscillator.frequency.value = 10000;

      gainNode.gain.value = 0;
      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(0);

      // Получаем fingerprint через анализ частот
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencyData);

      const audioHash = this.simpleHash(Array.from(frequencyData).join(''));

      oscillator.stop();
      audioContext.close();

      // Проверяем на подозрительные значения
      const isSuspicious = audioHash === '0' || frequencyData.every(val => val === 0);

      this.results.audioContext = {
        hash: audioHash,
        sampleRate: audioContext.sampleRate,
        suspicious: isSuspicious,
        risk: isSuspicious ? 2 : 0
      };

      if (isSuspicious) this.riskScore += 2;

    } catch (error) {
      this.results.audioContext = {
        error: error.message,
        suspicious: true,
        risk: 1
      };
      this.riskScore += 1;
    }
  }

  checkAdvancedPermissions() {
    if (!('permissions' in navigator)) {
      this.results.advancedPermissions = {
        available: false,
        suspicious: true,
        risk: 1
      };
      this.riskScore += 1;
      return;
    }

    const permissionsToCheck = [
      'notifications',
      'geolocation',
      'camera',
      'microphone'
    ];

    const permissionResults = {};
    let suspiciousCount = 0;

    Promise.all(
      permissionsToCheck.map(async (permission) => {
        try {
          const result = await navigator.permissions.query({ name: permission });
          permissionResults[permission] = result.state;

          // Если все разрешения denied по умолчанию - подозрительно
          if (result.state === 'denied') {
            suspiciousCount++;
          }
        } catch (error) {
          permissionResults[permission] = 'error';
          suspiciousCount++;
        }
      })
    ).then(() => {
      const allDenied = suspiciousCount === permissionsToCheck.length;

      this.results.advancedPermissions = {
        permissions: permissionResults,
        allDenied: allDenied,
        suspicious: allDenied,
        risk: allDenied ? 2 : 0
      };

      if (allDenied) this.riskScore += 2;
    }).catch(() => {
      this.results.advancedPermissions = {
        error: 'Permission check failed',
        suspicious: true,
        risk: 1
      };
      this.riskScore += 1;
    });
  }

  checkNavigatorProperties() {
    const suspiciousProperties = {
      cookieEnabled: navigator.cookieEnabled === false,
      onLine: navigator.onLine === false,
      doNotTrack: navigator.doNotTrack === '1',
      maxTouchPoints: navigator.maxTouchPoints === 0,
      pdfViewerEnabled: navigator.pdfViewerEnabled === false
    };

    const suspiciousCount = Object.values(suspiciousProperties).filter(Boolean).length;
    const isSuspicious = suspiciousCount >= 3;

    this.results.navigatorProperties = {
      properties: suspiciousProperties,
      suspiciousCount: suspiciousCount,
      suspicious: isSuspicious,
      risk: isSuspicious ? 2 : 0
    };

    if (isSuspicious) this.riskScore += 2;
  }

  // Простая хеш-функция для fingerprinting
  simpleHash(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString();

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Конвертируем в 32-битное число
    }

    return Math.abs(hash).toString(16);
  }

  getRiskLevel() {
    const percentage = (this.riskScore / this.maxRisk) * 100;
    
    if (percentage >= 70) return { level: 'HIGH', class: 'risk-high', text: 'Высокий риск' };
    if (percentage >= 40) return { level: 'MEDIUM', class: 'risk-medium', text: 'Средний риск' };
    return { level: 'LOW', class: 'risk-low', text: 'Низкий риск' };
  }

  displayResults() {
    this.updateRiskIndicator();
    this.updateSpoofTable();
    this.updateConsoleOutput();

    // Выводим в консоль для удобства
    console.table(this.results);
    console.log(`🎯 Итоговый риск-скор: ${this.riskScore}/${this.maxRisk} (${this.getRiskLevel().text})`);
  }

  updateRiskIndicator() {
    const risk = this.getRiskLevel();
    const indicator = document.getElementById('riskIndicator');
    const riskText = document.getElementById('riskText');

    // Обновляем класс индикатора
    indicator.className = `risk-indicator risk-${risk.level.toLowerCase()}`;

    // Обновляем текст
    const percentage = Math.round((this.riskScore / this.maxRisk) * 100);
    riskText.textContent = `${risk.text} (${this.riskScore}/${this.maxRisk} - ${percentage}%)`;
  }

  updateSpoofTable() {
    const tableBody = document.getElementById('spoofTableBody');
    let tableHTML = '';

    Object.entries(this.results).forEach(([key, data]) => {
      const icon = data.suspicious ? '⚠️' : '✅';
      const displayValue = this.formatValue(data.value || data);
      const riskClass = `risk-${data.risk}`;

      tableHTML += `
        <tr>
          <td class="check-name">${icon} ${this.formatCheckName(key)}</td>
          <td class="check-value">${displayValue}</td>
          <td><span class="risk-badge ${riskClass}">${data.risk}</span></td>
          <td>${data.suspicious ? '🚨 Suspicious' : '✅ Normal'}</td>
        </tr>
      `;
    });

    tableBody.innerHTML = tableHTML;
  }

  updateConsoleOutput() {
    const consoleElement = document.getElementById('spoofConsole');
    const risk = this.getRiskLevel();

    let output = '🔍 BROWSER ANALYSIS COMPLETE\n';
    output += '═'.repeat(40) + '\n\n';

    output += `🎯 RISK SCORE: ${this.riskScore}/${this.maxRisk} (${Math.round((this.riskScore / this.maxRisk) * 100)}%)\n`;
    output += `📊 RISK LEVEL: ${risk.text}\n\n`;

    output += '📋 SUMMARY:\n';
    const suspiciousChecks = Object.entries(this.results).filter(([_, data]) => data.suspicious);

    if (suspiciousChecks.length === 0) {
      output += '✅ No anomalies detected\n';
    } else {
      output += `⚠️ ${suspiciousChecks.length} anomalies detected:\n`;
      suspiciousChecks.forEach(([key, data]) => {
        output += `   • ${this.formatCheckName(key)} (Risk: ${data.risk})\n`;
      });
    }

    output += `\n⏱️ Analysis completed at ${new Date().toLocaleTimeString()}`;

    consoleElement.textContent = output;
  }

  formatCheckName(key) {
    const names = {
      userAgent: 'User Agent',
      webDriver: 'WebDriver Detection',
      languages: 'Browser Languages',
      hardware: 'Hardware Info',
      touchSupport: 'Touch Support',
      evalFunction: 'Eval Function',
      plugins: 'Browser Plugins',
      screen: 'Screen Properties',
      timezone: 'Timezone',
      webgl: 'WebGL Support',
      permissions: 'Permissions API',
      battery: 'Battery API',
      canvasFingerprint: 'Canvas Fingerprint',
      audioContext: 'Audio Context',
      advancedPermissions: 'Advanced Permissions',
      navigatorProperties: 'Navigator Properties'
    };
    return names[key] || key;
  }

  formatValue(value) {
    if (typeof value === 'object' && value !== null) {
      if (value.value !== undefined) return this.formatValue(value.value);
      if (value.resolution) return value.resolution;
      if (value.memory && value.cores) return `${value.memory}GB RAM, ${value.cores} cores`;
      return JSON.stringify(value).substring(0, 50) + '...';
    }

    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }

    return String(value);
  }

  // Функция для экспорта отчета
  exportReport() {
    const report = {
      timestamp: new Date().toISOString(),
      riskScore: this.riskScore,
      maxRisk: this.maxRisk,
      riskLevel: this.getRiskLevel(),
      results: this.results,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spoof-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('📄 Spoof analysis report exported');
    return report;
  }
}

// Запускаем проверку после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  window.spoofChecker = new SpoofChecker();
});

// Глобальная функция для экспорта отчета
function exportSpoofReport() {
  if (window.spoofChecker) {
    return window.spoofChecker.exportReport();
  } else {
    console.error('Spoof checker not initialized');
  }
}
