'use client';

import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Link from 'next/link';
import Image from 'next/image';
import { FaWifi, FaDollarSign, FaNetworkWired, FaChevronRight } from 'react-icons/fa';

export default function Mifi() {
const faqItems = [
  {
    question: "How can I choose the right Mifi Plus plan for my needs?",
    answer: "Your choice depends on how much data you use and how many devices will be connected. If you only browse and chat, a smaller plan works well."
  },
  {
    question: "Can I recharge or top up my Mifi Plus data easily?",
    answer: "Absolutely. You can top up your Mifi Plus bundle anytime through the Edahab Money, Dahab Plus app, or at any customer care center."
  },
  {
    question: "Do I get a router when I subscribe to Mifi Plus?",
    answer: "Yes, every Mifi Plus package comes with a portable 4G router that allows you to share your connection across multiple devices."
  }
];

const [openIndex, setOpenIndex] = useState(null);


   const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

  return (
<Layout>

      <div
        className="breatcome_area4 d-flex align-items-center"
        id="Mifi"
        style={{ backgroundImage: "url(assets/images/slider/airtime.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breatcome_title">
                <div className="breatcome_title_inner pb-2">
                  <h2 style={{ color: "#1f2f5e" }}>Mifi Service</h2>
                </div>
                <div className="breatcome_content">
                  <ul>
                    <li>
                      <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>
                      <FaChevronRight style={{ color: "#1f2f5e", margin: "0 0.5rem" }} />
                      <Link href="/Prepaid" style={{ color: "#1f2f5e" }}>Personal</Link>
                      <FaChevronRight style={{ color: "#1f2f5e", margin: "0 0.5rem" }} />
                      <span style={{ color: "#1f2f5e" }}>Mifi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area pt-100 pb-100">
        <div className="container">
                <div className="row">
  <div className="col-lg-12">
    <div
      className="section_title mb-55 white text_center"
      data-cue="slideInRight"
    >
      <div className="section_main_title">
        <h1 style={{ color: "#1f2f5e" }}>
          Discover Reliable <span style={{ color: "#1f2f5e" }}>Mifi Service</span>
        </h1>
        <p style={{ color: "#1f2f5e" }}>
Experience fast, portable Wi-Fi with Mifi, providing seamless connectivity for multiple devices wherever you go.        </p>
      </div>
    </div>
  </div>
</div>

          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
              <div className="section_title text_left mb-40 mt-3">
                <div className="section_sub_title uppercase mb-3">
                  <h6>{'// ABOUT MIFI'}</h6>
                </div>
                <div className="section_main_title">
                  <h1>Reliable Mobile Internet</h1>
                  <h1>& Portable <span>Wi-Fi Solution.</span></h1>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg"></div>
                </div>
                <div className="section_content_text pt-4">
                  <p>
                    MiFi is a portable wireless device providing secure, high-speed internet access by creating a personal Wi-Fi hotspot, allowing multiple devices like smartphones, tablets, and laptops to connect simultaneously, making it ideal for remote work, travel, and anywhere you need dependable mobile connectivity without relying on fixed Broadband.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
              <div className="single_about_thumb mb-3">
                <Image src="/assets/images/Mifi-modem1.png" alt="MiFi Modem" width={551} height={500} style={{ width: "100%", height: "auto" }}  />
                <div className="border_ift"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="service-section  pt-80 pb-70" >
          <div className="container">
        <div className="row" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {[{
            icon: <FaWifi size={48} color="#FFDC00" />,
            title: "Choose the Right Plan",
            description: "Your choice depends on how much data you use and how many devices will be connected. If you only browse and chat, a smaller plan works well."
          }, {
            icon: <FaDollarSign size={48} color="#FFDC00" />,
            title: "Easy Recharge",
            description: "You can top up your Mifi Plus bundle anytime through the Edahab Money, Dahab Plus app, or at any customer care center."
          }, {
            icon: <FaNetworkWired size={48} color="#FFDC00" />,
            title: "Portable Router Included",
            description: "Every Mifi Plus package comes with a portable 4G router allowing you to share your connection across multiple devices."
          }].map(({ icon, title, description }, idx) => (
            <div key={idx} className="col-lg-4 col-md-6" style={{ marginBottom: '2rem' }}>
              <div style={{ border: '2px solid #FFDC00', padding: '1.5rem', borderRadius: '5px', height: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                <div style={{ marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ color: '#ffffffff', fontWeight: '600' }}>{title}</h3>
                <p style={{ color: '#ffffffff' }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
<br></br>
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
  );
}