"use client";

import BluetoothDeviceCard from "./BluetoothDeviceCard";

interface BluetoothDevice {
  name?: string;
  id?: string;
  uuids?: string[];
}

export default function BluetoothList(
  { devices }: { devices: BluetoothDevice[] }
) {
  return (
    <div className="space-y-3">
      {devices.map((d) => (
        <BluetoothDeviceCard key={d.id || d.name} device={d} />
      ))}
    </div>
  );
}
