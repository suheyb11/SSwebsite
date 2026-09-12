import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image'; // Using Next.js optimized Image component
import Link from 'next/link';
import { FaPiggyBank, FaCalendarAlt, FaCoins, FaWallet } from "react-icons/fa";

export default function Keydso() {
  const params = {
    title: 'Fiber Optic',
    href: '/fiberoptic',
    menu: 'Corprate Services',
    name: 'Fiber Optic Services',
  };

  const faqItems = [
    {
      question: "What is Adeegga Keydso?",
      answer:
        "Adeegga Keydso is a service that allows you to securely and conveniently save money using your Edahab Money With your phone.",
    },
    {
      question: "Are there any service fees?",
      answer:
        "The basic Adeegga Keydso service is completely free for all users. There are no hidden charges or subscription fees. You can deposit, save, and check your balance without paying anything.",
    },
    {
      question: "Can I deposit money anytime?",
      answer:
        "Absolutely. You can deposit money into your Edahab Money account *232# using your mobile phone.",
    },
    {
      question: "Is Adeegga Keydso safe to use?",
      answer:
        "Yes, Adeegga Keydso uses secure encryption and authentication methods to ensure your money and personal information are protected.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      {/* <Slider></Slider> */}
      <div className="breatcome_area4 d-flex align-items-center" id="Keydso"
        style={{ backgroundImage: "url(assets/images/slider/keydso.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breatcome_title">
                <div className="breatcome_title_inner pb-2">
                  <h2 style={{ color: "#1f2f5e" }}>Keydso Service</h2>
                </div>
                <div className="breatcome_content">
                  <ul>
                    <li>
                      <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/> <Link href="/Prepaid" style={{ color: "#1f2f5e" }}>Personal</Link>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/>{" "}
                      <span style={{ color: "#1f2f5e" }}>Keydso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area style-five" style={{ background: "#ffff" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section_title mb-55 white text_center"
                data-cue="slideInRight"
              >
                <div className="section_main_title">
                  <h1 style={{ color: "#1f2f5e" }}>
                    Save Securely with <span style={{ color: "#1f2f5e" }}> Keydso</span>
                  </h1>
                  <p style={{ color: "#1f2f5e" }}>
                    Enjoy flexible and safe savings plans through Edahab Money. Choose your savings period from 1 month, 3 months, 6 months, to 1 year and grow your money securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="single_about_thumb wow fadeInDown" data-wow-delay=".3">
                <div className="single_about_thumb_inner">
                  <Image 
                    src="/assets/images/key.png"
                    alt="Somtel Telecommunication Network"
                    idth={2296}
    height={2084} style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%'
    }}
                  />
                </div>
                <div className="em-about-shape-thumb">
                  <div className="em-about-thmub-inner2">
                    <Image 
                      src="/assets/images/about-sp.png" 
                      alt="Somtel shape"
                      width={210}
                      height={210} 
                      style={{ width: "100%", height: "auto" }} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="section_title style-two mb-30 mt-3 wow fadeInRight" data-wow-delay=".4">
                <div className="section_main_title">
                  {/* <h1>SOMTEL - SOMALIA</h1>
                  <h1>Keydso Service</h1> */}
                </div>
                <div className="section_content_text upper">
                  <p>
                    Keydso is a secure and convenient savings service offered via eDahab, allowing users to save money with flexible periods starting from 1 month to up to 1 year.
                  </p>
                  <p>
                    This service promotes a savings culture by providing safety, instant accessibility upon maturity, and easy management of funds via mobile. It is designed to help users build financial security with simplicity and confidence.
                  </p>
                </div>
              </div>

              <div className="em-about-border-box1 pt-1 wow fadeInLeft" data-wow-delay=".5">
                <div className="row em-border">
                  {/* <div className="col-md-6 col-lg-6">
                    <div className="em-about-icon-box">
                      <div className="em-about-icon">
                        <Image 
                          src="/assets/images/icon.png" 
                          alt="Moneyback Guarantee icon"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="em-about-title">
                        <h3>Moneyback Guarantee</h3>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-12 col-lg-12">
                    <div className="em-about-icon-box1 wow fadeInDown" data-wow-delay=".6">
                      <div className="em-about-icon">
                        <Image 
                          src="/assets/images/icon1.png" 
                          alt="24/7 Support icon"
                          width={138}
                          height={52} 
                          style={{ width: "100%", height: "auto" }} 
                        />
                      </div>
                      <div className="em-about-title">
                        <h3>Support <br />24/7</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row wow fadeInRight" data-wow-delay=".7">
                <div className="col-md-6 col-lg-12">
                  <div className="section_button2 mt-40">
                    <div className="abou-button1">
                      {/* <Link 
                        href="/contactus" 
                        className="btn btn-primary"
                        legacyBehavior
                      >
                        <a>
                          Contact Us
                          <i className="bi bi-arrow-right" aria-hidden="true" />
                        </a>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="em-about-shape">
            <div className="shape-thumb">
              <Image 
                src="/assets/images/shape-ab.png" 
                alt="Decorative shape"
                width={210}
                height={210} 
                style={{ width: "100%", height: "auto" }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="service-section" style={{ background: "#ffff" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section_title mb-55 white text_center"
                data-cue="slideInRight"
              >
                <div className="section_main_title">
                  <h1 style={{ color: "#1f2f5e" }}>
                    Save securely with <span style={{ color: "#1f2f5e" }}> Keydso</span>
                  </h1>
                  <p style={{ color: "#1f2f5e" }}>
                    Choose flexible saving plans from 1 month to 1 year and watch your savings grow safely with Edahab Money.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {[{
              icon: <FaCalendarAlt size="3.5rem" color="#1f2f5e" />,
              title: "Save For 1 Month",
              desc: "Start your savings journey with a simple and flexible 1-month plan.",
            }, {
              icon: <FaCoins size="3.5rem" color="#1f2f5e" />,
              title: "Save For 3 Months",
              desc: "Grow your funds steadily with our 3-month savings plan.",
            }, {
              icon: <FaWallet size="3.5rem" color="#1f2f5e" />,
              title: "Save For 6 Months",
              desc: "Enjoy better returns by saving for half a year securely.",
            }, {
              icon: <FaCalendarAlt size="3.5rem" color="#1f2f5e" />,
              title: "Save For 1 Year",
              desc: "Maximize your savings safely with a 1-year commitment.",
            }].map(({icon, title, desc}, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="service-single-box upper5" data-cue="zoomIn" style={{ textAlign: "center" }}>
                  <div className="service-icon1">{icon}</div>
                  <div className="service-content">
                    <h2 style={{ color: "#1f2f5e" }}>{title}</h2>
                    <p style={{ color: "#1f2f5e" }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ maxWidth: '1100px', margin: '0 auto 5rem', padding: '0 1.5rem' }}>
        <h2
          style={{
            fontSize: '2rem',
            color: '#1f2f5e',
            marginBottom: '1.7rem',
            textAlign: 'center',
          }}
        >
          Frequently Asked Questions
        </h2>
        {faqItems.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ marginBottom: '1.6rem', borderBottom: '1px solid #d6edd5', paddingBottom: '1rem' }}>
              <button
                onClick={() => toggleFAQ(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-section-${i}`}
                id={`faq-question-${i}`}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontSize: '1.15rem',
                  color: '#1f2f5e',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '0.3rem 0',
                }}
              >
                <span>{question}</span>
                <span style={{ fontSize: '1.5rem' }}>{isOpen ? '−' : '+'}</span>
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
  )
}