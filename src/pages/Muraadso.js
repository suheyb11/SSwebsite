import React, { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/layout/Layout'
import plansData  from "../components/layout/plan.json";


export default function Muraadso() {
  <div className="loader-wrapper">
	  <div className="loader"></div>
	  <div className="loder-section left-section"></div>
	  <div className="loder-section right-section"></div>
	</div>
    const faqItems = [
      {
        question: "How does Muraadso Service enable unlimited calling across Somtel networks without changing SIM cards?",
        answer: "Muraadso Service leverages advanced technology to seamlessly integrate with all Somtel networks in Somalia (62), Puntland (66), and Somaliland (65). This eliminates the need for users to switch SIM cards, ensuring uninterrupted connectivity across these regions."
      },
      {
        question: "Who can benefit from using Muraadso Service?",
        answer: "Muraadso Service is designed for both youth and business professionals who require reliable and affordable communication. Whether for personal use or business purposes, Muraadso provides high-quality service at a competitive price."
      },
      {
        question: "Is Muraadso Service available nationwide, and how can I subscribe?",
        answer: "Yes, Muraadso Service is available across Somalia, Puntland, and Somaliland. To subscribe, visit your nearest Somtel outlet or use the online registration platform to activate the service and enjoy unlimited calling."
      }
    ];
    
     const [openIndex, setOpenIndex] = useState(null);


   const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};
    
      const dhameysPlans = plansData.dhameysPlus;
    const muradsoPlans = plansData.muradso;

 return (
       <Layout>
            {/* <div
    className=" breatcome_area2 d-flex align-items-center"
    style={{ backgroundImage: "url(assets/images/slider/muradso.jpg)" }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section_title white text_center mb-60 mt-3">
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
        </div> */}
            {/* <div className="section_main_title">
              <h1 style={{ color: "#fff" }}>eDahab is providing the most comprehensive</h1>
              <h1 style={{ color: "#fff" }}>and accessible package of mobile banking features</h1>
              <h1 style={{ color: "#fff" }}>video for about our company</h1>
            </div> */}
          {/* </div>
        </div>
      </div>
    </div>
  </div> */}
          {/* <div className="breatcome_area d-flex align-items-center" id="prepaid">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breatcome_title">
          <div className="breatcome_title_inner pb-2">
            <h2>Muraadso  Service</h2>
          </div>
          <div className="breatcome_content">
            <ul>
              <li>
                <a href="/">Home</a>{" "}
                <i className="fa fa-angle-right" /> <a href="/Muraadso"> Self Service</a>{" "}
                <i className="fa fa-angle-right" />{" "}
                <span>Muraadso</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}
<div className="mission-section style2">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-8 col-md-9">
        <div className="section-title white mb-30" data-cue="slideInLeft">
          <div className="section_main_title">
            <h5 className="color-full" style={{ color: '#fff' }}>WATCH VIDEO</h5>
            <h1 style={{ color: '#ffff' }}>Muraadso </h1>
            <h1 style={{ color: '#ffff' }}>
              <span style={{ color: '#f9df06' }}>Services</span> &amp; More
            </h1>
            <p className="descStyle2" style={{ color: '#ffff' }}>
            Muraadso Service provides an exceptional solution for
unlimited, affordable calling across all Somtel networks in
Somalia (62), Puntland (66), and Somaliland (65).
            </p>
          </div>
        </div>
        <div className="tchn-button style2" data-cue="slideInUp">
          <a href="#">
            Discover More <i className="bi bi-arrow-right" />
          </a>
        </div>
      </div>
      <div className="col-lg-4 col-md-3" data-cue="slideInLeft">
        <div className="video-icon text-right">
          <a
            className="video-vemo-icon venobox vbox-item"
            data-vbtype="video"
            data-autoplay="true"
            href="https://www.youtube.com/watch?v=bky54Ixhhy8"
            
          >
            <i className="fa fa-play" />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="pricing_area pt-80 pb-70">
      <div className="container">
            <div className="row">
            {/* Start Section Tile */}
            <div className="col-lg-12">
              <div className="section_title text_center mb-50 mt-3">
                <div className="section_sub_title uppercase mb-3">
                  <h6>PRICING</h6>
                </div>
                <div className="section_main_title">
                  <h3>*Dear customer, use this method to recharge with eDahab:
</h3><b />
                  <h3> Dial 101# or 202#.</h3>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg" />
                </div>
              </div>
            </div>
          </div>
        <div className="row">
      {muradsoPlans.map((plan) => (
        <div key={plan.id} className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`single_pricing mb-4 ${plan.highlight ? "active" : ""}`}
            style={{ backgroundColor: plan.bgColor }}
          >
            <div className="single_pricing_content">
              <div className="single_pricing_content_inner">
                <div className="pricing_head pb-4">
                  <div className="pricing_title">
                    <h3 style={{ color: plan.textColor }}>{plan.title}</h3>
                  </div>
                </div>
                <div className="pricing_body pt-35 pb-4"style={{ border: "1px solid #8c8c8dff"}} >
                  <div className="featur" >
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index} style={{ color: plan.textColor  }}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pricing_tk pt-3 pb-4">
                  <span className="curencyp" style={{ color: plan.textColor }}>$</span>
                  <h2 style={{ color: plan.textColor }}>
                    {plan.price} <span style={{ color: plan.textColor }}>/ {plan.unit}</span>
                  </h2>
                </div>
                <div className="pricing_button" >
                  <div className="order_now">
                    <a
                      href="#"
                      // style={{
                      //   color:  plan.textColor,
                      //   display: "inline-block",
                      //   fontSize: "18px",
                      //   fontWeight: 600,
                      //   padding: "16px 42px",
                      //   border: "1px solid #e6e6e6",
                      //   borderRadius: "20px",
                      //   transition: "0.5s",
                      //   background: "transparent",
                      // }}
                    >
                      BUY NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
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
                  style={{ marginTop: "0.8rem", lineHeight: "1.6", color: "#000000ff" }}
                >
                  {answer}
                </p>
              )}
            </div>
          );
        })}
      </section>
 
<div className="call-do-section">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="call-do-content" data-cue="zoomIn">
          <h2>
            Lets Contact Us <br />
           To More Info !
          </h2>
        </div>
      </div>
      <div className="col-lg-2">
        <div className="call-do-btn" data-cue="zoomIn">
          <a href="https://www.youtube.com/watch?time_continue=8&v=Wx48y_fOfiY&embeds_referring_euri=https%3A%2F%2Fdreamthemebd.dreamitsolution.net%2F&source_ve_path=MjM4NTE&feature=emb_title">
            <i className="fa fa-phone" />
          </a>
        </div>
        <div className="call-do-shape">
          <Image src="/assets/images/brd-circle.png" alt="Circle decoration" width={103} height={103}  />
        </div>
      </div>
      <div className="col-lg-4" data-cue="zoomIn">
        <div className="call-do-info">
          <h2>151</h2>
          <p>somtelsomalia.com</p>
        </div>
      </div>
    </div>
  </div>
</div>



          </Layout>
    )
}