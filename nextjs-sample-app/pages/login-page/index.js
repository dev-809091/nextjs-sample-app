import { useState } from 'react';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Handle successful login (e.g., redirect to dashboard, set cookies/token)
        alert('Login successful! Welcome, ' + data.user.name);
      } else {
        // Handle login failure
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Student Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="main">
        <div className="card">
          <h1 className="title">Student Portal</h1>
          <p className="description">Welcome back! Please login to your account.</p>

          <form onSubmit={handleSubmit} className="form">
            <div className="inputGroup">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={isLoading} className="loginButton">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="footer">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
        }

        .main {
          width: 100%;
          max-width: 400px;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .title {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #333;
          text-align: center;
        }

        .description {
          text-align: center;
          color: #666;
          margin-top: 10px;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .inputGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-size: 14px;
          font-weight: 500;
          color: #444;
        }

        input {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
        }

        .error {
          color: #e53e3e;
          font-size: 14px;
          margin: 0;
          text-align: center;
        }

        .loginButton {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          margin-top: 10px;
        }

        .loginButton:hover {
          background-color: #0051a8;
        }

        .loginButton:active {
          transform: scale(0.98);
        }

        .loginButton:disabled {
          background-color: #a0c3ff;
          cursor: not-allowed;
        }

        .footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
        }

        .footer a {
          color: #0070f3;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
