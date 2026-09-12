

import Link from 'next/link';
import Image from 'next/image';


import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import $ from 'jquery';

// @ts-ignore: Owl Carousel expects global jQuery
if (typeof window !== 'undefined') {
  window.$ = $;
  window.jQuery = $;
  require('owl.carousel');
}

export default function Slider() {
  const pathname = usePathname();

  useEffect(() => {
    const initSlider = () => {
      const $slider = $('.slider_list');

      if ($slider.length && !$slider.hasClass('owl-loaded')) {
        $slider.owlCarousel({
          items: 1,
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
    return (
        <>
            {/* Slider Area */}
            <div className="slider_list owl-carousel pb-5 ">
                {/* Slide 1 */}
          

         

<div className="slider_area d-flex align-items-center slider23 " id="home">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="single_slider">
     
          	<div className="slider_content">
							<div className="slider_text">
								<div className="slider_text_inner">
									<h1 style={{ color: "#1f2f5e" }}> Superfast</h1>
									<h1 style={{ color: "#1f2f5e" }}> Broadband Internet</h1>
								</div>
								<div className="slider_text_desc pt-4">
									<p style={{ color: "#1f2f5e" }}>   Experience unlimited speed and reliable connectivity 
                  with Somtel Broadband. Stay connected anytime, anywhere.
                </p>
								</div>
								<div className="slider_button pt-5 d-flex">
									<div className="button">
										<a href="#">Get Connected <i className="fa fa-long-arrow-right"></i></a>
									</div>
								</div>
							
							</div>
						</div>
        </div>
      </div>
    </div>
  </div>
</div>   
   <div className="slider_area d-flex align-items-center slider24" id="home">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="single_slider">
          
          <div className="slider_content">
							<div className="slider_text">
								<div className="slider_text_inner">
									<h1 style={{ color: "#1f2f5e" }}>  Talk More,   </h1>
									<h1 style={{ color: "#1f2f5e" }}> Less Pay</h1>
								</div>
								<div className="slider_text_desc pt-4">
									<p style={{ color: "#1f2f5e" }}>    Enjoy affordable voice, internet, and mobile money services with Somtel.
                </p>
								</div>
								<div className="slider_button pt-5 d-flex">
									<div className="button">
										<a href="#">Explore Services<i className="fa fa-long-arrow-right"></i></a>
									</div>
								</div>
								
							</div>
						</div>
        </div>
      </div>
    </div>
  </div>
</div>       
<div className="slider_area d-flex align-items-center slider21" id="home">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="single_slider">
     
          	<div className="slider_content">
							<div className="slider_text">
								<div className="slider_text_inner">
									<h1 style={{ color: "#1f2f5e" }}> eDahab  </h1>
									<h1 style={{ color: "#1f2f5e" }}> Services</h1>
								</div>
								<div className="slider_text_desc pt-4">
									<p style={{ color: "#1f2f5e" }}>    Secure mobile money for cashless transactions, accessible anytime via the Dahab Plus app for local and international use.
                </p>
								</div>
								<div className="slider_button pt-5 d-flex">
									<div className="button">
										<a href="#">Get Connected <i className="fa fa-long-arrow-right"></i></a>
									</div>
								</div>
							
							</div>
						</div>
        </div>
      </div>
    </div>
  </div>
</div>  

<div className="slider_area d-flex align-items-center slider22" id="home">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="single_slider">
      
          	<div className="slider_content">
							<div className="slider_text">
								<div className="slider_text_inner">
									<h1 style={{ color: "#1f2f5e" }}> Stay Connected </h1>
									<h1 style={{ color: "#1f2f5e" }}> Everywhere</h1>
								</div>
								<div className="slider_text_desc pt-4">
									<p style={{ color: "#1f2f5e" }}>Enjoy fast and reliable mobile internet.  
                  Share moments, stream videos, and connect with loved ones instantly.
                </p>
								</div>
								<div className="slider_button pt-5 d-flex">
									<div className="button">
										<a href="#">How IT Work <i className="fa fa-long-arrow-right"></i></a>
									</div>
								</div>
								
							</div>
						</div>
        </div>
      </div>
    </div>
  </div>
</div>






                {/* <div className="slider_area d-flex align-items-center slider11" id="home">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="single_slider">
                                    <div className="slider_content">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


{/*                
                <div className="slider_area d-flex align-items-center slider15" id="home">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="single_slider">
                                    <div className="slider_content text_center">
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="slider_area d-flex align-items-center slider16" id="home">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="single_slider">
                                    <div className="slider_content text_center">
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  */}
            </div>

            {/* Features Area */}
            <div className="flipbox_area top_feature  " style={{ marginTop: '-20px' }} >
                <div className="container">
                    <div className="row nagative_margin">
                        {/* Voice Communications */}
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6">
                            <div className="techno_flipbox mb-30">
                                <div className="techno_flipbox_font">
                                    <div className="techno_flipbox_inner">
                                        <div className="techno_flipbox_icon">
                                            <div className="icon">
                                                <i className="fa fa-phone" />
                                            </div>
                                        </div>
                                        <div className="flipbox_title">
                                            <h3>Voice Communications</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="techno_flipbox_back">
                                    <div className="techno_flipbox_inner">
                                        <div className="flipbox_desc">
                                            <p>
                                               Reliable local and international calling on prepaid and postpaid plans, including roaming, and direct international calls, with clear and affordable local connections.
                                                
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Internet */}
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6">
                            <div className="techno_flipbox mb-30">
                                <div className="techno_flipbox_font">
                                    <div className="techno_flipbox_inner">
                                        <div className="techno_flipbox_icon">
                                            <div className="icon">
                                                <i className="fa fa-signal" />
                                            </div>
                                        </div>
                                        <div className="flipbox_title">
                                            <h3>Mobile Internet</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="techno_flipbox_back">
                                    <div className="techno_flipbox_inner">
                                        <div className="flipbox_desc">
                                            <p>
Fast, reliable mobile internet with flexible bundles and unlimited plans, keeping you connected anytime, anywhere in Somalia.                                         </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* eDahab Services */}
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6">
                            <div className="techno_flipbox mb-30">
                                <div className="techno_flipbox_font">
                                    <div className="techno_flipbox_inner">
                                        <div className="techno_flipbox_icon">
                                            <div className="icon">
                                             <i className="fa-solid fa-wallet"></i>
                                            </div>
                                        </div>
                                        <div className="flipbox_title">
                                            <h3>eDahab Services</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="techno_flipbox_back">
                                    <div className="techno_flipbox_inner">
                                        <div className="flipbox_desc">
                                            <p>
                                                Secure mobile money for cashless transactions, accessible anytime via the Dahab Plus app for local and international use.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Broadband */}
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6">
                            <div className="techno_flipbox mb-30">
                                <div className="techno_flipbox_font">
                                    <div className="techno_flipbox_inner">
                                        <div className="techno_flipbox_icon">
                                            <div className="icon">
                                                <i className="fa fa-network-wired" />
                                            </div>
                                        </div>
                                        <div className="flipbox_title">
                                            <h3>Broadband</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="techno_flipbox_back">
                                    <div className="techno_flipbox_inner">
                                        <div className="flipbox_desc">
                                            <p>
                                               High-speed, reliable connectivity for home and business, with nationwide backup to keep you always online.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}