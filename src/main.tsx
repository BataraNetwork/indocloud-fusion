import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeMonitoring, startPerformanceMonitoring } from "./lib/monitoring";

// Initialize error tracking and monitoring
initializeMonitoring();
startPerformanceMonitoring();

createRoot(document.getElementById("root")!).render(<App />);
