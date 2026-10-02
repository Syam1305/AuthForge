import { createApp } from 'C:/Users/nsyam/OneDrive/Desktop/AuthForge/src/app.js';
import http from 'http';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures: string[] = [];

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    const msg = `✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`;
    console.error(`  ${msg}`);
    failures.push(msg);
  }
}

async function runCorsTests() {
  console.log('\n==================================================');
  console.log('AuthForge CORS & Flutter Web Integration Tests');
  console.log('==================================================\n');

  const app = createApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const address = server.address() as { port: number; address: string };
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    // 1. Flutter Web current debug port (http://localhost:61661) preflight
    {
      const res = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'http://localhost:61661',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type, Authorization',
        },
      });

      const allowOrigin = res.headers.get('access-control-allow-origin');
      const allowMethods = res.headers.get('access-control-allow-methods');
      const allowHeaders = res.headers.get('access-control-allow-headers');
      const allowCredentials = res.headers.get('access-control-allow-credentials');

      assert(
        res.status === 204 || res.status === 200,
        '1. Flutter Web (localhost:61661) OPTIONS preflight returns 200/204',
        `Status was ${res.status}`
      );
      assert(
        allowOrigin === 'http://localhost:61661',
        '2. Access-Control-Allow-Origin matches Flutter Web origin',
        `Header was: ${allowOrigin}`
      );
      assert(
        allowCredentials === 'true',
        '3. Access-Control-Allow-Credentials is true',
        `Header was: ${allowCredentials}`
      );
      assert(
        allowMethods !== null && allowMethods.includes('POST'),
        '4. Access-Control-Allow-Methods contains POST',
        `Header was: ${allowMethods}`
      );
    }

    // 2. Dynamic localhost port (http://localhost:52345)
    {
      const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'http://localhost:52345',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      const allowOrigin = res.headers.get('access-control-allow-origin');
      assert(
        (res.status === 204 || res.status === 200) && allowOrigin === 'http://localhost:52345',
        '5. Dynamic Flutter Web localhost port (52345) accepted in dev mode',
        `Status: ${res.status}, Origin header: ${allowOrigin}`
      );
    }

    // 3. 127.0.0.1 development origin (http://127.0.0.1:8080)
    {
      const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'http://127.0.0.1:8080',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      const allowOrigin = res.headers.get('access-control-allow-origin');
      assert(
        (res.status === 204 || res.status === 200) && allowOrigin === 'http://127.0.0.1:8080',
        '6. 127.0.0.1 dev origin accepted in dev mode',
        `Status: ${res.status}, Origin header: ${allowOrigin}`
      );
    }

    // 4. Existing configured origin (http://localhost:3000)
    {
      const res = await fetch(`${baseUrl}/api/v1/auth/me`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'http://localhost:3000',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Authorization',
        },
      });

      const allowOrigin = res.headers.get('access-control-allow-origin');
      assert(
        (res.status === 204 || res.status === 200) && allowOrigin === 'http://localhost:3000',
        '7. Existing configured DairyKhata backend origin (localhost:3000) accepted',
        `Status: ${res.status}, Origin header: ${allowOrigin}`
      );
    }

    // 5. Disallowed malicious origin (https://evil-hacker.com)
    {
      const res = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://evil-hacker.com',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      const body = await res.json().catch(() => ({}));
      const allowOrigin = res.headers.get('access-control-allow-origin');

      assert(
        res.status === 500 && allowOrigin === null,
        '8. Malicious origin (evil-hacker.com) is rejected with 500 and no allow-origin header',
        `Status: ${res.status}, Origin header: ${allowOrigin}`
      );
      assert(
        (body as any)?.error?.message?.includes('not allowed by CORS policy'),
        '9. Rejection error message explicitly identifies CORS policy rejection',
        `Body: ${JSON.stringify(body)}`
      );
    }

    // 6. Non-browser request with no origin (curl, mobile native)
    {
      const res = await fetch(`${baseUrl}/health`);
      const body = await res.json().catch(() => ({}));

      assert(
        res.status === 200 && (body as any)?.status === 'healthy',
        '10. Requests without Origin header (mobile / server-to-server) pass directly',
        `Status: ${res.status}, Body: ${JSON.stringify(body)}`
      );
    }

  } finally {
    server.close();
  }

  console.log('\n--------------------------------------------------');
  console.log(`CORS Test Summary: ${passedTests}/${totalTests} passed, ${failedTests} failed.`);
  console.log('--------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runCorsTests();
