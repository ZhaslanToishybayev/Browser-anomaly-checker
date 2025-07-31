/**
 * Behavior Tracking Script
 * Отслеживает поведение пользователя для определения активности и паттернов взаимодействия
 */

class BehaviorTracker {
  constructor() {
    this.events = {
      mouse: 0,
      scroll: 0,
      keyboard: 0,
      focus: 0,
      visibility: 0
    };
    
    this.lastActivity = Date.now();
    this.isActive = true;
    this.sessionStart = Date.now();
    this.behaviorLog = [];
    this.inactivityThreshold = 10000; // 10 секунд
    
    this.init();
  }

  init() {
    console.log('👁️‍🗨️ Запуск отслеживания поведения...');
    this.setupEventListeners();
    this.startInactivityMonitor();
    this.startPeriodicReport();
  }

  setupEventListeners() {
    // Отслеживание движения мыши
    document.addEventListener('mousemove', (e) => {
      this.logEvent('mouse', {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
      this.updateActivity();
    });

    // Отслеживание кликов
    document.addEventListener('click', (e) => {
      this.logEvent('click', {
        x: e.clientX,
        y: e.clientY,
        target: e.target.tagName,
        timestamp: Date.now()
      });
      this.updateActivity();
    });

    // Отслеживание скролла
    document.addEventListener('scroll', () => {
      this.logEvent('scroll', {
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        timestamp: Date.now()
      });
      this.updateActivity();
    });

    // Отслеживание клавиатуры
    document.addEventListener('keydown', (e) => {
      this.logEvent('keyboard', {
        key: e.key,
        code: e.code,
        timestamp: Date.now()
      });
      this.updateActivity();
    });

    // Отслеживание фокуса окна
    window.addEventListener('focus', () => {
      this.logEvent('focus', {
        type: 'focus',
        timestamp: Date.now()
      });
      this.updateActivity();
    });

    window.addEventListener('blur', () => {
      this.logEvent('focus', {
        type: 'blur',
        timestamp: Date.now()
      });
    });

    // Отслеживание видимости страницы
    document.addEventListener('visibilitychange', () => {
      const isVisible = !document.hidden;
      this.logEvent('visibility', {
        visible: isVisible,
        timestamp: Date.now()
      });
      
      if (isVisible) {
        this.updateActivity();
      }
    });

    // Отслеживание изменения размера окна
    window.addEventListener('resize', () => {
      this.logEvent('resize', {
        width: window.innerWidth,
        height: window.innerHeight,
        timestamp: Date.now()
      });
    });

    // Отслеживание контекстного меню
    document.addEventListener('contextmenu', (e) => {
      this.logEvent('contextmenu', {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    });
  }

  logEvent(type, data) {
    this.events[type] = (this.events[type] || 0) + 1;
    
    this.behaviorLog.push({
      type,
      data,
      sessionTime: Date.now() - this.sessionStart
    });

    // Ограничиваем размер лога
    if (this.behaviorLog.length > 1000) {
      this.behaviorLog = this.behaviorLog.slice(-500);
    }

    this.updateCounters();
  }

  updateActivity() {
    this.lastActivity = Date.now();
    if (!this.isActive) {
      this.isActive = true;
      this.updateActivityStatus();
      console.log('✅ Пользователь снова активен');
    }
  }

  updateCounters() {
    const totalEvents = Object.values(this.events).reduce((sum, count) => sum + count, 0);
    const sessionDuration = Math.round((Date.now() - this.sessionStart) / 1000);

    document.getElementById('mouseEvents').textContent = this.events.mouse || 0;
    document.getElementById('scrollEvents').textContent = this.events.scroll || 0;
    document.getElementById('keyEvents').textContent = this.events.keyboard || 0;
    document.getElementById('focusEvents').textContent = this.events.focus || 0;
    document.getElementById('totalEvents').textContent = totalEvents;
    document.getElementById('sessionTime').textContent = `${sessionDuration}s`;
  }

  updateActivityStatus() {
    const indicator = document.getElementById('activityDot');
    const text = document.getElementById('activityText');

    if (this.isActive) {
      indicator.className = 'activity-dot active';
      text.textContent = 'User Active';
    } else {
      indicator.className = 'activity-dot inactive';
      text.textContent = 'Passive Behavior Detected';
    }
  }

  startInactivityMonitor() {
    setInterval(() => {
      const timeSinceLastActivity = Date.now() - this.lastActivity;
      
      if (timeSinceLastActivity > this.inactivityThreshold && this.isActive) {
        this.isActive = false;
        this.updateActivityStatus();
        console.log('⚠️ Обнаружено пассивное поведение');
        
        this.logEvent('inactivity', {
          duration: timeSinceLastActivity,
          timestamp: Date.now()
        });
      }
    }, 1000);
  }

  startPeriodicReport() {
    setInterval(() => {
      this.generateReport();
    }, 5000); // Обновляем отчет каждые 5 секунд
  }

  generateReport() {
    const consoleElement = document.getElementById('behaviorConsole');
    const sessionDuration = Date.now() - this.sessionStart;
    const timeSinceLastActivity = Date.now() - this.lastActivity;

    let report = '👁️‍🗨️ BEHAVIOR ANALYSIS REPORT\n';
    report += '═'.repeat(40) + '\n\n';

    // Общая статистика
    report += '📊 SESSION STATISTICS:\n';
    report += `   Duration: ${Math.round(sessionDuration / 1000)}s\n`;
    report += `   Last Activity: ${Math.round(timeSinceLastActivity / 1000)}s ago\n`;
    report += `   Status: ${this.isActive ? 'ACTIVE' : 'INACTIVE'}\n\n`;

    // Анализ активности
    const totalEvents = Object.values(this.events).reduce((sum, count) => sum + count, 0);
    const eventsPerMinute = totalEvents / (sessionDuration / 60000);

    report += '📈 ACTIVITY ANALYSIS:\n';
    report += `   Total Events: ${totalEvents}\n`;
    report += `   Events/Minute: ${eventsPerMinute.toFixed(1)}\n`;
    report += `   Activity Level: ${this.getActivityLevel(eventsPerMinute)}\n\n`;

    // Паттерны поведения
    report += '🧠 BEHAVIOR PATTERNS:\n';
    report += this.analyzeBehaviorPatterns();

    // Последние события
    const recentEvents = this.behaviorLog.slice(-3);
    if (recentEvents.length > 0) {
      report += '\n🕒 RECENT EVENTS:\n';
      recentEvents.forEach(event => {
        const timeAgo = Math.round((Date.now() - this.sessionStart - event.sessionTime) / 1000);
        report += `   ${this.getEventIcon(event.type)} ${event.type} (${timeAgo}s ago)\n`;
      });
    }

    report += `\n⏱️ Updated: ${new Date().toLocaleTimeString()}`;

    consoleElement.textContent = report;
  }

  getEventIcon(type) {
    const icons = {
      mouse: '🖱️',
      click: '👆',
      scroll: '📜',
      keyboard: '⌨️',
      focus: '👁️',
      visibility: '👀',
      resize: '📐',
      contextmenu: '📋',
      inactivity: '😴'
    };
    return icons[type] || '📌';
  }

  getActivityLevel(eventsPerMinute) {
    if (eventsPerMinute > 50) return 'ОЧЕНЬ ВЫСОКИЙ 🔥';
    if (eventsPerMinute > 20) return 'ВЫСОКИЙ ⚡';
    if (eventsPerMinute > 10) return 'СРЕДНИЙ 📊';
    if (eventsPerMinute > 5) return 'НИЗКИЙ 📉';
    return 'ОЧЕНЬ НИЗКИЙ 😴';
  }

  analyzeBehaviorPatterns() {
    let analysis = '';
    
    // Анализ соотношения событий
    const mouseEvents = this.events.mouse || 0;
    const keyboardEvents = this.events.keyboard || 0;
    const scrollEvents = this.events.scroll || 0;
    
    if (mouseEvents > keyboardEvents * 10) {
      analysis += '   🖱️ Преимущественно мышь (возможно, просмотр)\n';
    } else if (keyboardEvents > mouseEvents * 2) {
      analysis += '   ⌨️ Активный ввод текста\n';
    }
    
    if (scrollEvents > 50) {
      analysis += '   📜 Интенсивный скроллинг\n';
    }
    
    // Анализ временных паттернов
    const recentEvents = this.behaviorLog.slice(-20);
    const eventTypes = recentEvents.map(e => e.type);
    const uniqueTypes = [...new Set(eventTypes)];
    
    if (uniqueTypes.length === 1 && uniqueTypes[0] === 'mouse') {
      analysis += '   🤖 Подозрительно: только движения мыши\n';
    }
    
    if (this.events.focus > 10) {
      analysis += '   🔄 Частые переключения фокуса\n';
    }
    
    if (analysis === '') {
      analysis = '   ✅ Нормальные паттерны поведения\n';
    }
    
    return analysis;
  }

  // Публичные методы для внешнего использования
  getSessionStats() {
    return {
      duration: Date.now() - this.sessionStart,
      events: { ...this.events },
      isActive: this.isActive,
      lastActivity: this.lastActivity,
      totalEvents: Object.values(this.events).reduce((sum, count) => sum + count, 0)
    };
  }

  exportBehaviorData() {
    const sessionDuration = Date.now() - this.sessionStart;
    const totalEvents = Object.values(this.events).reduce((sum, count) => sum + count, 0);
    const eventsPerMinute = totalEvents / (sessionDuration / 60000);

    return {
      timestamp: new Date().toISOString(),
      sessionStart: this.sessionStart,
      sessionDuration: sessionDuration,
      events: this.events,
      totalEvents: totalEvents,
      eventsPerMinute: eventsPerMinute,
      activityLevel: this.getActivityLevel(eventsPerMinute),
      isActive: this.isActive,
      lastActivity: this.lastActivity,
      behaviorPatterns: this.analyzeBehaviorPatterns(),
      behaviorLog: this.behaviorLog.slice(-100), // Последние 100 событий
      stats: this.getSessionStats(),
      url: window.location.href
    };
  }

  exportReport() {
    const data = this.exportBehaviorData();

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `behavior-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('📊 Behavior analysis report exported');
    return data;
  }
}

// Запускаем отслеживание после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  window.behaviorTracker = new BehaviorTracker();
});

// Глобальные функции для экспорта данных
function exportBehaviorReport() {
  if (window.behaviorTracker) {
    return window.behaviorTracker.exportReport();
  } else {
    console.error('Behavior tracker not initialized');
  }
}

function exportBehaviorData() {
  if (window.behaviorTracker) {
    const data = window.behaviorTracker.exportBehaviorData();
    console.log('📊 Экспорт данных поведения:', data);
    return data;
  } else {
    console.error('Behavior tracker not initialized');
  }
}
