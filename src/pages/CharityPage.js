import React, { useState, useEffect } from 'react';

function CharityPage() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    // Fetch the JSON data using the fetch function
    fetch('/dbb.json')
      .then((response) => response.json())
      .then((data) => setCharities(data.charities))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Charities</h1>
      {charities.map((charity) => (
        <div key={charity.name}>
          <h2>{charity.name}</h2>
          <img src={charity.logo} alt={`${charity.name} Logo`} />
          <p>Total Amount Donated: ${charity.total_amount_donated}</p>
          <h3>Testimonials:</h3>
          <ul>
            {charity.testimonials.map((testimonial, index) => (
              <li key={index}>
                <strong>{testimonial.author}</strong>: {testimonial.testimonial}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CharityPage;
