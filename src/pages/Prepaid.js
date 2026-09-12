import React from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image';
import Link from 'next/link';
import plansData  from "../components/layout/plan.json";
// import Subscribe from '@/components/home/Subscribe';
export default function prepaid() {
  const Akram = plansData.Akram;
    return (
      <Layout>
      
          <div className="breatcome_area4 d-flex align-items-center" id="Prepaid"
           style={{ backgroundImage: "url(/assets/images/slider/airtime.jpg)" }}>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breatcome_title">
          <div className="breatcome_title_inner pb-2">
            <h2 style={{ color: "#1f2f5e" }}>Airtime  Service</h2>
          </div>
          <div className="breatcome_content">
            <ul>
              <li>
                <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>{" "}
                <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/> <Link href="/Prepaid" style={{ color: "#1f2f5e" }}>Personal</Link>{" "}
                <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/>{" "}
                <span style={{ color: "#1f2f5e" }}>Prepaid</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="about_area style-five">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6">
        <div className="single_about_thumb wow " data-wow-delay=".3">
          <div className="single_about_thumb_inner">
            <div style={{ textAlign: 'center' }}>
    <Image 
    src="/assets/images/prepaidphoto.png" 
    alt="Prepaid service illustration" 
    width={551}
    height={501}
/>

</div>
          </div>
          <div className="em-about-shape-thumb">
            <div className="em-about-thmub-inner2">
              <Image src="/assets/images/about-sp.png" alt="Decoration shape" width={210} height={210}   />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6">
        <div
          className="section_title style-two mb-30 mt-3 wow fadeInRight"
          data-wow-delay=".4"
        >
          <div className="section_sub_title">
            {/* <h5>About Techno</h5> */}
          </div>
          <div className="section_main_title">
            <h1>Prepiad Service</h1>
          
          </div>
          <div className="section_content_text upper">
    
            <p>Airtime/prepaid voice services :
        Offer bundles for local calls, international calls,
        interconnection, and additional services like muraadso,
        kaafiye, and Dhameys. Additionally, local SMS is $0.01
        each, while international SMS costs $0.10 each. The rates
        for local calls are detailed in the infographic below.
            </p>
          </div>
        </div>
        <div
          className="em-about-border-box1 pt-1 wow fadeInLeft"
          data-wow-delay=".5"
        >
          <div className="row em-border">
            {/* <div className="col-md-6 col-lg-6">
              <div className="em-about-icon-box">
                <div className="em-about-icon">
                  <Image src="/assets/images/icon.png" alt="" />
                </div>
                <div className="em-about-title">
                  <h3>Moneyback Gurentee</h3>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-lg-6">
              <div
                className="em-about-icon-box1 wow fadeInDown"
                data-wow-delay=".6"
              >
                <div className="em-about-icon">
                  <Image src="/assets/images/icon1.png" alt="" />
                </div>
                <div className="em-about-title">
                  <h3>
                  Support <br />
                  24/7 
                  </h3>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row wow fadeInRight" data-wow-delay=".7">
          <div className="col-md-6 col-lg-12">
            <div className="section_button2 mt-40">
              <div className="abou-button1">
                <Link href="/contactus">
                Contact Us
                <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="em-about-shape">
      <div className="shape-thumb">
        <Image src="/assets/images/shape-ab.png" alt="Decoration shape" width={916} height={902} style={{ width: "100%", height: "auto" }}  />
      </div>
    </div>
  </div>
</div>
<div className="process-area style-two pt-1020 pb-100"  style={{ background: "#ffffffff" }}>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div
          className="section_title text_center style-two up mb-90 mt-4 wow fadeInRight"
          data-wow-delay=".4"
        >
          <div className="section_sub_title">
            <span>
              <h5>Prepaid Plans</h5>
            </span>
          </div>
          <div className="section_main_title">
            <h1>Top-Value Prepaid Plans</h1>
          </div>
          <div className="section_content_text1">
           <p>            
  <b> Affordable and value-packed prepaid plans</b>
  <br></br>
  Stay connected on your terms with affordable, pay-as-you-go options. Get clear calls with no hidden charges all with Somtel&apos;s reliable network.
</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row process-bg wow fadeInLeft" data-wow-delay=".5">
      <div className="col-lg-4 col-md-6">
        <div className="process-single-box" style={{ background: "#fed900" }}>
          <div className="process-contant1" >
            <div className="process-number" >
              <div className="process-number-inner" > 
                <span style={{ background: "#fed900" }} >01</span>
              </div>
            </div>
            <div className="process-title">
               <p style={{ color: '#1f2f5e'}}><b>Muraadso Unlimited</b> </p><br></br>
              <p style={{ color: '#1f2f5e'}}>
                Premium plan with unlimited national calls across South Central, Puntland, and Somaliland ideal for frequent callers.</p>
            </div>
            <div className="process-text">
              {/* <p>
                Phosfluorescent maintain suckings opportunities for driven
                networks
              </p> */}
            </div>
            <div className="abou-button1" >
                <Link href="/Muraadso" style={{ background: "#fed900",color:"#1f2f5e" }}>
                Muradso Prices
                <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
               
              
          </div>
          </div>
            
          
             
        
        </div>
       
      </div>
      <div className="col-lg-4 col-md-6 justify-content-center">
        <div className="process-single-box upper">
          <div className="process-contant1">
            <div className="process-number">
              <div className="process-number-inner">
                <span style={{ background: "#fed900" }}>02</span>
              </div>
            </div>
            <div className="process-title">
              <p style={{ color: '#232323'}}><b>Akram Voice</b> </p><br></br>
              <p style={{ color: '#232323'}}>
              Affordable plan with nationwide call minutes—perfect for controlled, cost-effective usage.</p><br></br>
              
            </div>
            <div className="process-text">
              {/* <p>
                Phosfluorescent maintain suckings opportunities for driven
                networks
              </p> */}
            </div>
              <div className="abou-button1">
                <Link href="/Akram" style={{ color:"#1f2f5e" }}>
                Akram Prices
                <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
               
              
          </div>
          </div>
        
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="process-single-box" style={{ background: "#1f2f5e" }}>
          <div className="process-contant1">
            <div className="process-number">
              <div className="process-number-inner">
                <span style={{ background: "#fed900" }} >03</span>
              </div>
            </div>
            <div className="process-title">
               <p style={{ color: '#ffffffff'}}><b>Airtime</b> </p><br></br>
              <p style={{ color: '#fff'}}> 
             Flexible credit for local and international calls, convertible to data, with full interconnection across all Somali networks.</p>
             
               <br></br>
            </div>
            <div className="process-text">
              {/* <p>
                Phosfluorescent maintain suckings opportunities for driven
                networks
              </p> */}
            </div>
            <div className="abou-button1">
                <Link href="/Prepaid" style={{ background: "#1f2f5e",color:"#ffff" }}>
                Airtime Prices
                <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
               
              
          </div>
          </div>
        </div>
      </div>
      {/* <div className="col-lg-3 col-md-6">
        <div className="process-single-box upper">
          <div className="process-contant1">
            <div className="process-number">
              <div className="process-number-inner">
                <span>04</span>
              </div>
            </div>
            <div className="process-title">
              <p style={{ color: '#232323'}}> Enter your eDahab PIN Number</p>
            </div>
            <div className="process-text">
           
            </div>
          </div>
        </div>
      </div> */}
      <div className="process-shape">
        <Image src="/assets/images/process-border.png" alt="Process border decoration" width={899} height={27} style={{ width: "100%", height: "auto" }}  />
      </div>
      <div className="process-shape-thumb">
        <Image src="/assets/images/process-circle.png" alt="Process circle decoration" width={155} height={133}  style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  </div>
</div>


<div className="about_area style-five" style={{ background: "#ffffffff" }}>
  
  <div className="container">
    
    <div className="row">
      
      <div className="col-lg-6 col-md-6">
        <div className="single_about_thumb wow fadeInDown" data-wow-delay=".3">
          <div className="single_about_thumb_inner">
            <Image src="/assets/images/DID.png" alt="DID Call service illustration"  width={551}
    height={501} />
          </div>
          <div className="em-about-shape-thumb">
            <div className="em-about-thmub-inner2">
              <Image src="/assets/images/about-sp.png" alt="Decoration shape" width={210} height={210} style={{ width: "100%", height: "auto" }}  />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6">
        <div
          className="section_title style-two mb-30 mt-3 wow fadeInRight"
          data-wow-delay=".4"
        >
          <div className="section_sub_title">
            {/* <h5>About Techno</h5> */}
          </div>
          <div className="section_main_title">
            <h1>DID Call</h1>
          
          </div>
          <div className="section_content_text upper">
 <p>A service that enables individuals in Europe, America,
and Canada to make direct calls to designated numbers
at no cost. This service is particularly beneficial for
customers residing in rural areas or regions with limited
internet access, as it provides a reliable and cost-
effective communication solution.
</p>
          </div>
        </div>
        <div
          className="em-about-border-box1 pt-1 wow fadeInLeft"
          data-wow-delay=".5"
        >
          <div className="row em-border">
            {/* <div className="col-md-6 col-lg-6">
              <div className="em-about-icon-box">
                <div className="em-about-icon">
                  <Image src="/assets/images/icon.png" alt="" />
                </div>
                <div className="em-about-title">
                  <h3>Moneyback Gurentee</h3>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-lg-6">
              <div
                className="em-about-icon-box1 wow fadeInDown"
                data-wow-delay=".6"
              >
                <div className="em-about-icon">
                  <Image src="/assets/images/icon1.png" alt="" />
                </div>
                <div className="em-about-title">
                  <h3>
                  Support <br />
                  24/7 
                  </h3>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row wow fadeInRight" data-wow-delay=".7">
          <div className="col-md-6 col-lg-12">
            <div className="section_button2 mt-40">
              <div className="abou-button1">
                <Link href="/contactus">
                Contact Us
                <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="em-about-shape">
      <div className="shape-thumb">
        <Image src="/assets/images/shape-ab.png" alt="Decoration shape" width={916} height={902} style={{ width: "100%", height: "auto" }}  />
      </div>
    </div>
  </div>
</div>
       </Layout>
    )
}