"use client";

interface BluetoothStatusProps {
  connected: boolean;
}

export default function BluetoothStatus(
  { connected }: BluetoothStatusProps
) {
  return (
    <div className="text-sm text-gray-500">
      Status: {connected ? "Connected" : "Not Connected"}
    </div>
  );
}
