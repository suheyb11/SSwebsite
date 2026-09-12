import React from 'react'
import Layout from '../components/layout/Layout'
import Slider from '../components/layout/slider'
import Image from 'next/image';
import Clients from '../components/layout/client'
import Service from '../components/layout/service'



export default function HomePage() {
  return (
    <Layout>
    
  
       <Slider />
        <Service />
          <div className="service_area style2 pt-80 pb-70" >
  <div className="container">
    <div className="row">
      <div className="col-lg-6" />
      <div className="col-lg-6">
        <div className="section_title text_left mb-55">
          <div className="section_main_title">
            <h4>Discover Our Most Popular Personal Products
</h4>
          </div>
          <div className="em_bar">
            <div className="em_bar_bg" />
          </div>
          <div className="section_content_text pt-4">
            <p>
            We take pride in offering a range of personal products that our customers love and trust. Below are some of the top-rated services we provide, tailored to meet your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="service_single_thumb left">
          <div className="single_service_inner_thumb">
         <Image 
  src="/assets/images/service2.png" 
  alt="Service illustration" 
  width={342} 
  height={396} 
/>

          </div>
          <div className="single_service_brg">
            <div className="single_service_brg_thumb rotateme">
<Image 
  src="/assets/images/service-rot.png" 
  alt="Rotating service decoration" 
  width={524} 
  height={518} 
/>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6">
        <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
              <i className="fa fa-phone" />
            </div>
            <div className="single_service_content">
              <h4>Akram Voice </h4>
            </div>
          </div>
        </div>
        <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
              <i className="fa fa-signal" />
            </div>
            <div className="single_service_content">
              <h4>Kaafiye Plus</h4>
            </div>
          </div>
        </div>
        {/* <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
              <i className="fa fa-comment" />
            </div>
            <div className="single_service_content">
              <h4>SMS</h4>
            </div>
          </div>
        </div> */}
        <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
             <i className="fa-solid fa-money-check-dollar"></i>
            </div>
            <div className="single_service_content">
              <h4>Keydso service</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6">
        <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
              <i className="fa fa-signal" />
            </div>
            <div className="single_service_content">
              <h4>Dhamays Plus</h4>
            </div>
          </div>
        </div>
        <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
              <i className="fa fa-phone" />
            </div>
            <div className="single_service_content">
              <h4>Muraadso</h4>
            </div>
          </div>
        </div>
        {/* <div className="single_service">
          <div className="single_service_inner">
            <div className="single_service_icon">
              <i className="fa fa-money" />
            </div>
            <div className="single_service_content">
              <h4>Edahab Service </h4>
            </div>
          </div>
        </div> */}
        <div className="single_service">
          <div className="single_service_inner">
          <div className="single_service_icon">
              <i className="fa fa-network-wired" />
            </div>
            <div className="single_service_content">
              <h4>FTTB & FTTH </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/*==================================================*/}
      {/*==================================================*/}
      {/*--- Start Techno About Area ---*/}
      {/*==================================================*/}
      <div className="service-area style-four pt-40 pb-100">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-4">
        <div
          className="section_title text_left mb-30 mt-3 wow "
          data-wow-delay=".4"
        >
          <div className="section_sub_title1 upper mb-3">
            <h6>OUR SERVICE</h6>
          </div>
          <div className="section_main_title1">
            <h1>We Understanding Your Business</h1>
          </div>
          <div className="section_content_text2">
            <p>
            Expand your business and connect with your customers using SMS marketing, seamlessly integrated into your business system.
            </p>
          </div>
          <div className="abou-button2 pt-1">
            <a href=""> Discover More </a>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div
          className="em-service-single-box1 upper1 wow "
          data-wow-delay=".5"
        >
          <div className="em-service-box-inner1">
            <div  className="em-service-content">
              <div className="em-service-icon">
                <div className="em-icon1">
                  <Image src="/assets/images/icon-2-2.png" alt="SMS Service icon" width={115} height={114}  />   
                </div>
              </div>
              <div className="em-service-title1">
                <h2>SMS Service</h2>
              </div>
              <div className="em-service-text1">
               <p>
  Bulk messaging made easy with Somtel&apos;s SMS Gateway and API—ideal for marketing, alerts, and service notifications.
</p><br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div
          className="em-service-single-box1 upper2 wow "
          data-wow-delay=".5"
        >
          <div className="em-service-box-inner1">
            <div className="em-service-content">
              <div className="em-service-icon">
                <div className="em-icon1">
                  <Image src="/assets/images/servce1.png" alt="IVR Service icon" width={115} height={114}  />
                </div>
              </div>
              <div className="em-service-title1">
                <h2>IVR</h2>
              </div>
              <div className="em-service-text1">
                <p>
                  Automated self-service menus and cost-effective SIP Trunking for seamless, high-volume call management.
                <br></br><br></br></p><br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div
          className="em-service-single-box1 upper3 wow "
          data-wow-delay=".5"
        >
          <div className="em-service-box-inner1">
            <div className="em-service-content">
              <div className="em-service-icon">
                <div className="em-icon1">
                  <Image src="/assets/images/icon-2-1.png" alt="USSD Short Codes icon" width={115} height={114}  />
                </div>
              </div>
              <div className="em-service-title1">
                <h2>USSD Short Codes</h2>
              </div>
              <div className="em-service-text1">
                <p>Fast, cost-effective interactive services—payments, account management, promotions, and surveys—accessible on any phone without internet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div
          className="em-service-single-box1 active wow "
          data-wow-delay=".5"
        >
          <div className="em-service-box-inner1">
            <div className="em-service-content">
              <div className="em-service-icon">
                <div className="em-icon1">
                  <Image src="/assets/images/icon-3.png" alt="Fiber Internet icon" width={115} height={114} />
                </div>
              </div>
              <div className="em-service-title1">
                <h2>Fiber Internet</h2>
              </div>
              <div className="em-service-text1">
                <p>
High-speed, reliable nationwide connectivity for home and business, with backup service for uninterrupted access.                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div
          className="em-service-single-box1 upper4 wow "
          data-wow-delay=".5"
        >
          <div className="em-service-box-inner1">
            <div className="em-service-content">
              <div className="em-service-icon">
                <div className="em-icon1">
                  <Image src="/assets/images/icon-2-4.png" alt="Somtel IPTV icon" width={115} height={114}  />
                </div>
              </div>
              <div className="em-service-title1">
                <h2>Somtel IPTV</h2>
              </div>
              <div className="em-service-text1">
                <p>
Enjoy local and international channels with reliable internet-based TV, anytime, anywhere.                </p>
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
    

      {/*==================================================*/}
      {/*--- End Techno Pricing Area ---*/}
      {/*==================================================*/}
      {/*==================================================*/}
      {/*--- Start Techno Blog Area ---*/}
      {/*==================================================*/}
	<div className="bg_title_area pt-80 pb-120" style={{ backgroundImage: "url('/assets/images/slider/slider14_old.jpg')" }}

>
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="section_title white text_center mb-60 mt-3">
						<div className="section_sub_title uppercase mb-3">
							<h6>CLIENT REVIEWS</h6>
						</div>
					<div className="section_main_title">
    <h1 style={{ color: "#fed900" }}>What People And Clients</h1>
    <h1 style={{ color: "#fed900" }}>Think About Us?</h1>
</div>
						<div className="em_bar">
							<div className="em_bar_bg"></div>
						</div>
						<div className="section_content_text pt-4">
					<p>We focus on delivering seamless and innovative solutions tailored to client needs. Our team coordinates efficiently to ensure quality results and drive business success with reliable, modern services.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<Clients />

      <div className="subscribe_area style_three pt-70 pb-70" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="row sbc_bg_box wow fadeInDown" data-wow-delay=".4">
          <div className="col-lg-8 col-md-8">
            <div className="subscribe_bg_box">
              <div className="single_subscribe_contact">
                <div className="subscribe_content_title white pb-15">
                  <h2 style={{ color: '#1f2f5e' }}>Subscribe Our Newsletter</h2>
                  <p style={{ color: '#1f2f5e' }}>Subscribe to Keep Up to Date with Everything SOMTEL</p>
                </div>
                <form >
                  <div className="subscribe_form">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      required
                  
                      style={{
                        padding: '12px 20px',
                        borderRadius: '25px',
                        border: '2px solid #1f2f5e',
                        width: '100%',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div className="subscribe_form_send">
                    <button 
                      type="submit" 
                      className="btn" 
                     
                      style={{ 
                        backgroundColor: '#fed900',
                        color: '#1f2f5e',
                        border: 'none',
                        padding: '12px 30px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        
                       
                        transition: 'all 0.3s ease'
                      }}
                    > 
                     
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="subscribe-thumb text-center">
              <Image 
                src="/assets/images/messege.png" 
                alt="Newsletter subscription" 
                width={300}
                height={250}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}