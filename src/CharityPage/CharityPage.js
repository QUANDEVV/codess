import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CharityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [charityName, setCharityName] = useState('');
  const [charityDescription, setCharityDescription] = useState('');

  const handleSubmit = async () => {
    try {
      const data = {
        imageURL,
        name: charityName,
        description: charityDescription,
      };

      // Make a POST request to the server using fetch
      await fetch('http://localhost:4000/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Show the success alert
      alert('You have successfully applied for charity review. Please wait for approval');

      // Close the modal after successful submission
      setIsModalOpen(false);

      // Reset the form fields
      setImageURL('');
      setCharityName('');
      setCharityDescription('');
    } catch (error) {
      console.error('Error submitting charity application:', error);
    }
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col-reverse justify-end mb-35 gap-6 text-white">
        <div className="sm:flex hidden flex-row justify-end gap-4 text-white">
          <div
            onClick={() => setIsModalOpen(true)}
            className="font-epilogue cursor-pointer mt-3 bg-white text-black py-2 px-4 rounded-[10px]"
          >
            Apply
          </div>
          <Link
            to="/login"
            className="font-epilogue cursor-pointer mt-3 bg-white text-black py-2 px-4 rounded-[10px]"
          >
            Logout
          </Link>
        </div>
      </div>

      <h1 className="text-white font-epilogue font-bold">charity page</h1>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900">
          <div className="modal bg-white p-6 rounded-lg shadow-xl">
            <span
              className="close absolute top-0 right-0 mt-3 mr-3 text-gray-700 text-2xl cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4 font-epilogue">Charity Review</h2>
            <div className="mb-4">
              <label htmlFor="imageURL" className="font-epilogue">
                Image URL:
              </label>
              <input
                type="text"
                id="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="ml-2 border border-gray-400 p-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="charityName" className="font-epilogue">
                Name of Charity:
              </label>
              <input
                type="text"
                id="charityName"
                value={charityName}
                onChange={(e) => setCharityName(e.target.value)}
                className="ml-2 border border-gray-400 p-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="charityDescription" className="font-epilogue">
                Description of Charity:
              </label>
              <textarea
                id="charityDescription"
                value={charityDescription}
                onChange={(e) => setCharityDescription(e.target.value)}
                className="ml-2 border border-gray-400 p-1 rounded"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="font-epilogue bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityPage;
