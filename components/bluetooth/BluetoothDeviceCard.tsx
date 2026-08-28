"use client";

interface BluetoothDevice {
  name?: string;
  id?: string;
  uuids?: string[];
}

export default function BluetoothDeviceCard(
  { device }: { device: BluetoothDevice }
) {
  return (
    <div className="gx-card p-4 rounded-xl">
      <div className="font-semibold">
        {device.name || "Unnamed Device"}
      </div>

      <div className="text-sm text-gray-400 mt-1">
        ID: {device.id || "N/A"}
      </div>

      {device.uuids && device.uuids.length > 0 && (
        <div className="text-xs text-gray-500 mt-2">
          Services: {device.uuids.join(", ")}
        </div>
      )}
    </div>
  );
}
