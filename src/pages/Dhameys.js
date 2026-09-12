import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Link from 'next/link';
import Image from 'next/image';
import plansData  from "../components/layout/plan.json";
export default function Dhameys() {
  const faqItems = [
    {
      question: "What makes Dhamays Plus different from other data and voice bundles?",
      answer: "Dhamays Plus offers truly unlimited data and voice services with no caps or restrictions, ensuring seamless connectivity at competitive prices. Unlike other providers, there are no data limits or voice call restrictions."
    },
    {
      question: "Are there any hidden charges or fair usage policies with Dhamays Plus?",
      answer: "No, Dhamays Plus provides unlimited access without hidden fees or restrictive fair usage policies. Users can enjoy uninterrupted high-speed internet and voice services without unexpected charges."
    },
    {
      question: "How can I subscribe to Dhamays Plus?",
      answer: "You can subscribe to Dhamays Plus through the provider's official app, website, or by dialing the designated USSD code. For more details, visit your nearest customer service center or check the official Dhamays Plus platform."}
  ];
  
const [openIndex, setOpenIndex] = useState(null);


   const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

  
    const dhameysPlans = plansData.dhameysPlus;

    return (
      <Layout>
            {/* <div
    className=" breatcome_area2 d-flex align-items-center"
    style={{ backgroundImage: "url(assets/images/slider/dhm.jpg)" }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section_title white text_center mb-60 mt-3">
            <div className="single-video mb-50">
              <div className="video-icon">
                <a
                  className="video-vemo-icon venobox vbox-item"
                  data-vbtype="youtube"
                  data-autoplay="true"
                  href="https://youtu.be/BS4TUd7FJSg"
                >
                  <i className="fa fa-play" />
                </a>
              </div>
            </div>
            <div className="section_main_title">
              <h1 style={{ color: "#fff" }}>eDahab is providing the most comprehensive</h1>
              <h1 style={{ color: "#fff" }}>and accessible package of mobile banking features</h1>
              <h1 style={{ color: "#fff" }}>video for about our company</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
          <div className="breatcome_area d-flex align-items-center"
          style={{ backgroundImage: "url(assets/images/slider/int.jpg)" }}>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breatcome_title">
          <div className="breatcome_title_inner pb-2">
            <h2 style={{ color: "#1f2f5e" }}>Dhamays Plus</h2>
          </div>
          <div className="breatcome_content" >
            <ul>
              <li>
                <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>{" "}
                <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/> <Link href="/Dhameys" style={{ color: "#1f2f5e" }}> Personal</Link>{" "}
                <i className="fa fa-angle-right"style={{ color: "#1f2f5e" }} />{" "}
                <span style={{ color: "#1f2f5e" }}>Dhamays</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="about-section"  >
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="about-thumb" data-cues="zoomIn" 
        // style={{ 
        //      color: '#232323', height: '600px', 
        //    }} 
           >
          {/* <img     src="/assets/images/Dhameys Plus.png" alt=""  /> */}
              <Image 
                            src="/assets/images/Dhameys Plus.png"
                              alt="Somtel Telecommunication Network"
                              idth={618}
              height={586} style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%'
              }}
                            />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="about-content">
      <div className="section_title mb-25" data-cue="slideInRight">
  <div className="section_main_title">
    {/* <h5>Since 1990</h5> */}
    {/* <h1>The Unlimited Voice & Data</h1> */}
    <h1>
      <span>Dhamays</span> Plus
    </h1>
    <p style={{ fontWeight: 500 }}>
      Dhamays Plus offers unlimited data and voice bundles, providing high-speed internet
      and reliable voice services at competitive prices. Unlike our competitors, Dhamays Plus
      ensures endless connectivity and communication without any limits.
    </p>
  </div>
</div>

          <div className="about-sub-content" data-cue="zoomIn">
            <p>
              {/* Dynamically promote economically sound experiences whereas best
              the Proactively enable process-centric services rather than B2B
              scenarios to syndicate future-proof outside the thinking. */}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="about-sub-box" data-cue="zoomIn">
                <div className="about-icon">
                  <i className="bi bi-check" />
                </div>
                <div className="about-sub-text">
                  <h2>High Speed Internet</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-sub-box up" data-cue="zoomIn">
                <div className="about-icon">
                  <i className="bi bi-check" />
                </div>
                <div className="about-sub-text">
                  <h2>Low Cost Price</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row" data-cue="zoomIn">
            <div className="col-lg-6 col-md-6">
              {/* <div className="about-single-box">
                <div className="about-sub-thumb">
                  <img src="assets/images/people.png" alt="" />
                </div>
                <div className="about-sub-info">
                  <h2>David Alexon</h2>
                  <p>CEO &amp; Founder</p>
                </div>
              </div> */}
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="about-button">
                <a href="#">
                  Discover More <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="portfolio_area style_two pt-10 pb-70" id="portfolio">
  <div className="container">
    <div className="row">
      {/* Start Section Tile */}
      <div className="col-lg-12">
        <div className="section_title text_center mb-50 mt-3">
          <div className="section_sub_title uppercase mb-3">
            {/* <h6>Dhamays</h6> */}
          </div>
          <div className="section_main_title">
            <h1>Dhamays Packages</h1>
            <p>Choose the best Unlimited Data & Voice plans for you</p>
          </div>
          <div className="em_bar">
            <div className="em_bar_bg" />
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="portfolio_nav">
          <div className="portfolio_menu">
            <ul className="menu-filtering">
              <li className="current_menu_item" data-filter="*">
                All Pricess
              </li>
              <li>Daily</li>
              <li>Weekly</li>
              <li>Monthly</li>
              {/* <li data-filter=".english">Web Design</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
 <div className="row image_load">
      {dhameysPlans.map((plan) => (
        <div key={plan.id} className="col-lg-4 col-md-12 col-sm-2 grid-item">
          <div
            className="pricing_single-box"
            style={{ backgroundColor: plan.bgColor }}
          >
            <div className="pricing-head">
              <div className="pricing_title">
                <h4 style={{ color: plan.textColor }}>{plan.title}</h4>
              </div>
              <div className="pricing_tk">
                <h2 style={{ color: plan.textColor }}>
                  <span className="dollar" style={{ color: plan.textColor }}>$</span>
                  {plan.price}
                  <span style={{ color: plan.textColor }}> </span>
                </h2>
              </div>
            </div>
            <div className="pricing_body">
              <div className="featur_itmes">
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={{ color: plan.textColor }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pricing_button">
              <a href="#">
                Buy Now<i className="bi bi-arrow-right" />
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