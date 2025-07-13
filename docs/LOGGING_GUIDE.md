# 🪵 Logging System Guide

## 📖 Overview

The Desktop App Template logging system provides comprehensive logging capabilities for debugging, monitoring, and analytics. It supports multiple log levels, structured data, remote logging, and performance monitoring for Electron desktop applications.

---

## 🚀 Quick Start

### **Basic Import**
```typescript
import logger from '../utils/logger';
```

### **Simple Logging**
```typescript
// Basic logging
logger.info('App started successfully');
logger.warn('Low battery detected');
logger.error('Failed to load user data');
logger.debug('User interaction data', { buttonId: 'submit', timestamp: Date.now() });
```

---

## 📊 Log Levels

### **Available Levels**
```typescript
export enum LogLevel {
  DEBUG = 0,    // Development debugging information
  INFO = 1,     // General information
  WARN = 2,     // Warning conditions
  ERROR = 3,    // Error conditions
  FATAL = 4,    // Critical failures
}
```

### **When to Use Each Level**

| Level | Use Case | Examples |
|-------|----------|----------|
| **DEBUG** | Development debugging | Variable values, function calls, detailed flow |
| **INFO** | General information | User actions, API calls, navigation |
| **WARN** | Warning conditions | Deprecated features, performance issues |
| **ERROR** | Errors that don't crash the app | API failures, validation errors |
| **FATAL** | Critical errors | App crashes, security breaches |

---

## 🛠️ Core Logging Methods

### **Basic Logging**
```typescript
// Debug logging (development only)
logger.debug('Processing user input', { input: userText });

// Information logging
logger.info('User successfully logged in', { userId: '123', timestamp: Date.now() });

// Warning logging
logger.warn('API response time exceeded threshold', { responseTime: 5000, threshold: 3000 });

// Error logging
logger.error('Failed to save user preferences', error, { userId: '123' });

// Fatal error logging
logger.fatal('Database connection lost', error, { retryAttempts: 3 });
```

### **Specialized Logging Methods**

#### **API Logging**
```typescript
// Log API calls
logger.apiCall('GET', '/api/users/123', { filters: { active: true } });

// Log API responses
logger.apiResponse('GET', '/api/users/123', 200, { user: userData });
logger.apiResponse('POST', '/api/auth/login', 401, { error: 'Invalid credentials' });
```

#### **Navigation Logging**
```typescript
// Log screen navigation
logger.navigation('HomeScreen', { fromScreen: 'LoginScreen', userId: '123' });
logger.navigation('ProfileScreen', { params: { userId: '123' } });
```

#### **User Action Logging**
```typescript
// Log user interactions
logger.userAction('button_click', { buttonId: 'submit_form', formType: 'registration' });
logger.userAction('swipe', { direction: 'left', screenName: 'ProductCarousel' });
logger.userAction('search', { query: 'desktop app', resultsCount: 42 });
```

#### **Authentication Logging**
```typescript
// Log authentication events
logger.auth('login_attempt', '123', { method: 'email' });
logger.auth('login_success', '123', { method: 'email', timestamp: Date.now() });
logger.auth('logout', '123');
logger.auth('password_reset_requested', undefined, { email: 'user@example.com' });
```

#### **Performance Logging**
```typescript
// Time operations
logger.time('data_processing');
// ... your expensive operation ...
logger.timeEnd('data_processing');

// Example with complex operation
logger.time('api_call_with_processing');
const response = await fetch('/api/data');
const data = await response.json();
const processedData = processData(data);
logger.timeEnd('api_call_with_processing');
```

---

## ⚙️ Configuration

### **Logger Configuration Options**
```typescript
interface LoggerConfig {
  enableConsole: boolean;      // Log to console
  enableRemote: boolean;       // Send logs to remote server
  enableFileLogging: boolean;  // Save logs to file (future feature)
  minLogLevel: LogLevel;       // Minimum log level to process
  maxLogEntries: number;       // Maximum logs to keep in memory
  remoteEndpoint?: string;     // Remote logging endpoint URL
  userId?: string;             // User ID for all logs
}
```

### **Updating Configuration**
```typescript
import { logger, LogLevel } from '../utils/logger';

// Update configuration at runtime
logger.updateConfig({
  enableRemote: true,
  remoteEndpoint: 'https://your-logging-server.com/logs',
  minLogLevel: LogLevel.INFO,
});

// Set user ID for all future logs
logger.setUserId('user_123');
```

### **Environment-Based Configuration**
```typescript
// In your app initialization
if (__DEV__) {
  logger.updateConfig({
    enableConsole: true,
    minLogLevel: LogLevel.DEBUG,
    enableRemote: false,
  });
} else {
  logger.updateConfig({
    enableConsole: false,
    minLogLevel: LogLevel.INFO,
    enableRemote: true,
    remoteEndpoint: process.env.REACT_APP_LOGGING_ENDPOINT,
  });
}
```

---

## 🖥️ Desktop App Integration

### **App.tsx Integration**
```typescript
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logger from './src/utils/logger';
import './global.css';

export default function App() {
  useEffect(() => {
    logger.info('Desktop app initialized', { 
      platform: process.platform,
      version: '1.0.0',
      timestamp: Date.now()
    });
    
    // Set up error boundary logging
    const handleError = (error: ErrorEvent) => {
      logger.fatal('Unhandled error', error.error, { 
        filename: error.filename,
        lineno: error.lineno,
        colno: error.colno 
      });
    };
    
    window.addEventListener('error', handleError);
    
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logger.error('Unhandled promise rejection', event.reason);
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      logger.info('App cleanup');
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <h1 className="text-lg font-bold">Welcome to Desktop App Template!</h1>
        <p className="text-blue-500 mt-2">Your desktop app is ready to go! 🚀</p>
      </div>
    </Router>
  );
}
```

### **Component-Level Logging**
```typescript
import React, { useEffect } from 'react';
import logger from '../utils/logger';

export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  useEffect(() => {
    logger.info('UserProfile component mounted', { userId });
    
    return () => {
      logger.debug('UserProfile component unmounted', { userId });
    };
  }, [userId]);

  const handleSaveProfile = async () => {
    logger.userAction('save_profile_clicked', { userId });
    
    try {
      logger.time('save_profile_operation');
      
      const response = await saveUserProfile(userId, profileData);
      
      logger.timeEnd('save_profile_operation');
      logger.info('Profile saved successfully', { userId, response });
      
    } catch (error) {
      logger.error('Failed to save profile', error, { userId });
    }
  };

  return (
    <div>
      <button onClick={handleSaveProfile} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Profile
      </button>
    </div>
  );
};
```

### **API Integration**
```typescript
// api/userService.ts
import logger from '../utils/logger';

export const fetchUser = async (userId: string) => {
  const url = `/api/users/${userId}`;
  
  logger.apiCall('GET', url);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    logger.apiResponse('GET', url, response.status, data);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.message}`);
    }
    
    return data;
  } catch (error) {
    logger.error('API call failed', error, { url, userId });
    throw error;
  }
};
```

---

## 📊 Log Management

### **Retrieving Logs**
```typescript
// Get all logs
const allLogs = logger.getLogs();

// Get logs by level
const errorLogs = logger.getLogsByLevel(LogLevel.ERROR);
const infoLogs = logger.getLogsByLevel(LogLevel.INFO);

// Get logging statistics
const stats = logger.getStats();
console.log('Total logs:', stats.totalLogs);
console.log('Logs by level:', stats.logsByLevel);
console.log('Session ID:', stats.sessionId);
```

### **Exporting Logs**
```typescript
// Export logs as JSON string
const logsJson = logger.exportLogs();

// Save to file or send to support
const sendLogsToSupport = () => {
  const logs = logger.exportLogs();
  // Send to your support system
  emailSupport('Debug logs', logs);
};
```

### **Clearing Logs**
```typescript
// Clear all logs from memory
logger.clearLogs();

// This is useful for:
// - Privacy (removing user data)
// - Memory management
// - Testing scenarios
```

---

## 🔧 Advanced Usage

### **Custom Log Entry Structure**
```typescript
// Every log entry contains:
interface LogEntry {
  timestamp: string;        // ISO timestamp
  level: LogLevel;         // Numeric level
  levelName: string;       // Human-readable level
  message: string;         // Log message
  data?: any;             // Additional context data
  stack?: string;         // Error stack trace (if applicable)
  platform: string;      // 'ios' or 'android'
  appVersion: string;     // App version
  userId?: string;        // Current user ID
  sessionId: string;      // Unique session identifier
}
```

### **Remote Logging Setup**
```typescript
// Configure remote logging
logger.updateConfig({
  enableRemote: true,
  remoteEndpoint: 'https://your-server.com/api/logs',
});

// The logger will automatically send POST requests with log entries
// Example server endpoint (Node.js/Express):
app.post('/api/logs', (req, res) => {
  const logEntry = req.body;
  console.log('Received log:', logEntry);
  
  // Store in database, forward to logging service, etc.
  saveLogToDatabase(logEntry);
  
  res.status(200).json({ received: true });
});
```

### **Custom Logger Instance**
```typescript
import { Logger, LogLevel } from '../utils/logger';

// Create custom logger for specific module
const apiLogger = new Logger({
  enableConsole: true,
  minLogLevel: LogLevel.INFO,
  maxLogEntries: 500,
});

apiLogger.info('API module initialized');
```

---

## 🎯 Best Practices

### **1. Log Meaningful Events**
```typescript
// ✅ Good - provides context
logger.info('User completed purchase', { 
  userId: '123', 
  orderId: 'order_456', 
  amount: 99.99,
  items: 3 
});

// ❌ Bad - too vague
logger.info('Something happened');
```

### **2. Use Appropriate Log Levels**
```typescript
// ✅ Good - correct level usage
logger.debug('Validating form data', { fieldCount: 5 });  // Development only
logger.info('User logged in', { userId: '123' });         // Important events
logger.warn('API response slow', { responseTime: 4000 }); // Performance issues
logger.error('Failed to save', error);                    // Errors
logger.fatal('Database unavailable', error);              // Critical failures

// ❌ Bad - wrong levels
logger.error('User clicked button');  // Should be info or debug
logger.info('Critical system failure'); // Should be error or fatal
```

### **3. Include Relevant Context**
```typescript
// ✅ Good - includes helpful context
logger.error('Payment processing failed', error, {
  userId: '123',
  paymentMethod: 'credit_card',
  amount: 99.99,
  attemptNumber: 2,
  timestamp: Date.now()
});

// ❌ Bad - missing context
logger.error('Payment failed', error);
```

### **4. Performance Considerations**
```typescript
// ✅ Good - minimal performance impact
logger.info('Operation completed', { duration: performance.now() - startTime });

// ❌ Bad - expensive operations
logger.debug('Full app state', JSON.stringify(hugeObject)); // Avoid large objects
logger.info('User data', await fetchAllUserData());        // Don't wait for async
```

### **5. Sensitive Data Handling**
```typescript
// ✅ Good - no sensitive data
logger.info('Login attempt', { 
  userId: user.id, 
  loginMethod: 'email',
  success: true 
});

// ❌ Bad - exposes sensitive data
logger.info('Login attempt', { 
  password: user.password,      // Never log passwords
  creditCard: user.cardNumber,  // Never log financial data
  ssn: user.socialSecurity     // Never log PII
});
```

---

## 🚨 Troubleshooting

### **Common Issues**

#### **Logs Not Appearing**
```typescript
// Check log level configuration
const stats = logger.getStats();
console.log('Current config:', stats);

// Ensure console logging is enabled
logger.updateConfig({ enableConsole: true });
```

#### **Remote Logging Failing**
```typescript
// Check network connectivity and endpoint
logger.updateConfig({
  enableRemote: true,
  remoteEndpoint: 'https://your-correct-endpoint.com/logs'
});

// Check for CORS issues in development
```

#### **Too Many Logs**
```typescript
// Increase log level to reduce noise
logger.updateConfig({ 
  minLogLevel: LogLevel.INFO  // Skip debug logs
});

// Reduce buffer size
logger.updateConfig({ 
  maxLogEntries: 500  // Keep fewer logs in memory
});
```

#### **Performance Issues**
```typescript
// Disable console logging in production
if (!__DEV__) {
  logger.updateConfig({ enableConsole: false });
}

// Avoid logging large objects
logger.info('Data processed', { count: data.length }); // Instead of the full data array
```

---

## 📈 Monitoring and Analytics

### **Tracking User Behavior**
```typescript
// Track user journey
logger.navigation('HomeScreen');
logger.userAction('search', { query: 'desktop app' });
logger.userAction('filter_applied', { category: 'tutorials' });
logger.userAction('item_selected', { itemId: '123' });
logger.navigation('ItemDetailScreen', { itemId: '123' });
```

### **Performance Monitoring**
```typescript
// Track app performance
logger.time('app_startup');
// App initialization code
logger.timeEnd('app_startup');

logger.time('screen_render');
// Screen rendering code
logger.timeEnd('screen_render');

// Track memory usage
logger.info('Memory usage', { 
  used: Math.round(performance.memory?.usedJSHeapSize / 1024 / 1024) || 'unknown'
});
```

### **Error Tracking**
```typescript
// Track different types of errors
logger.error('Network error', error, { endpoint: '/api/users', retryable: true });
logger.error('Validation error', error, { field: 'email', userInput: email });
logger.error('Permission error', error, { requiredPermission: 'camera' });
```

---

**Last Updated:** 2025-07-12
**Next Review:** ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}  
**Maintained by:** Development Team 