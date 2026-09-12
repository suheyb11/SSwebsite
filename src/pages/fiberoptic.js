import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight, FaCheckCircle, FaMobileAlt, FaEnvelopeOpenText } from 'react-icons/fa';
import $ from 'jquery';

// @ts-ignore: Owl Carousel expects global jQuery
if (typeof window !== 'undefined') {
  window.$ = $;
  window.jQuery = $;
  require('owl.carousel');
}
export default function Fiberoptic() {
   const pathname = usePathname();

  useEffect(() => {
    const initSlider = () => {
      const $slider = $('.team-list');

      if ($slider.length && !$slider.hasClass('owl-loaded')) {
        $slider.owlCarousel({
          items:4,
          nav: true,
          rewind: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplaySpeed: 2000,
          dots: true,
          loop: true,
        });
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      initSlider();
    }, 100); // Small delay ensures DOM is mounted

    return () => clearTimeout(timer);
  }, [pathname]);
  const params = {
    title: 'Fiber Optic',
    href: '/fiberoptic',
    menu: 'Corporate Services',
    name: 'Fiber Optic Services',
  };


  // CSS-only carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const teamItems = [
    {
      id: 1,
      icon: "assets/images/icon-2-2.png",
      title: "Fiber Services",
      description: "We offer a variety of fiber packages for instant global access."
    },
    {
      id: 2,
      icon: "assets/images/icon-2-1.png",
      title: "Wireless Services",
      description: "Enjoy fast, reliable connectivity with SOMTEL Fiber."
    },
    {
      id: 3,
      icon: "assets/images/icon-2-4.png",
      title: "IPTV SERVICE",
      description: "Choose a package for reliable connection and the entertainment you love"
    },
    {
      id: 4,
      icon: "assets/images/icon-2-3.png",
      title: "Enterprise Solution",
      description: "Get instant global access with our reliable, high-speed fiber packages for your enterprise."
    },
    {
      id: 5,
      icon: "assets/images/icon-2-1.png",
      title: "Wireless Services",
      description: "Enjoy fast, reliable connectivity with SOMTEL Fiber."
    }
  ];

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamItems.length / 3));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [teamItems.length]);

  const faqItems = [
    {
      question: 'How do I subscribe to Fiber Internet?',
      answer: 'You can subscribe via your eDahab following the instructions, or by visiting our nearest branch. Alternatively, dial *101# and select option 6 from the menu.',
    },
    {
      question: 'How long is the installation process for Fiber Internet?',
      answer: `Once you subscribe to a Somtel ADSL Plus package, installation will be completed within one working day depending on your home setup.
- After placing your order, you&apos;ll receive a service ticket number for tracking your request.
- On the first day, a Somtel technician will visit your home or office to assess the installation setup.
- The modem will be installed and the ADSL Plus connection fully activated on that first day.
- You will receive a confirmation SMS indicating that your service is live and ready to use.`,
    },
    {
      question: 'How fast are your fiber plans?',
      answer: 'We offer plans from 300 Mbps up to 2 Gbps symmetrical (same upload & download speeds).',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) loader.style.display = 'none';
  }, []);

  // Calculate visible items based on current slide
  const getVisibleItems = () => {
    const itemsPerSlide = 3;
    const startIndex = currentSlide * itemsPerSlide;
    return teamItems.slice(startIndex, startIndex + itemsPerSlide);
  };

  
    return (
        <>
     
            <Layout>
           
          {/* <Slider></Slider> */}
         
          <div className="breatcome_area d-flex align-items-center" id="fiber"
           style={{ backgroundImage: "url(/assets/images/slider/dageq.jpg)" }}>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breatcome_title">
          <div className="breatcome_title_inner pb-2">
            <h2 style={{ color: "#1f2f5e" }}>Fiber Optic Services</h2>
          </div>
          <div className="breatcome_content">
            <ul>
              <li>
                <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>{" "}
                {/* <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/> <a href="/Prepaid" style={{ color: "#1f2f5e" }}>Personal</a>{" "} */}
                <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/>{" "}
                <span style={{ color: "#1f2f5e" }}>Fiber</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
          <div className="service-section" style={{ background: "#ffff" }} >
             
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div
          className="section_title mb-55 white text_center"
          data-cue="slideInRight"
        >
          <div className="section_main_title">
            <h1  style={{ color: "#1f2f5e" }}>
              We can help . <span style={{ color: "#1f2f5e" }}>you succeed</span>
            </h1>
            <p style={{ color: "#1f2f5e" }}>Our services encompass the entire web development lifecycle, from conceptualization to implementation and beyond. Here&apos;s what we offer.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
    <div className="col-lg-3 col-md-6">
        <div className="service-single-box upper5" data-cue="zoomIn">
          <div className="service-icon1">
            <Image src="/assets/images/ser1.png" alt="High Quality Internet Services" width={50} height={50} />
          </div>
          <div className="service-content">
            <h2 style={{ color: "#1f2f5e" }}>High Quality Internet Services</h2>
            <p style={{ color: "#1f2f5e" }}>Connect in minutes with Bluecom fast speed Fiber. Get advanced speed, range, and reliability, backed by Bluecom&apos;s best Fiber network.</p>
          </div>
          <div className="service-button">
            <a href="about.html">
              <span style={{ color: "#1f2f5e" }}>About More</span> <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="service-single-box upper" data-cue="zoomIn">
          <div className="service-icon1">
            <Image src="/assets/images/search.png" alt="Most Reliable and Affordable" width={50} height={50} />
          </div>
          <div className="service-content">
            <h2 style={{ color: "#1f2f5e" }}>Most Reliable and Affordable</h2>
            <p style={{ color: "#1f2f5e" }}>We provide you a range of fiber packages to give you instant access to the world. Speed and reliability are guaranteed.</p>
          </div>
          <div className="service-button">
            <a href="about.html">
              <span style={{ color: "#1f2f5e" }}>About More</span> <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="service-single-box upper5" data-cue="zoomIn">
          <div className="service-icon1">
            <Image src="/assets/images/icon-2-4.png" alt="Great TV Shows" width={50} height={50} />
          </div>
          <div className="service-content">
            <h2 style={{ color: "#1f2f5e" }}>Want Great TV Shows</h2>
            <p style={{ color: "#1f2f5e" }}>Pick your package to get the entertainment you love with a connection you can count on. Our ready-to-go packages make it easy.</p>
          </div>
          <div className="service-button">
            <a href="about.html">
              <span style={{ color: "#1f2f5e" }}>About More</span> <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="service-single-box upper" data-cue="zoomIn">
          <div className="service-icon1">
            <Image src="/assets/images/icon1.png" alt="24/7 Support Service" width={50} height={50} />
          </div>
          <div className="service-content">
            <h2 style={{ color: "#1f2f5e" }}>24/7 Support Service</h2>
            <p style={{ color: "#1f2f5e" }}>We provide 24/7 support service and solutions for your home and business needs. you can reach out to us anytime.</p>
          </div>
          <div className="service-button">
            <a href="about.html">
              <span style={{ color: "#1f2f5e" }}>About More</span> <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="feature-area owl-nav3 style-two pt-85 pb-160"  >
  <div className="container">
    <div className="row feature-shape">
      <div className="col-lg-8">
        <div
          className="section_title style-two mb-30 pb-1 mt-3 wow fadeInDown"
          data-wow-delay=".4"
        >
          <div className="section_sub_title">
            <h5>Our Services</h5>
          </div>
          <div className="section_main_title pb-15">
            <h1>SOMTEL Fiber Service</h1>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="em-feature-button text-right mt-50">
          <a href="#">
            All Service <i className="bi bi-arrow-right" />
          </a>
        </div>
      </div>
      <div className="feature-shape1">
        <Image src="/assets/images/border-f.png" alt="Border decoration" width={200} height={50} />
      </div>
      <div className="feature-shape2 bounce-animate3" >
        <Image src="/assets/images/service-sp.png" alt="Service decoration" width={100} height={100}    />
      </div>
    </div>
    <div className=" row  ">
      <div className=" team-list owl-carousel">
        <div className=" col-lg-12">
          <div className="feature-extra-single-box">
            <div
              className="em-feature-single-box wow fadeInLeft"
              data-wow-delay=".5"
            >
              <div className="feature-single-box-inner" >
                <div className="feature-top-icon">
                  <Image src="/assets/images/icon-2-2.png" alt="Fiber Services" width={64}
      height={64}    />
                </div>
                <div className="em-feature-title">
                  <h2>Fiber Services</h2>
                  <p>
                  We offer a variety of fiber packages for instant global access. 
               
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="feature-extra-single-box">
            <div
              className="em-feature-single-box wow fadeInLeft"
              data-wow-delay=".5"
            >
              <div className="feature-single-box-inner2">
                <div className="feature-top-icon up">
                  <Image src="/assets/images/icon-2-1.png" alt="Wireless Services" width={64}
      height={64}   />
                </div>
                <div className="em-feature-title">
                  <h2>Wireless Services</h2>
                  <p>
                  Enjoy fast, reliable connectivity with SOMTEL Fiber.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="feature-extra-single-box">
            <div
              className="em-feature-single-box wow fadeInLeft"
              data-wow-delay=".5"
            >
              <div className="feature-single-box-inner">
                <div className="feature-top-icon">
                  <Image src="/assets/images/icon-2-4.png" alt="IPTV SERVICE" width={64}
      height={64}   />
                </div>
                <div className="em-feature-title">
                <h2>IPTV SERVICE</h2>
                  <p>
                  Choose a package for reliable connection and the entertainment you love
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="feature-extra-single-box">
            <div
              className="em-feature-single-box wow fadeInLeft"
              data-wow-delay=".5"
            >
              <div className="feature-single-box-inner2">
                <div className="feature-top-icon">
                  <Image src="/assets/images/icon-2-3.png" alt="Enterprise Solution" width={64}
      height={64}    />
                </div>
                <div className="em-feature-title">
                  <h2>Enterprise Solution</h2>
                  <p>
                  Get instant global access with our reliable, high-speed fiber packages for your enterprise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="feature-extra-single-box">
            <div
              className="em-feature-single-box wow fadeInLeft"
              data-wow-delay=".5"
            >
              <div className="feature-single-box-inner2">
                <div className="feature-top-icon up">
                  <Image src="/assets/images/icon-2-1.png" alt="Wireless Services"  width={64}
      height={64}    />
                </div>
                <div className="em-feature-title">
                  <h2>Wireless Services</h2>
                  <p>
                  Enjoy fast, reliable connectivity with SOMTEL Fiber.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="pricing_area pt-80 pb-70" id="pricing">
        <div className="container">
          <div className="row">
            {/* Start Section Tile */}
            <div className="col-lg-12">
              <div className="section_title text_center mb-50 mt-3">
                <div className="section_sub_title uppercase mb-3">
                  <h6>PRICING</h6>
                </div>
                <div className="section_main_title">
                  <h1>Check Our Valuable Price</h1>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12" >
              {/* Single Pricing */}
              <div className="single_pricing mb-4" style={{ background: "#fed900" }}>
                <div className="single_pricing_content">
                  <div className="single_pricing_content_inner">
                    <div className="pricing_head pb-4">
                      <div className="pricing_title">
                        <h3>Fiber Home</h3>
                      </div>
                    </div>
                    <div className="pricing_body pt-35 pb-4" style={{ border: "1px solid #8c8c8dff"}} >
                      <div className="featur">
                        <ul >
                          <li style={{ color: "#1f2f5e" }}>Free Equipment</li>
                          <li style={{ color: "#1f2f5e" }} >20Mbps</li>
                          {/* <li>Family voice package</li>
                          <li>One User IPTV App</li> */}
                          <li style={{ color: "#1f2f5e" }}>24/7 support</li>
                          <br></br>  <br></br>
                        </ul>
                      </div>
                    </div>
                    <div className="pricing_tk pt-3 pb-4">
                      <span className="curencyp">$</span>
                      <h2>
                        20 <span>/ month</span>
                      </h2>
                    </div>
                    <div className="pricing_button">
                      <div className="order_now">
                        <a href="#">BUY NOW</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-sm-12">
              {/* Single Pricing */}
              <div className="single_pricing mb-4">
                <div className="single_pricing_content">
                  <div className="single_pricing_content_inner">
                    <div className="pricing_head pb-4">
                      <div className="pricing_title">
                        <h4>Fiber Home</h4>
                      </div>
                    </div>
                    <div className="pricing_body pt-35 pb-4">
                      <div className="featur">
                      <ul >
                          <li>Free Equipment</li>
                          <li>20Mbps</li>
                          {/* <li>Voice 400 Minutes</li> */}
                          
                          <li>One User IPTV App</li>
                          <li>24/7 support</li>
                         
                        </ul>
                      </div>
                    </div>
                    <div className="pricing_tk pt-3 pb-4">
                      <span className="curencyp">$</span>
                      <h2>
                        25 <span>/ month</span>
                      </h2>
                    </div>
                    <div className="pricing_button">
                      <div className="order_now">
                        <a href="#">BUY NOW</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
                <div className="col-lg-4 col-md-6 col-sm-12">
              {/* Single Pricing */}
              <div className="single_pricing mb-4" style={{ background: "#1f2f5e" }}>
                <div className="single_pricing_content">
                  <div className="single_pricing_content_inner">
                    <div className="pricing_head pb-4">
                      <div className="pricing_title">
                        <h4 style={{ color: 'white' }}>Fiber Business</h4>
                      </div>
                    </div>
                    
                   <div className="pricing_body pt-35 pb-4">
                      <div className="featur">
                      <ul >
                      <li style={{ color: 'white' }}>Free Equipment</li>
      <li style={{ color: 'white' }}>32Mbps</li>
      {/* <li style={{ color: 'white' }}>Family voice package</li> */}
      <li style={{ color: 'white' }}>Free IPTV</li>
      <li style={{ color: 'white' }}>One User IPTV App</li>
                         
                        </ul>
                      </div>
                    </div>
                      <div className="pricing_tk pt-3 pb-4">
                      <span className="curencyp" style={{ color: 'white' }}>$</span>
                      <h2 style={{ color: 'white' }}>
                        50 <span style={{ color: 'white' }}>/ month</span>
                      </h2>
                    </div>
                    <div className="pricing_button">
                     <div className="order_now" >
                        <a style={{ color: 'white', display: 'inline-block',
        fontSize: '18px',
        fontWeight: 600,
        padding: '16px 42px',
        // color: '#616161',
        border: '1px solid #e6e6e6',
        borderRadius: '20px',
        transition: '0.5s',
        background: 'transparent',}} href="#">BUY NOW</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          
          </div>
        </div>
      </div>
      <div className="about_area style-three">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6">
        <div
          className="single_about_thumb pr-5 wow fadeInDown"
          data-wow-delay=".3"
        >
          <div className="single_about_thumb_inner1">
            <Image src="/assets/images/b1.png" alt="Enjoy trending series" width={554} height={555} style={{ 
            width: '554px',
             height: '555px', 
            // backgroundColor:'#F5F5F5'
            }}/>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6">
        <div
          className="section_title text_left mb-30 mt-3 wow fadeInRight"
          data-wow-delay=".4"
        >
          <div className="section_sub_title1 mb-3">
            {/* <h6>BRINGING ACTION TO BRAND</h6> */}
          </div>
          <div className="section_main_title1">
            <h1>Enjoy trending series and viral content together</h1>
          </div>
          <div className="section_content_text1">
            <p>
            On-demand and Youtube videos, bo more about personal viewing. Watch them with friends and family on TV.
            </p>
          </div>
        </div>
        <div className="section_button2 wow fadeInLeft" data-wow-delay=".5">
          <div className="abou-button2">
            <a href=""> Discover More </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="call-do-action style-two pt-120 pb-80">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6">
        <div className="call-do-action-content">
          <div className="call-do-thumb-box">
            <div className="call-do-thumb4 rotateme">
              <Image src="/assets/images/box-2.png" alt="Call to action decoration" width={100} height={100} />
            </div>
          </div>
        </div>
        <div
          className="section_title style-two mt-3 wow fadeInRight"
          data-wow-delay=".4"
        >
          <div className="section_sub_title">
            <h1>One connection streams all of the entertainment</h1>
          </div>
          <div className="section_main_title">
            {/* <h1>Sounds Like Techno Might</h1>
            <h1>
              Be The Right Choice For <br />
              Your Business?
            </h1> */}
          </div>
          <div className="section_content_text">
            <p>Tv shows, live matches, trending web series, and the lastest movies, stream all this and more with BluecomTV.</p>
          </div>
          {/* <div className="call-do-icon">
            <i className="fa fa-volume-control-phone" />
            <span>+252 (062) 466-6666</span>
          </div> */}
          <div className="call-button1 wow fadeInUp" data-wow-delay=".5">
            <a href="#" style={{ 
        
             backgroundColor:'#fed900'
            }}>
              {" "}
              Contact Us <i className="bi bi-arrow-right" />{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 wow fadeInDown" data-wow-delay=".5">
        <div className="call-do-main-thumb bounce-animate3 pl-70">
          <Image src="/assets/images/b2 final.png" alt="Entertainment streaming" width={469} height={521} style={{ 
            width: '469px',
             height: '521px', 
            // backgroundColor:'#F5F5F5'
            }}/>
        </div>
      </div>
    </div>
  </div>
</div>
 <section style={{ maxWidth: "1100px", margin: "0 auto 5rem", padding: "0 1.5rem" }}>
        <h2 style={{ fontSize: "2rem", color: "#1f2f5e", marginBottom: "1.7rem", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        {faqItems.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ marginBottom: "1.6rem", borderBottom: "1px solid #d6edd5", paddingBottom: "1rem" }}>
              <button
                onClick={() => toggleFAQ(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-section-${i}`}
                id={`faq-question-${i}`}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  fontSize: "1.15rem",
                  color: "#1f2f5e",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.3rem 0",
                }}
              >
                <span>{question}</span>
                <span style={{ fontSize: "1.5rem" }}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p
                  id={`faq-section-${i}`}
                  aria-labelledby={`faq-question-${i}`}
                  style={{ marginLeft: '2rem', marginTop: '0.3rem', whiteSpace: 'pre-line', color: '#333' }}
                >
                  {answer}
                </p>
              )}
            </div>
          );
        })}
      </section>
<div className="vedio-area">
  <div className="container">
    <div className="row vedio-bg wow fadeInDown" data-wow-delay=".4">
      <div className="col-lg-12">
        <div className="techno-vedio-title">
          <h2>We&apos;d love to help you</h2>
          <p>
          Need guidance?
          </p>
        </div>
        <div className="data_science_video1 white-color1">
          <div className="data_science_video_inner1">
            <a
              className="video-vemo-icon venobox vbox-item"
              data-vbtype="youtube"
              data-autoplay="true"
              href="https://www.youtube.com/watch?v=UkaVw6o_Yqg&t=2s"
            >
              <i className="fa fa-play" />
              <div id="spinnerbtn" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

     </Layout>



      
        </>
    )
}