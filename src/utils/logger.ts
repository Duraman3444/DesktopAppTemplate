/**
 * Comprehensive Logging Utility for React Native
 * Supports multiple log levels, formatting, and remote logging
 */

import { Platform } from 'react-native';

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

// Log entry interface
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  levelName: string;
  message: string;
  data?: any;
  stack?: string;
  platform: string;
  appVersion: string;
  userId?: string;
  sessionId: string;
}

// Logger configuration
interface LoggerConfig {
  enableConsole: boolean;
  enableRemote: boolean;
  enableFileLogging: boolean;
  minLogLevel: LogLevel;
  maxLogEntries: number;
  remoteEndpoint?: string;
  userId?: string;
}

class Logger {
  private config: LoggerConfig;
  private logBuffer: LogEntry[] = [];
  private sessionId: string;
  private appVersion: string;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      enableConsole: true,
      enableRemote: false,
      enableFileLogging: false,
      minLogLevel: __DEV__ ? LogLevel.DEBUG : LogLevel.INFO,
      maxLogEntries: 1000,
      ...config,
    };
    
    this.sessionId = this.generateSessionId();
    this.appVersion = '1.0.0'; // Should be imported from app.json
    
    this.info('Logger initialized', { config: this.config });
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get log level name
   */
  private getLevelName(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return 'DEBUG';
      case LogLevel.INFO:
        return 'INFO';
      case LogLevel.WARN:
        return 'WARN';
      case LogLevel.ERROR:
        return 'ERROR';
      case LogLevel.FATAL:
        return 'FATAL';
      default:
        return 'UNKNOWN';
    }
  }

  /**
   * Get console method for log level
   */
  private getConsoleMethod(level: LogLevel) {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * Format timestamp
   */
  private formatTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  /**
   * Create log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: any,
    error?: Error
  ): LogEntry {
    return {
      timestamp: this.formatTimestamp(),
      level,
      levelName: this.getLevelName(level),
      message,
      data,
      stack: error?.stack,
      platform: Platform.OS,
      appVersion: this.appVersion,
      userId: this.config.userId,
      sessionId: this.sessionId,
    };
  }

  /**
   * Add log entry to buffer
   */
  private addToBuffer(entry: LogEntry): void {
    this.logBuffer.push(entry);
    
    // Trim buffer if it exceeds max entries
    if (this.logBuffer.length > this.config.maxLogEntries) {
      this.logBuffer = this.logBuffer.slice(-this.config.maxLogEntries);
    }
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole) return;

    const consoleMethod = this.getConsoleMethod(entry.level);
    const emoji = this.getLevelEmoji(entry.level);
    const timestamp = entry.timestamp.substring(11, 23); // HH:MM:SS.mmm
    
    const formattedMessage = `${emoji} [${timestamp}] ${entry.levelName}: ${entry.message}`;
    
    if (entry.data) {
      consoleMethod(formattedMessage, entry.data);
    } else {
      consoleMethod(formattedMessage);
    }
    
    if (entry.stack) {
      console.error('Stack trace:', entry.stack);
    }
  }

  /**
   * Get emoji for log level
   */
  private getLevelEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '🐛';
      case LogLevel.INFO:
        return 'ℹ️';
      case LogLevel.WARN:
        return '⚠️';
      case LogLevel.ERROR:
        return '❌';
      case LogLevel.FATAL:
        return '💀';
      default:
        return '📝';
    }
  }

  /**
   * Send logs to remote endpoint
   */
  private async sendToRemote(entry: LogEntry): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return;

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Avoid infinite loop by not logging this error
      console.error('Failed to send log to remote:', error);
    }
  }

  /**
   * Core logging method
   */
  private log(level: LogLevel, message: string, data?: any, error?: Error): void {
    // Check if log level meets minimum threshold
    if (level < this.config.minLogLevel) return;

    const entry = this.createLogEntry(level, message, data, error);
    
    this.addToBuffer(entry);
    this.logToConsole(entry);
    
    // Send to remote endpoint (fire and forget)
    this.sendToRemote(entry).catch(() => {});
  }

  /**
   * Debug level logging
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Info level logging
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Warning level logging
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Error level logging
   */
  error(message: string, error?: Error | any, data?: any): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.log(LogLevel.ERROR, message, data, errorObj);
  }

  /**
   * Fatal level logging
   */
  fatal(message: string, error?: Error | any, data?: any): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.log(LogLevel.FATAL, message, data, errorObj);
  }

  /**
   * Log function performance
   */
  time(label: string): void {
    console.time(label);
    this.debug(`Timer started: ${label}`);
  }

  /**
   * End function performance logging
   */
  timeEnd(label: string): void {
    console.timeEnd(label);
    this.debug(`Timer ended: ${label}`);
  }

  /**
   * Log API calls
   */
  apiCall(method: string, url: string, data?: any): void {
    this.info(`API Call: ${method.toUpperCase()} ${url}`, { requestData: data });
  }

  /**
   * Log API responses
   */
  apiResponse(method: string, url: string, status: number, data?: any): void {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    this.log(level, `API Response: ${method.toUpperCase()} ${url} - ${status}`, {
      status,
      responseData: data,
    });
  }

  /**
   * Log navigation events
   */
  navigation(screen: string, params?: any): void {
    this.info(`Navigation: ${screen}`, { params });
  }

  /**
   * Log user actions
   */
  userAction(action: string, data?: any): void {
    this.info(`User Action: ${action}`, data);
  }

  /**
   * Log authentication events
   */
  auth(event: string, userId?: string, data?: any): void {
    this.info(`Auth: ${event}`, { userId, ...data });
  }

  /**
   * Get all logs from buffer
   */
  getLogs(): LogEntry[] {
    return [...this.logBuffer];
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logBuffer.filter(entry => entry.level === level);
  }

  /**
   * Clear log buffer
   */
  clearLogs(): void {
    this.logBuffer = [];
    this.info('Log buffer cleared');
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.info('Logger configuration updated', { config: this.config });
  }

  /**
   * Set user ID for all future logs
   */
  setUserId(userId: string): void {
    this.config.userId = userId;
    this.info('User ID set for logging', { userId });
  }

  /**
   * Export logs as JSON string
   */
  exportLogs(): string {
    return JSON.stringify(this.logBuffer, null, 2);
  }

  /**
   * Get logger statistics
   */
  getStats(): {
    totalLogs: number;
    logsByLevel: Record<string, number>;
    sessionId: string;
    oldestLog?: string;
    newestLog?: string;
  } {
    const logsByLevel: Record<string, number> = {};
    
    this.logBuffer.forEach(entry => {
      logsByLevel[entry.levelName] = (logsByLevel[entry.levelName] || 0) + 1;
    });

    return {
      totalLogs: this.logBuffer.length,
      logsByLevel,
      sessionId: this.sessionId,
      oldestLog: this.logBuffer[0]?.timestamp,
      newestLog: this.logBuffer[this.logBuffer.length - 1]?.timestamp,
    };
  }
}

// Create and export singleton instance
export const logger = new Logger({
  enableConsole: true,
  enableRemote: false, // Set to true when you have a remote logging endpoint
  minLogLevel: __DEV__ ? LogLevel.DEBUG : LogLevel.INFO,
  maxLogEntries: 1000,
});

// Export types and classes for advanced usage
export { Logger };
export default logger; 