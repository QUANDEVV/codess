import React, { useState } from 'react';

import { charity } from '../assets';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/allData');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Extract usernames and passwords for each user type
      const donorUsernames = data.donors.map((donor) => donor.username);
      const donorPasswords = data.donors.map((donor) => donor.password);
  
      const charityUsernames = data.charities.map((charity) => charity.username);
      const charityPasswords = data.charities.map((charity) => charity.password);
  
      const adminUsernames = data.admins.map((admin) => admin.username);
      const adminPasswords = data.admins.map((admin) => admin.password);
  
      // Perform your authentication check here for each user type
      if (donorUsernames.includes(username) && donorPasswords.includes(password)) {
        window.location.href = '/Home'; // Redirect donors to their dashboard
      } else if (charityUsernames.includes(username) && charityPasswords.includes(password)) {
        window.location.href = '/CharityPage'; // Redirect charities to their dashboard
      } else if (adminUsernames.includes(username) && adminPasswords.includes(password)) {
        window.location.href = '/admin'; // Redirect admins to their dashboard
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching login details:', error);
    }
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginOptionClick = (userType) => {
    setSelectedUserType(userType);
  };

  const renderLoginForm = () => {
    switch (selectedUserType) {
      case 'donor':
        return (
          <form>
            {/* Donor Login Form */}
            <div className="mb-4">
              <label htmlFor="donor-username" className="block font-medium mb-1" >
                Donor Username:
              </label>
              <input
            type='text'
            placeholder='Username'
            className='bg-gray-600 text-white px-4 py-2 rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            </div>
            <div className="mb-4">
              <label htmlFor="donor-password" className="block font-medium mb-1">
                Donor Password:
              </label>
              <input
            type='password'
            placeholder='Password'
            className='bg-gray-600 text-white px-4 py-2 rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleLogin}>
              Login as Donor
            </button>
          </form>
        );
      case 'charity':
        return (
          <form>
            {/* Charity Login Form */}
            <div className="mb-4">
              <label htmlFor="charity-username" className="block font-medium mb-1">
                Charity Username:
              </label>
              <input
            type='text'
            placeholder='Username'
            className='bg-gray-600 text-white px-4 py-2 rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            </div>
            <div className="mb-4">
              <label htmlFor="charity-password" className="block font-medium mb-1">
                Charity Password:
              </label>
              <input
            type='password'
            placeholder='Password'
            className='bg-gray-600 text-white px-4 py-2 rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            </div>
            <button
            className='bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded'
            onClick={handleLogin}
          >
            Login
          </button>
          </form>
        );
      case 'admin':
        return (
          <form>
            {/* Admin Login Form */}
            <div className="mb-4">
              <label htmlFor="admin-username" className="block font-medium mb-1">
                Admin Username:
              </label>
              <input
            type='text'
            placeholder='Username'
            className='bg-gray-600 text-white px-4 py-2 rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            </div>
            <div className="mb-4">
              <label htmlFor="admin-password" className="block font-medium mb-1">
                Admin Password:
              </label>
              <input
            type='password'
            placeholder='Password'
            className='bg-gray-600 text-white px-4 py-2 rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleLogin}>
              Login as Admin
            </button>
          </form>
        );
      default:
        return null;
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="bg-blue-500 p-4 text-white flex justify-end">
        <div className="cursor-pointer" onClick={handleLoginClick}>
          Login
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            {/* Display login options */}
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <div className="grid gap-4 grid-cols-3">
              <div
                className="cursor-pointer text-center border border-blue-500 p-2 rounded"
                onClick={() => handleLoginOptionClick('donor')}
              >
                Donor
              </div>
              <div
                className="cursor-pointer text-center border border-blue-500 p-2 rounded"
                onClick={() => handleLoginOptionClick('charity')}
              >
                Charity
              </div>
              <div
                className="cursor-pointer text-center border border-blue-500 p-2 rounded"
                onClick={() => handleLoginOptionClick('admin')}
              >
                Admin
              </div>
            </div>

            {/* Render the appropriate login form based on the selected user type */}
            {renderLoginForm()}
            <button onClick={handleCloseModal} className="bg-red-500 text-white rounded px-4 py-2 mt-4">
              Close
            </button>
          </div>
        </div>
      )}


      <div className="flex flex-grow items-center justify-center px-8">
        <div className="flex flex-col items-center justify-center text-center w-1/2">
          <h1 className="text-6xl font-bold text-blue-500">Charity</h1>
          <p className="text-xl mt-4 text-white">Join us in making a difference.</p>
        </div>

        <div className="w-1/2">
          <img src={charity} alt="Charity" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>


  );
};

export default Login;