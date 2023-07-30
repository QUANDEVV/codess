import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [charities, setCharities] = useState([]);

   
   const [charityApplications, setCharityApplications] = useState([
    {
      id: 1,
      name: 'Charity A',
      description: 'Application details for Charity A...',
    },
    {
      id: 2,
      name: 'Charity B',
      description: 'Application details for Charity B...',
    },
  
  ]);

  
  const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);

  
  const handleApprove = () => {
   
    setCharityApplications((prevApplications) =>
      prevApplications.filter((_, index) => index !== currentApplicationIndex)
    );
  };

  
  const handleReject = () => {
    
    setCharityApplications((prevApplications) =>
      prevApplications.filter((_, index) => index !== currentApplicationIndex)
    );
  };

  
  const handleNextApplication = () => {
    
    if (currentApplicationIndex < charityApplications.length - 1) {
      setCurrentApplicationIndex((prevIndex) => prevIndex + 1);
    } else {
     
      setShowModal(false);
    }
  };

 




  useEffect(() => {
    fetch('http://localhost:5000/charities')
      .then((response) => response.json())
      .then((data) => setCharities(data))
      .catch((error) => console.error('Error fetching charities:', error));
  }, []);


  const handleDeleteCharity = (charityId) => {
    fetch(`http://localhost:5000/charities/${charityId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state to remove the deleted charity from the list
        setCharities((prevCharities) =>
          prevCharities.filter((charity) => charity.id !== charityId)
        );
      })
      .catch((error) => console.error('Error deleting charity:', error));
  };


  return (
    <div>
    <div className="flex md:flex-row flex-col-reverse justify-end mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4 text-white">
        {/* Use Link component to navigate to the login page */}
        <div to="/login" className="font-epilogue cursor-pointer mt-3 bg-white text-black py-2 px-4 rounded-[10px]" onClick={() => setShowModal(true)}>
          Approve
        </div>
        <Link to="/login" className="font-epilogue cursor-pointer mt-3 bg-white text-black py-2 px-4 rounded-[10px]">
          Logout
        </Link>
      </div>
    </div>

    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 font-epilogue">
          <div className="bg-white p-4 rounded-lg">
            {/* Modal content */}
            <h2 className="text-xl font-epilogue font-semibold mb-2">Review All Charity Application</h2>
            {charityApplications.length > 0 ? (
              <>
                <p className="mb-4 font-epilogue">
                  Application for: {charityApplications[currentApplicationIndex].name}
                </p>
                <p className='font-epilogue '>{charityApplications[currentApplicationIndex].description}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleApprove}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
                <button
                  onClick={handleNextApplication}
                  className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-lg"
                >
                  Next Application
                </button>
              </>
            ) : (
              <p>No charity applications to review.</p>
            )}
          </div>
        </div>
      )}

    <h1 className='font-epilogue font-semibold text-[28px] text-white text-left mt-6'>Admin page</h1>
    <ul className="mt-8">
        {charities.map((charity) => (
          <li key={charity.id} className="text-white font-epilogue font-semibold flex items-center space-x-4">
            <img
              src={charity.logo}
              alt={charity.name}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span>{charity.name}</span>
            <button
              onClick={() => handleDeleteCharity(charity.id)}
              className="ml-2 bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

   
  );
};

export default Admin;
