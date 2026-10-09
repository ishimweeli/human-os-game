import { defineConfig } from 'vite';
import os from 'node:os';

// Find this machine's Wi-Fi/LAN IPv4 so the QR code works on phones during local hosting
// (a "localhost" QR code only opens on the host computer). Home-network ranges are preferred
// over virtual adapters such as WSL, Hyper-V, or VirtualBox.
function lanIp() {
  const ips = Object.values(os.networkInterfaces()).flat()
    .filter(n => n && n.family === 'IPv4' && !n.internal).map(n => n.address);
  const rank = ip => ip.startsWith('192.168.') ? 0 : ip.startsWith('10.') ? 1 : /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ? 2 : 3;
  return ips.sort((a, b) => rank(a) - rank(b))[0] || '';
}

export default defineConfig({
  define: { __LAN_IP__: JSON.stringify(lanIp()) },
});
