import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Clients() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      image: "/assets/images/Photos_1.jpeg",
      text: "We sincerely thank Somtel Somalia for providing reliable internet services that support our daily TV and radio work. Their service has made it easier for Shabelle TV to broadcast live and connect with our global audience seamlessly.",
      name: "Abukar Mohamed Mohamud",
      position: "General Manager of Shabelle Group"
    },
    {
      id: 2,
      image: "/assets/images/Photos_2.jpeg",
      text: "We sincerely appreciate Somtel Somalia for its reliable telecommunications services that play a vital role in our daily operations. Their internet services have enhanced our efficiency, strengthened nationwide interconnectivity, and the eDahab service has simplified our financial transactions.",
      name: "Abbas Ali Ahmed",
      position: "CEO – Signjet Printing Company"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      <div className="testimonial_area">
        <div className="container">
          <div className="row nagative_margin2">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
              <div className="row">
                <div className="testimonial_carousel_wrapper">
                  <div className="testimonial_carousel">
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={testimonial.id}
                        className={`testimonial_slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                          display: index === currentSlide ? 'block' : 'none',
                          opacity: index === currentSlide ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out'
                        }}
                      >
                        <div className="col-lg-12">
                          <div className="single_testimonial_two mt-3 mb-5">
                            <div className="single_testimonial_content_two">
                              <div className="single_testimonial_thumb_two mb-4">
                                <Image 
                                  src={testimonial.image} 
                                  alt={testimonial.name} 
                                  width={100} 
                                  height={100}
                                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="single_testimonial_content_text_two mb-4">
                                <p>{testimonial.text}</p>
                              </div>
                              <div className="single_testimonial_content_title_two mt-4">
                                <h4>{testimonial.name}</h4>
                                <span>{testimonial.position}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation dots */}
                  <div className="carousel_dots" style={{ textAlign: 'center', marginTop: '30px' }}>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: index === currentSlide ? '#1f2f5e' : '#ccc',
                          margin: '0 8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease'
                        }}
                      />
                    ))}
                  </div>

                  {/* Navigation arrows */}
                  <div className="carousel_arrows" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        margin: '0 15px',
                        color: '#1f2f5e'
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        margin: '0 15px',
                        color: '#1f2f5e'
                      }}
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial_slide {
          transition: opacity 0.5s ease-in-out;
        }
        
        .testimonial_carousel_wrapper {
          position: relative;
          width: 100%;
        }
        
        .carousel_dots .dot.active {
          background-color: #1f2f5e !important;
          transform: scale(1.2);
        }
        
        .carousel_arrows button:hover {
          color: #fed900 !important;
        }
      `}</style>
    </>
  );
}