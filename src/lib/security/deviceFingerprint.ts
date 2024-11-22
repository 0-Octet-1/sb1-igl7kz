export async function generateDeviceFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.width,
    screen.height,
    screen.colorDepth,
    navigator.hardwareConcurrency,
    navigator.deviceMemory,
    navigator.platform
  ];

  // Créer une empreinte unique
  const fingerprint = components.join('|');
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fingerprint));
  
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}