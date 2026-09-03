// services/bluetooth-engine.ts
import "server-only";

// -------------------------------------------------------------
// TYPES
// -------------------------------------------------------------
export interface BluetoothEvent {
  id: string;
  deviceId: string;
  name: string | null;
  rssi: number | null;
  timestamp: number;
}

export interface BluetoothAlert {
  id: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
  deviceId?: string;
  timestamp: number;
}

export interface BluetoothHeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
}

export interface BluetoothDeviceLog {
  id: string;
  deviceId: string;
  action: string;
  timestamp: number;
}

// -------------------------------------------------------------
// IN‑MEMORY STORE
// -------------------------------------------------------------
const events: BluetoothEvent[] = [];
const alerts: BluetoothAlert[] = [];
const heatmap: BluetoothHeatmapPoint[] = [];
const logs: BluetoothDeviceLog[] = [];

// -------------------------------------------------------------
// EVENT INGESTION
// -------------------------------------------------------------
export function recordBluetoothEvent(event: BluetoothEvent) {
  events.push(event);

  // Auto‑generate alerts
  if (event.rssi !== null && event.rssi < -85) {
    alerts.push({
      id: `alert-${Date.now()}`,
      severity: "HIGH",
      message: `Weak signal detected from ${event.deviceId}`,
      deviceId: event.deviceId,
      timestamp: Date.now(),
    });
  }

  // Auto‑generate heatmap point
  heatmap.push({
    x: Math.random() * 100,
    y: Math.random() * 100,
    intensity: event.rssi ? Math.max(0, 100 + event.rssi) : 20,
    timestamp: Date.now(),
  });

  // Auto‑generate device log
  logs.push({
    id: `log-${Date.now()}`,
    deviceId: event.deviceId,
    action: "EVENT_RECORDED",
    timestamp: Date.now(),
  });
}

// -------------------------------------------------------------
// GETTERS (THE IMPORTANT PART)
// -------------------------------------------------------------
export function getBluetoothEvents(): BluetoothEvent[] {
  return events.slice(-200);
}

export function getBluetoothAlerts(): BluetoothAlert[] {
  return alerts.slice(-100);
}

export function getBluetoothHeatmap(): BluetoothHeatmapPoint[] {
  return heatmap.slice(-500);
}

export function getBluetoothLogs(): BluetoothDeviceLog[] {
  return logs.slice(-300);
}

// -------------------------------------------------------------
// UTILITIES
// -------------------------------------------------------------
export function clearBluetoothData() {
  events.length = 0;
  alerts.length = 0;
  heatmap.length = 0;
  logs.length = 0;
}

export function simulateBluetoothEvent(deviceId: string) {
  const event: BluetoothEvent = {
    id: `evt-${Date.now()}`,
    deviceId,
    name: `Device-${deviceId.slice(-4)}`,
    rssi: -40 - Math.floor(Math.random() * 60),
    timestamp: Date.now(),
  };

  recordBluetoothEvent(event);
  return event;
}
