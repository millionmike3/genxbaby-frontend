export function normalizeInput(data: {
  deviceCount?: number;
  bluetoothDensity?: number;
}) {
  return {
    deviceCount: Number(data.deviceCount ?? 0),
    bluetoothDensity: Number(data.bluetoothDensity ?? 0),
  };
}
