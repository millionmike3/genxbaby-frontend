"use client";

import { motion } from "framer-motion";

interface BluetoothScannerProps {
  onDeviceDetected: (device: any) => void;
}

// Minimal Web Bluetooth typing so TS stops complaining
interface WebBluetoothNavigator extends Navigator {
  bluetooth: {
    requestDevice(options: {
      acceptAllDevices?: boolean;
      filters?: Array<{
        name?: string;
        namePrefix?: string;
        services?: string[];
      }>;
    }): Promise<any>;
  };
}

export default function BluetoothScanner({ onDeviceDetected }: BluetoothScannerProps) {
  async function scan() {
    try {
      // Cast navigator so TypeScript knows bluetooth exists
      const nav = navigator as unknown as WebBluetoothNavigator;

      const device = await nav.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      onDeviceDetected(device);
    } catch (err) {
      console.error("Bluetooth scan failed:", err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl shadow-xl bg-white backdrop-blur-xl border border-gray-200"
    >
      <div className="text-sm text-gray-600">Bluetooth Scanner</div>

      <div className="mt-4 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40"
        />
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        Scanning nearby devices…
      </div>

      <button
        onClick={scan}
        className="mt-4 w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Start Scan
      </button>
    </motion.div>
  );
}
