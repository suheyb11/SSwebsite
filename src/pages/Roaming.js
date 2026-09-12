import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image';
import { FaSignal, FaGlobe, FaSms, FaLock, FaRocket } from "react-icons/fa";

const roamingBenefits = [
  { icon: <FaSignal color="#1f2f5e" size="3rem" />, label: "Fixed Transparent Pricing", desc: "Know exactly what you pay wherever you roam." },
  { icon: <FaGlobe color="#1f2f5e" size="3rem" />, label: "Global Coverage", desc: "Roam seamlessly in over 220 countries and territories." },
//   { icon: <FaSms color="#1f2f5e" size="3rem" />, label: "Real-Time SMS & Alerts", desc: "Stay informed with instant usage notifications." },
  { icon: <FaLock color="#1f2f5e" size="3rem" />, label: "Secure Connections", desc: "Advanced encryption to keep your data private on the go." },
  { icon: <FaRocket color="#1f2f5e" size="3rem" />, label: "5G Roaming Ready", desc: "Access ultra-fast roaming data on next-gen networks." },
];




export default function Roaming() {


const faqItems = [
  {
    question: 'What countries do roaming packages cover on Somtel?',
    answer:
      'Somtel\'s "International" Packages offer bundled international calling from Somalia to 14 countries: Australia, Canada, USA, Denmark, India, Netherlands, Norway, Sweden, Pakistan, South Africa, China, Germany, Malaysia, and Bangladesh. $1 of prepaid credit gives 20 minutes of international calls.',
  },
  {
    question: 'Why should I choose Somtel roaming instead of buying a local SIM abroad?',
    answer:
      'With Somtel roaming, you keep your same Somtel number, stay reachable by friends and family, avoid switching SIM cards or losing WhatsApp access, and save money with affordable roaming bundles compared to standard roaming charges.',
  },
  {
    question: 'How do I sign up for Somtel Roaming?',
    answer:
      'Activate roaming before you travel via USSD, the Somtel app, or customer care. Purchase a roaming bundle (voice or data) for lower rates. Upon arrival, enable Data Roaming on your device and connect to Somtel\'s partner network.',
  },
];


  
  const [openIndex, setOpenIndex] = useState(null);
  
  
     const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
<Layout>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(120deg, #1f2f5e 20%, #2e3d74ff 95%)',
          color: '#ffffffff',
          padding: '70px 0 50px',
          textAlign: 'center',
          position: 'relative',
        }} id='Roaming'
      >
        <h1
          style={{
            fontSize: '3rem',
            color: '#ffffffff',
            marginBottom: '20px',
            lineHeight: 1.1,
          }}
        >
          Stay Connected, Wherever You Go: <br /> Global Connection, Anytime, Anywhere.
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#ffffffff',
            lineHeight: '1.6',
            marginBottom: '30px',
          }}
        >
          Harness next-gen roaming technology covering more countries and destinations than ever.
          <br />
          Enjoy transparent pricing with no hidden fees.
        </p>
        <button
          style={{
            backgroundColor: '#fed900',
            color: '#1f2f5e',
            fontSize: '1.2rem',
            padding: '1em 3em',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(236, 235, 187, 0.7)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#fed900';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#fed900';
          }}
        >
          Activate Roaming 
        </button>
      </section>
	<div className="about_area pt-50 pb-70">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
					<div className="single_about_thumb mb-3">
						<div className="single_about_thumb_inner">
							<Image src="/assets/images/Roaming page 1.png" alt="Roaming page illustration"
  width={2296}
  height={2088}
  style={{ width: "100%", height: "auto" }} />
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
					<div className="section_title text_left mb-30">
						<div className="section_sub_title uppercase mb-3">
							{/* <h6>30 YEARS OF EXPERIENCE</h6> */}
						</div>
						<div className="section_main_title">
							{/* <h1></h1> */}
							<h1>Why Choose Our  <span>Roaming Service?</span></h1>
						</div>
						<div className="em_bar">
							<div className="em_bar_bg"></div>
						</div>
						<div className="section_content_text bold pt-4">
							<p>Stay connected wherever you travel with Somtel Roaming. We partner with hundreds of international operators to ensure seamless connectivity across the globe. With our roaming service, you can make calls, browse the internet, and use mobile money without interruption.</p>
						</div>
					</div>
					<div className="row home11">
						<div className="col-lg-6">
							<div className="singel_about_left">
								<div className="singel_about_left_inner">
									<div className="about_icon mr-2">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
									</div>
									<div className="singel-about-content">
										<p>Fixed Transparent Pricing</p>
									</div>
								</div>
								<div className="singel_about_left_inner">
									<div className="about_icon mr-2">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
									</div>
									<div className="singel-about-content">
										<p>Global Coverage</p>
									</div>
								</div>
								<div className="singel_about_left_inner">
									<div className="about_icon mr-2">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
									</div>
									<div className="singel-about-content">
										<p>Secure Connections</p>
									</div>
								</div>
								
							</div>
						</div>
						<div className="col-lg-6">
							<div className="singel_about_left">
								<div className="singel_about_left_inner">
									<div className="about_icon mr-2">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
									</div>
									<div className="singel-about-content">
										<p>5G Roaming Ready</p>
									</div>
								</div>
								{/* <div className="singel_about_left_inner">
									<div className="about_icon mr-2">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
									</div>
									<div className="singel-about-content">
										<p>Web & Email Hosting Services</p>
									</div>
								</div>
								<div className="singel_about_left_inner">
									<div className="about_icon mr-2">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
									</div>
									<div className="singel-about-content">
										<p>Artificial Intelligence Web App</p>
									</div>
								</div> */}
								
							</div>
						</div>
					</div>	
					<div className="singel_about_left_inner mt-4 pl-4">
						<div className="button two">
							<a href="#">More Details</a>
						</div>
					</div>
				</div>
				
			</div>
		</div>	
	</div>
   






      {/* FAQ */}
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


      </Layout>
  );
}