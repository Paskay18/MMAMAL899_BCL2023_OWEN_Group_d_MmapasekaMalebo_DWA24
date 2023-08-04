import React, { useState, useEffect } from 'react';

const RandomImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.map((item) => item.image);
        setImages(imageUrls);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="randomImageCarousel" className="carousel slide" data-bs-ride="carousel" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img
              src={image}
              className="d-block w-100 h-100"
              alt={`Slide ${index}`}
              style={{ objectFit: 'cover', maxHeight: '300px' }}
            />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#randomImageCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#randomImageCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default RandomImageCarousel;

