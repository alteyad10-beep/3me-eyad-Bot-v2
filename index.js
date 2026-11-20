const bedrock = require('bedrock-protocol');
const http = require('http');

// سيرفر HTTP بسيط لإبقاء خدمة Railway نشطة
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bedrock AFK Bot is running!');
}).listen(port, () => {
  console.log(`[Server] HTTP server started on port ${port}`);
});

const CONFIG = {
  host: 'testbot-40hC.aternos.me',
  port: 19132,
  username: '3me_eyad',
  offline: true,
  // ملاحظة: إذا كان السيرفر يتطلب رقم إصدار محدد، أضفه هنا مثل: version: '26.66.1'
  connectTimeout: 15000
};

function startBot() {
  console.log(`[Bot] Connecting to ${CONFIG.host}:${CONFIG.port}...`);

  const client = bedrock.createClient(CONFIG);

  client.on('spawn', () => {
    console.log('[Bot] Spawned successfully inside the server!');
  });

  client.on('kick', (reason) => {
    console.log('[Bot] Kicked from server:', reason);
  });

  client.on('error', (err) => {
    console.log('[Bot] Error:', err.message);
  });

  client.on('close', () => {
    console.log('[Bot] Disconnected. Reconnecting in 5 seconds...');
    setTimeout(startBot, 5000);
  });
}

startBot();
