import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image';
import Link from 'next/link';

export default function IVR() {
  const params = {
    title: 'Somtel Call Center (IVR) Overview',
    href: '/somtel-ivr',
    menu: 'Business Services',
    name: 'Somtel Call Center (IVR)',
  };

  const faqItems = [
    {
      question: "What is Somtel (IVR)?",
      answer:
        "Somtel Call Center (IVR) is a customer support platform that enables businesses to manage inbound calls through a dedicated short code. It allows companies to provide professional, 24/7 customer service with multiple agents.",
    },
    {
      question: "How can my business apply for the Call Center service?",
      answer:
        "Businesses can apply by contacting Somtel&apos;s enterprise support team. After approval, a short code will be assigned, and agent accounts will be created for your staff.",
    },
    {
      question: "What do I need to be eligible for the service?",
      answer:
        "To be eligible, your business must rent a short code on a monthly basis. You will also need to specify the number of agent users you require.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div
        className="breatcome_area4 d-flex align-items-center"
        id="IVR"
        style={{ backgroundImage: "url(assets/images/slider/somtel-ivr.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breatcome_title">
                <div className="breatcome_title_inner pb-2">
                  <h2 style={{ color: "#222E5E" }}>IVR Overview</h2>
                </div>
                <div className="breatcome_content">
                  <ul>
                    <li>
                      <Link href="/" style={{ color: "#222E5E" }}>
                        Home
                      </Link>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#222E5E" }} />{" "}
                      <a href="/business" style={{ color: "#222E5E" }}>
                        Business
                      </a>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#222E5E" }} />{" "}
                      <span style={{ color: "#222E5E" }}>IVR</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area style-five" style={{ background: "#ffffffff" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title mb-55 white text_center" data-cue="slideInRight">
                <div className="section_main_title">
                  <h1 style={{ color: "#222E5E" }}>Somtel Call Center Platform</h1>
                  <p style={{ color: "#222E5E" }}>
                    Somtel&apos;s Call Center platform is designed for businesses that need a professional customer support system. 
                    Companies rent a monthly short code and pay per active agent user. Once approved, Somtel provides access to a management portal where businesses can set up call flows, assign numbers, and manage agents. 
                    This solution gives businesses a reliable, scalable, and 24/7 customer support touchpoint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="video_area pt-100 pb-250">
        <div className="container">
          <div className="row mrt-200">
            <div className="col-lg-12">
              <div className="single_video">
                <div className="single_video_thumb">
                  <Image
                    src="/assets/images/empowering.jpg"
                    alt=""
                    width={1280}
                    height={799} 
                    style={{ width: "100%", height: "auto" }} 
                  />
                </div>
              </div>
              <div className="single-video text-center">
                <div className="video-icon mrt-345">
                  <a className="video-vemo-icon venobox vbox-item" data-vbtype="youtube" data-autoplay="true" href="https://youtu.be/BS4TUd7FJSg">
                    <i className="fa fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br><br></br><br></br><br></br>

      {/* FAQ Section */}
      <section style={{ maxWidth: "900px", margin: "0 auto 5rem", padding: "0 1.5rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            color: "#222E5E",
            marginBottom: "1.7rem",
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>
        {faqItems.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                marginBottom: "1.6rem",
                borderBottom: "1px solid #d6edd5",
                paddingBottom: "1rem",
              }}
            >
              <button
                onClick={() => toggleFAQ(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-section-${i}`}
                id={`faq-question-${i}`}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  fontSize: "1.15rem",
                  color: "#222E5E",
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
                  style={{ marginLeft: "2rem", marginTop: "0.3rem", whiteSpace: "pre-line", color: "#333" }}
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