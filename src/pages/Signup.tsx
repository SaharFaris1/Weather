import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';


const apiUrl = 'https://weatherapp-6wx0.onrender.com/api/auth/signup'; 

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const btnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    if (password.length < 8) {
      Swal.fire('Error', 'Password must be at least 8 characters', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
        role: 'user'
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      Swal.fire('Success', 'Registration successful!', 'success').then(() => {
        navigate('/signin'); 
      });
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.error || 'Failed to register. Please try again.';
      Swal.fire('Error', message, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <div className="text-center flex flex-col justify-center items-center mb-6">
          <h2 className="text-2xl font-bold mt-4">Register</h2>
        </div>

        <form onSubmit={btnSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-bold mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-bold bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

    
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;