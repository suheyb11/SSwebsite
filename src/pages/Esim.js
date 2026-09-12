import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js optimized Image component

export default function Esim() {
  const params = {
    title: 'eSIM Activation',
    href: '/esim',
    menu: 'Personal Services',
    name: 'eSIM Services',
  };

  const faqItems = [
    {
      question: "How do I activate eSIM on my device?",
      answer:
        "You can activate eSIM by scanning a QR code provided by your mobile operator or by entering the activation details manually in your device's mobile network settings.",
    },
    {
      question: "Can I have multiple eSIMs on one device?",
      answer:
        "Yes, many devices support multiple eSIM profiles, allowing you to switch between different plans or operators without swapping physical SIMs.",
    },
    {
      question: "What if I lose my phone with an active eSIM?",
      answer:
        "If your device is lost or stolen, contact your operator immediately to deactivate the eSIM. Unlike a physical SIM, eSIM cannot be removed, but it can be remotely disabled for security.",
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
        id="Esim"
        style={{ backgroundImage: "url(assets/images/slider/eSIM1.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breatcome_title">
                <div className="breatcome_title_inner pb-2">
                  <h2 style={{ color: "#1f2f5e" }}>eSIM Services</h2>
                </div>
                <div className="breatcome_content">
                  <ul>
                    <li>
                      <Link href="/" style={{ color: "#1f2f5e" }}>
                        Home
                      </Link>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }} />{" "}
                      <a href="/personal" style={{ color: "#1f2f5e" }}>
                        Personal
                      </a>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }} />{" "}
                      <span style={{ color: "#1f2f5e" }}>eSIM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area style-five" style={{ background: "#ffffffff" }}>
        <div className="container" >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section_title mb-55 white text_center"
                data-cue="slideInRight"
              >
                <div className="section_main_title">
                  <h1 style={{ color: "#1f2f5e" }}>
                    Activate and Manage Your <span style={{ color: "#1f2f5e" }}>eSIM</span>
                  </h1>
                  <p style={{ color: "#1f2f5e" }}>
                    Experience the convenience of eSIM technology: no physical SIM needed, multiple profiles supported, and enhanced security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row" >
            <div className="col-lg-6 col-md-6">
              <div className="single_about_thumb wow fadeInDown" data-wow-delay=".3">
                <div className="single_about_thumb_inner">
                  <Image
                    src="/assets/images/eSIM1.png"
                    alt="eSIM Device Activation"
                    width={551}
                    height={500} style={{ width: "100%", height: "auto" }} 
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="section_content_text upper">
                <p>
                  eSIM (embedded SIM) lets you activate mobile plans without the need for a physical SIM card. Easily switch operators or plans by adding or removing eSIM profiles on your compatible device.
                </p>
                <p>
                  If your device is lost or stolen, your operator can remotely disable your eSIM for your security. With eSIM, enjoy flexibility, security, and a streamlined mobile experience.
                </p><div className="em-about-border-box1 pt-1 wow fadeInLeft" data-wow-delay=".5">
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
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                        <div className="em-about-title">
                                                            <h3>Support <br />24/7</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
              </div>
            </div> 
          </div></div></div>
 
	<div className="feature_area pb-30">
		<div className="container">
			<div className="row nagative_margin ">
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-6">
					<div className="feature_style_four mb-30" style={{ background: "#FED900" }}>
						<div className="feature_style_four_icon mb-20">
							<div className="icon">
								<i className="flaticon-global"></i>
							</div>
						</div>
						<div className="feature_style_four_title">
							<h4 style={{ color: "#1f2f5e" }}>Flexibility</h4>
						</div>
						<div className="feature_style_four_text pt-15">
							<p style={{ color: "#1f2f5e" }}>Manage multiple profiles on one device to easily switch networks and plans.</p>
						</div>
						<div className="feature_style_four_button">
							<a href="#" style={{ color: "#1f2f5e" }}>Read More<i className="fa fa-long-arrow-right"></i></a>
						</div>
					</div>	
				</div>
				<div className="col-lg-4 col-md-6 col-sm-12 col-xs-6">
					<div className="feature_style_four mb-30">
						<div className="feature_style_four_icon mb-20">
							<div className="icon">
								<i className="flaticon-code"></i>
							</div>
						</div>
						<div className="feature_style_four_title">
							<h4>Convenience</h4>
						</div>
						<div className="feature_style_four_text pt-15">
							<p>Activate plans remotely without needing a physical SIM card or visits to stores.</p>
						</div>
						<div className="feature_style_four_button">
							<a href="#">Read More<i className="fa fa-long-arrow-right"></i></a>
						</div>
					</div>	
				</div>
				<div className="col-lg-4 col-md-6 col-sm-12 col-xs-6">
					<div className="feature_style_four active mb-30">
						<div className="feature_style_four_icon mb-20">
							<div className="icon">
								<i className="flaticon-data"></i>
							</div>
						</div>
						<div className="feature_style_four_title">
							<h4>Security</h4>
						</div>
						<div className="feature_style_four_text pt-15">
							<p>eSIMs are embedded and cannot be physically removed, protecting against SIM swapping fraud.</p>
						</div>
						<div className="feature_style_four_button">
							<a href="#">Read More<i className="fa fa-long-arrow-right"></i></a>
						</div>
					</div>	
				</div>
				
			</div>
		</div>	
	</div>
          {/* eSIM Troubleshooting Section */}
          <div className="about_area pb-100" style={{ background: "#ffffffff" }}>
            <div className="container">
              <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <Image src="/assets/images/prepaidphoto.png" alt="eSIM Troubleshooting" width={551} height={501} style={{ width: "100%", height: "auto" }}  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="section_title text_left mb-40">
                    <div className="section_sub_title uppercase mb-3">
                      <h6>{'// TROUBLESHOOTING'}</h6>
                    </div>
                    <div className="section_main_title">
                      <h1>Common eSIM Issues</h1>
                    </div>
                    <div className="em_bar">
                      <div className="em_bar_bg"></div>
                    </div>
                    <div className="section_content_text pt-4">
                      <p><strong>Issue:</strong> Unable to scan QR code.</p>
                      <p><strong>Solution:</strong> Ensure your device camera permissions are enabled and the QR code is clear and properly formatted.</p>
                      <p><strong>Issue:</strong> eSIM profile not activating.</p>
                      <p><strong>Solution:</strong> Double-check activation details and ensure your device supports eSIM technology and is updated to the latest software.</p>
                    </div>
                  </div>
                </div>
            
              </div>
            </div>
          </div>

          {/* Additional FAQ Items */}
         

          <section style={{ maxWidth: "900px", margin: "0 auto 5rem", padding: "0 1.5rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "#1f2f5e",
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