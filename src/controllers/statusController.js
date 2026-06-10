export const getStatus = (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>RoboQuote Pro Backend</title>

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">

      <style>
        :root {
          --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          --accent-blue: #38bdf8;
          --accent-purple: #818cf8;
          --text-primary: #f8fafc;
          --text-secondary: #94a3b8;
          --card-bg: rgba(30, 41, 59, 0.4);
          --card-border: rgba(255, 255, 255, 0.08);
          --active-green: #10b981;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family: 'Outfit', 'Space Grotesk', sans-serif;
          background: var(--bg-gradient);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
          padding: 20px;
        }

        .glow-sphere {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 1;
          opacity: 0.15;
          pointer-events: none;
        }

        .glow-1 {
          width: 300px;
          height: 300px;
          background: var(--accent-blue);
          top: 15%;
          left: 20%;
        }

        .glow-2 {
          width: 400px;
          height: 400px;
          background: var(--accent-purple);
          bottom: 15%;
          right: 15%;
        }

        .container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
        }

        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: float 6s ease-in-out infinite;
        }

        .logo-container {
          margin-bottom: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(
            135deg,
            var(--accent-blue) 0%,
            var(--accent-purple) 100%
          );
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.3);
        }

        h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          background: linear-gradient(to right, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: var(--active-green);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: var(--active-green);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulse 2s infinite;
        }

        .description {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: rgba(148, 163, 184, 0.5);
        }

        .footer p {
          margin: 0;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }

          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 30px 22px;
            border-radius: 20px;
          }

          h1 {
            font-size: 24px;
          }

          .description {
            font-size: 14px;
          }

          .footer {
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
        }
      </style>
    </head>

    <body>
      <div class="glow-sphere glow-1"></div>
      <div class="glow-sphere glow-2"></div>

      <main class="container">
        <section class="card">
          <div class="logo-container">
            <div class="logo-icon">R</div>
          </div>

          <h1>RoboQuote Pro</h1>

          <div class="status-badge">
            <span class="pulse-dot"></span>
            SERVICE ACTIVE
          </div>

          <p class="description">
            The RoboQuote Pro backend API is running successfully.
            All systems are operational and ready to process requests.
          </p>

          <div class="footer">
            <span>v1.0.0</span>
            <p>RoboQuote Pro Server is running</p>
          </div>
        </section>
      </main>
    </body>
    </html>
  `);
};

export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    service: "RoboQuote Pro Backend",
    status: "active",
    version: "1.0.0",
  });
};