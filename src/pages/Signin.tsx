import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';



const apiUrl = 'https://weather-api-zk64.onrender.com/auth/signin'; 

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        email,
        password
      });

  
      localStorage.setItem('token', response.data.token);

      Swal.fire('Success', 'Login successful!', 'success').then(() => {
        navigate('/weather'); 
      });
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.error || 'Invalid credentials';
      Swal.fire('Error', message, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-bold bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

         
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;