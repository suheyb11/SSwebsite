import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Script from "next/script";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaCheckCircle, FaMobileAlt, FaEnvelopeOpenText } from 'react-icons/fa';

export default function EDahab() {
  const faqItems = [
  {
    question: 'How to register for Edahab?',
    answer: 'Dial *770# from your mobile and follow the instructions.',
  },
  {
    question: 'How does Edahab money work?',
    answer: `Checking Your Balance:
- Step 1: Dial *111#
- Step 2: Select number 1 for Dollar
- Step 3: Select 1 to view your balance
- Step 4: Enter your 4-digit PIN

Shortcut to check balance:
Dial *110*YourPIN#

How to Send Money:
- Step 1: Dial *111#
- Step 2: Select number 1 for Dollar
- Step 3: Select 2 to send money
- Step 4: Select 1 to send money to an individual
- Step 5: Select 1 to send money to a number
- Step 6: Enter the recipient's number
- Step 7: Enter your 4-digit PIN

Shortcut to transfer money:
Dial *110*recipient's number*$# then enter your 4-digit PIN.

Change Your E-dahab Account PIN:
- Step 1: Dial *111# and select number 1 for Dollar
- Step 2: Select 1 for your account
- Step 3: Select 3 to change your PIN
- Step 4: Enter your new PIN again for verification

Change Language:
- Step 1: Dial *111# and select 1 for Dollar
- Step 2: Select 1 for your account
- Step 3: Select 4 to change your language
- Step 4: Choose your preferred language (e.g., Somali/English)`,
  },
  {
    question: 'Can I send Edahab internationally?',
    answer:
      'Yes, E-dahab supports international transfers to selected countries and partner money services using the Dahab Plus app.',
  },
  {
    question: 'How secure is Edahab?',
    answer:
      'Your transactions are protected with PIN codes, encryption, and SMS confirmations to ensure safety.',
  },
];
    
     const [openIndex, setOpenIndex] = useState(null);


   const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};
     return (
      <Layout>
       
  <div
    className=" breatcome_area3 d-flex align-items-center"
    style={{ backgroundImage: "url(assets/images/slider/edhb1.jpg)" }}
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
              <h1 style={{ color: "#fff" }}>eDahab Mobile Money - avaliable
nationwide, making it easy to send and
receive money any were</h1>
              {/* <h1 style={{ color: "#fff" }}>and accessible package of mobile banking features</h1>
              <h1 style={{ color: "#fff" }}>video for about our company</h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*==================================================*/}
  {/*--- End Techno Call Do Action Area ---*/}
  {/*==================================================*/}
  {/*==================================================*/}
  {/*--- Start Techno Flipbox Area ---*/}
  {/*==================================================*/}
 <div className="flipbox_area pb-70">
  <div className="container">
    <div className="row nagative_margin">
      {/* 24/7 Customer Support */}
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-6">
        <div className="flip-box">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <div className="flipbox-icon">
                <div className="icon">
                  <i className="flaticon-global" />
                </div>
              </div>
              <div className="flip-box-content">
                <h2>24/7 Customer Support</h2>
                <p>
                  E-Dahab from Somtel provides 24/7 support to help you with 
                  transactions, payments, and account services anytime.
                </p>
              </div>
            </div>
            <div className="flip-box-back">
              <div className="flip-box-back-content">
                <h2>24/7 Customer Support</h2>
                <p>
                  Get assistance anytime through our dedicated customer service 
                  for your E-Dahab account and mobile money needs.
                </p>
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secure Transactions */}
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-6">
        <div className="flip-box">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <div className="flipbox-icon">
                <div className="icon">
                  <i className="flaticon-developer" />
                </div>
              </div>
              <div className="flip-box-content">
                <h2>Secure Transactions</h2>
                <p>
                  With E-Dahab, your payments and transfers are protected 
                  using Somtel&apos;s trusted and secure system.
                </p>
              </div>
            </div>
            <div className="flip-box-back">
              <div className="flip-box-back-content">
                <h2>Secure Transactions</h2>
                <p>
                  Enjoy fast and safe money transfers, bill payments, and 
                  top-up services with full data protection.
                </p>
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Convenient Services */}
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-6">
        <div className="flip-box">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <div className="flipbox-icon">
                <div className="icon">
                  <i className="flaticon-process" />
                </div>
              </div>
              <div className="flip-box-content">
                <h2>Convenient Services</h2>
                <p>
                  Pay bills, recharge airtime, send and receive money easily 
                  with E-Dahab anywhere in Somalia.
                </p>
              </div>
            </div>
            <div className="flip-box-back">
              <div className="flip-box-back-content">
                <h2>Convenient Services</h2>
                <p>
                  Simplify your daily life with E-Dahab&apos;s wide range of services 
                  directly from your mobile phone.
                </p>
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

 <section className="key-services section  pt-1020 pb-60">
  <div className="container">
    <div className="row align-items-center">
      {/* Left Content */}
      <div className="col-lg-6">
        <div className="section_title mb-30">
          <h1>Key Services</h1>
          <h4>Core Services <br /> Send and receive money</h4>
          <p>
            eDahab empowers individuals and businesses by making money transfers
            simple, fast, and secure. Customers can deposit cash at local
            agents, send funds to family and friends across the country and
            beyond, and enjoy reliable access to innovative financial services.
          </p>
        </div>

        <div className="row">
          {[
            {
              id: "01",
              title: "Domestic Transfers",
              desc: "Send money in real time to any eDahab customer with an account in the same country.",
              icon: "bi bi-house",
            },
            {
              id: "02",
              title: "International Transfers",
              desc: "Receive and send money across borders instantly via Dahabshiil remittance and partners.",
              icon: "bi bi-globe",
            },
            {
              id: "03",
              title: "Savings",
              desc: "Access safe, Sharia-compliant savings products like KAYDSO for individuals and groups.",
              icon: "bi bi-piggy-bank",
            },
            {
              id: "04",
              title: "Bank Transfer",
              desc: "Easily move money between eDahab wallets and Dahabshiil bank accounts securely.",
              icon: "bi bi-bank",
            },
          ].map((service) => (
            <div key={service.id} className="col-md-6 mb-4">
              <div className="service-box d-flex align-items-start">
                <div className="service-number">
                  <span>{service.id}</span>
                </div>
                <div className="service-content ms-3">
                  <h3>
                    <i className={service.icon}></i> {service.title}
                  </h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Image */}
      <div className="col-lg-6 text-center">
        <Image
          src="/assets/images/facilityone.png"
          alt="eDahab App"
          width={2375}
          height={2710} style={{ width: "100%", height: "auto" }} 
          className="img-fluid rounded"
        />
      </div>
    </div>
  </div>
</section>


<div className="call-do-action style-two pt-120 pb-80">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6">
        <div className="call-do-action-content">
          <div className="call-do-thumb-box">
            <div className="call-do-thumb4 rotateme">
              <Image src="/assets/images/box-2.png" alt="Decoration" width={86} height={74} />
            </div>
          </div>
        </div>
        <div
          className="section_title style-two mt-3 wow fadeInRight"
          data-wow-delay=".4"
        >
          <div className="section_sub_title">
            <h5>Call Us Today</h5>
          </div>
          <div className="section_main_title">
            {/* <h1>Sounds Like Techno Might</h1>
            <h1>
              Be The Right Choice For <br />
              Your Business?
            </h1> */}
          </div>
          <div className="section_content_text">
            <p>Check Ranking Reports Via Our Web App. Contact Us Today!</p>
          </div>
          <div className="call-do-icon">
            <i className="fa fa-volume-control-phone" />
            <span>+252 (062) 466-6666</span>
          </div>
          <div className="call-button wow fadeInUp" data-wow-delay=".5">
            <a href="#">
              {" "}
              Contact Us <i className="bi bi-arrow-right" />{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 wow fadeInDown" data-wow-delay=".5">
        <div className="call-do-main-thumb bounce-animate3 pl-70">
          <Image src="/assets/images/call-do-main.png" alt="Customer service" width={469} height={521}  style={{ width: "100%", height: "auto" }} />
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
          <Image src="/assets/images/brd-circle.png" alt="Circle decoration" width={100} height={100} />
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