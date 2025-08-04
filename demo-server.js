#!/usr/bin/env node

// Simple demonstration server for NGEAR Platform health check
const http = require('http');

const healthStatus = {
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
  version: '1.0.0',
  environment: 'development',
  services: {
    database: 'ok',
    redis: 'ok', 
    kafka: 'ok'
  }
};

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  const url = req.url;

  if (url === '/api/v1/health') {
    res.writeHead(200);
    res.end(JSON.stringify(healthStatus, null, 2));
  } else if (url === '/api/docs') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>NGEAR Platform API Documentation</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
            .endpoint { background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #10b981; }
            .method { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
            code { background: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 NGEAR Platform API Documentation</h1>
            <p>Welcome to the NGEAR Platform API - Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform</p>
            
            <div class="endpoint">
              <h3><span class="method">GET</span> /api/v1/health</h3>
              <p>Health check endpoint that returns the current status of the API Gateway and its dependencies.</p>
              <p><strong>Response:</strong></p>
              <pre><code>{
  "status": "ok",
  "timestamp": "2024-08-04T10:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "development",
  "services": {
    "database": "ok",
    "redis": "ok",
    "kafka": "ok"
  }
}</code></pre>
            </div>

            <div class="endpoint">
              <h3>🔧 Platform Features</h3>
              <ul>
                <li><strong>Multi-Tenant Architecture:</strong> Scalable multi-tenant system supporting 1000+ clients</li>
                <li><strong>Zero-Code Configuration:</strong> Visual rule builders and no-code setup</li>
                <li><strong>Real-Time Processing:</strong> Event-driven architecture with Kafka</li>
                <li><strong>Smart Wallet System:</strong> Multi-currency wallets with fraud detection</li>
                <li><strong>Advanced Analytics:</strong> Real-time dashboards and predictive insights</li>
                <li><strong>API Integration Engine:</strong> No-code API configuration and data mapping</li>
              </ul>
            </div>

            <div class="endpoint">
              <h3>🏗️ Architecture Components</h3>
              <ul>
                <li><strong>API Gateway:</strong> Centralized routing and authentication</li>
                <li><strong>Microservices:</strong> Auth, Tenant, User, Wallet, Notification services</li>
                <li><strong>Database:</strong> PostgreSQL with multi-tenant isolation</li>
                <li><strong>Caching:</strong> Redis for high-performance data access</li>
                <li><strong>Message Queue:</strong> Apache Kafka for event processing</li>
                <li><strong>Frontend:</strong> Next.js with responsive design</li>
              </ul>
            </div>

            <p style="text-align: center; margin-top: 40px; color: #6b7280;">
              <strong>NGEAR Platform</strong> - Enterprise-grade loyalty and engagement solution
            </p>
          </div>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found', message: 'Endpoint not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 NGEAR Platform API Gateway is running on: http://localhost:${PORT}`);
  console.log(`📖 API Documentation available at: http://localhost:${PORT}/api/docs`);
  console.log(`❤️  Health check available at: http://localhost:${PORT}/api/v1/health`);
});