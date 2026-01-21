"use client";

import { useState } from "react";

export default function TestAuthPage() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testSignup = async () => {
    setIsLoading(true);
    setResult('Testing signup...');
    
    try {
      console.log('Making direct fetch call...');
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: 'frontend@test.com',
          password: 'password123'
        })
      });

      console.log('Response received:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setResult(`SUCCESS: ${JSON.stringify(data)}`);
      } else {
        setResult(`ERROR: ${response.status} - ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setResult(`FETCH ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSignin = async () => {
    setIsLoading(true);
    setResult('Testing signin...');
    
    try {
      console.log('Making signin fetch call...');
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'frontend@test.com',
          password: 'password123',
          rememberMe: false
        })
      });

      console.log('Signin response received:', response.status);
      const data = await response.json();
      console.log('Signin response data:', data);

      if (response.ok) {
        setResult(`SIGNIN SUCCESS: ${JSON.stringify(data)}`);
      } else {
        setResult(`SIGNIN ERROR: ${response.status} - ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Signin fetch error:', error);
      setResult(`SIGNIN FETCH ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Auth Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={testSignup}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Signup API'}
          </button>
          
          <button
            onClick={testSignin}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Signin API'}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">Result:</h2>
            <pre className="text-sm whitespace-pre-wrap break-words">{result}</pre>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p>Check browser console (F12) for detailed logs</p>
          <p>Current time: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}