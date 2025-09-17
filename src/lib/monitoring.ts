import * as Sentry from "@sentry/react";

// Initialize Sentry for error tracking
export const initializeMonitoring = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "",
    environment: import.meta.env.MODE || "development",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};

// Custom error boundary component
export const ErrorBoundary = Sentry.withErrorBoundary;

// Performance monitoring utilities
export const startTransaction = (name: string, operation: string) => {
  return Sentry.startSpan({ name, op: operation }, (span) => span);
};

export const captureException = (error: Error, context?: any) => {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext("additional_info", context);
    }
    Sentry.captureException(error);
  });
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = "info") => {
  Sentry.captureMessage(message, level);
};

// Custom metrics for business logic
export const trackUserAction = (action: string, properties?: any) => {
  Sentry.addBreadcrumb({
    message: `User action: ${action}`,
    category: "user",
    data: properties,
    level: "info",
  });
};

export const trackPerformance = (metricName: string, value: number, unit: string = "ms") => {
  // Send custom metrics to Sentry
  Sentry.setMeasurement(metricName, value, unit);
};

// Web3 specific monitoring
export const trackWeb3Transaction = (hash: string, type: string, status: "pending" | "success" | "failed") => {
  Sentry.addBreadcrumb({
    message: `Web3 transaction ${status}`,
    category: "web3",
    data: {
      hash,
      type,
      status,
      timestamp: Date.now(),
    },
    level: status === "failed" ? "error" : "info",
  });
};

// Network performance monitoring
export const monitorNetworkRequest = async <T>(
  requestName: string,
  requestFn: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  
  return await Sentry.startSpan(
    { name: requestName, op: "http" },
    async () => {
      try {
        const result = await requestFn();
        const duration = performance.now() - startTime;
        trackPerformance(`${requestName}_duration`, duration);
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        trackPerformance(`${requestName}_duration`, duration);
        captureException(error as Error, { requestName, duration });
        throw error;
      }
    }
  );
};

// Resource monitoring
export const monitorResourceUsage = () => {
  if ('memory' in performance) {
    const memInfo = (performance as any).memory;
    trackPerformance("memory_used", memInfo.usedJSHeapSize, "bytes");
    trackPerformance("memory_total", memInfo.totalJSHeapSize, "bytes");
    trackPerformance("memory_limit", memInfo.jsHeapSizeLimit, "bytes");
  }
  
  // Monitor connection quality
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    Sentry.setTag("connection_type", connection.effectiveType);
    Sentry.setTag("connection_downlink", connection.downlink);
  }
};

// Initialize performance monitoring interval
export const startPerformanceMonitoring = () => {
  // Monitor every 30 seconds
  setInterval(() => {
    monitorResourceUsage();
  }, 30000);
  
  // Monitor page visibility changes
  document.addEventListener('visibilitychange', () => {
    trackUserAction('page_visibility_change', {
      hidden: document.hidden,
      timestamp: Date.now(),
    });
  });
};