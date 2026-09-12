import React, { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/layout/Layout'
const pricingPlans = [
  {
    price: 0.5,
    bgColor:"#fed900","textColor": "#1f2f5e",
    
    features: ["1.2 GB", "+34.5 min", "+25 sms", "No Expire"],
  },
  {
    price: 1, bgColor:"#1f2f5e","textColor": "#ffffff",
    features: ["2.5GB", "+92 min", "+50 sms", "No Expire"],
  },
  {
    price: 2, bgColor:"#ffffff","textColor": "#1f2f5e",
    features: ["5.5 GB", "+184 min", "+100 sms", "No Expire"],
  },
  {
    price: 5, bgColor:"#1f2f5e","textColor": "#ffffff",
    features: ["12.75 GB", "+460 min", "+175 sms", "No Expire"],
  },
  {
    price: 10, bgColor:"#fed900","textColor": "#1f2f5e",
    features: ["29 GB", "+920 min", "+300 sms", "No Expire"],
  },
  // {
  //   price: 20,
  //   features: ["70 GB", "+2400 min", "+300 sms", "No Expire"],
  // },
];
<div className="loader-wrapper">
	  <div className="loader"></div>
	  <div className="loder-section left-section"></div>
	  <div className="loder-section right-section"></div>
	</div>
export default function Kaafiye() {
  
    const faqItems = [
      {
        question: "Do KAAFIYE Plus bundles really never expire?",
        answer: "Yes! Unlike other providers, KAAFIYE Plus bundles have no expiration date, allowing you to use your data and voice balance at your own pace without worrying about losing unused resources."
      },
      {
        question: "What types of bundles are available with KAAFIYE Plus?",
        answer: "KAAFIYE Plus offers a variety of mobile data and voice bundles designed to meet different needs, from light users to heavy data consumers. These packages provide high-speed internet and reliable voice services at competitive prices."
      },
      {
        question: "How can I subscribe to a KAAFIYE Plus bundle?",
        answer: "You can subscribe to a KAAFIYE Plus bundle through the provider's official app, website, or by dialing a specific USSD code. For more details, visit your nearest customer service center or check the official KAAFIYE Plus platform."}
    ];
    
     const [openIndex, setOpenIndex] = useState(null);


   const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};
return (
      <Layout>
    
  <div
    className="video_area pt-100 pb-200"
    style={{ backgroundImage: "url(assets/images/slider/slider-3.png)" }} id='kaafiye'
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section_title text_center white mb-55">
            <div className="section_main_title">
              <h1 style={{ color: "#fed900" }}>Kaafiye Plus</h1>
              <h1 style={{ color: "#ffff" }}>Voice +Data +SMS.</h1>
              <p className="descStyle2" style={{ color: '#ffff' }}>
              KAAFIYE Plus offers a range of mobile data and voice bundles designed
to deliver high-speed internet and reliable voice services at competitive
prices. Unlike our competitors, KAAFIYE Plus bundles never expire.
            </p>
            </div>
            <div className="em_bar">
              <div className="em_bar_bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="video_area pb-200">
    <div className="container">
      <div className="row mrt-200">
        <div className="col-lg-12">
          <div className="single_video">
            <div className="single_video_thumb">
              <Image src="/assets/images/kaafiye14.png" alt="Kaafiye Plus service" width={1147} height={560} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="single-video text-center">
            <div className="video-icon mrt-345">
              <a
                className="video-vemo-icon venobox vbox-item"
                data-vbtype="youtube"
                data-autoplay="true"
                href="https://www.youtube.com/watch?v=oLB36JMN-3Q"
              >
                <i className="fa fa-play" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 <div className="pricing_area pt-80 pb-70" id="pricing">
      <div className="container">
        {/* Section Title */}
        <div className="row">
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

        {/* Pricing Cards */}
        <div className="row">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="pricing_single-box"    style={{ backgroundColor: plan.bgColor }}>
                <div className="pricing-head">
                  <div className="pricing_tk">
                    <h2 style={{ color: plan.textColor }}>
                      <span className="dollar">$</span>
                      {plan.price}
                    </h2>
                  </div>
                </div>
                <div className="pricing_body">
                  <div className="featur_itmes">
                    <ul>
                      {plan.features.map((feature, i) => (
                        <li key={i} style={{ color: plan.textColor }}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pricing_button">
                  <a href="#">
                    Buy Now <i className="bi bi-arrow-right" />
                  </a>
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
                  style={{ marginLeft: '2rem', marginTop: '0.3rem', whiteSpace: 'pre-line', color: '#333' }}
                >
                  {answer}
                </p>
              )}
            </div>
          );
        })}
      </section>

  </Layout>
        
    )
}