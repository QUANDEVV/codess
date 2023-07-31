import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CharityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charityData, setCharityData] = useState({
    imageSource: 'url', // 'url' or 'pc'
    imageUrl: '', // If 'url' is selected, store the URL here
    imageFile: null, // If 'pc' is selected, store the image file here
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharityData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSourceChange = (e) => {
    const { value } = e.target;
    setCharityData((prevData) => ({
      ...prevData,
      imageSource: value,
      imageUrl: '', // Reset the URL when the option changes
      imageFile: null, // Reset the file when the option changes
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setCharityData((prevData) => ({ ...prevData, imageFile: file }));
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    alert('You have successfully applied for charity review. Please wait for approval.');
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

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center modal-overlay">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <span
              className="absolute top-4 right-4 text-gray-500 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <div className="modal-content">
              <h2 className="text-lg font-bold mb-4 font-epilogue ">Apply for Charity Review</h2>
              <label className="block font-epilogue">
                Image Source:
                <div className="flex items-center mt-4">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="imageSource"
                      value="url"
                      checked={charityData.imageSource === 'url'}
                      onChange={handleImageSourceChange}
                      className="mr-2"
                    />
                    URL
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="imageSource"
                      value="pc"
                      checked={charityData.imageSource === 'pc'}
                      onChange={handleImageSourceChange}
                      className="mr-2 font-epilogue"
                    />
                    Upload from PC
                  </label>
                </div>
              </label>
              {charityData.imageSource === 'url' ? (
                <label className="block font-epilogue mt-4">
                  Image (Logo) URL:
                  <input
                    type="text"
                    name="imageUrl"
                    value={charityData.imageUrl}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 w-full mt-1"
                  />
                </label>
              ) : (
                <label className="block text-black font-epilogue mt-4">
                  Upload Image 
                  <input
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    onChange={handleFileInputChange}
                    className="mt-1"
                  />
                </label>
              )}
              <label className="block font-epilogue mt-4">
                Name of Charity:
                <input
                  type="text"
                  name="name"
                  value={charityData.name}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 w-full mt-1"
                />
              </label>
              <label className="block font-epilogue mt-4 ">
                Description of Charity:
                <textarea
                  name="description"
                  value={charityData.description}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 w-full mt-1"
                />
              </label>
              <button
                onClick={handleSubmit}
                className="  px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 font-epilogue bg-[#00df9a] hover:bg-green-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityPage;
