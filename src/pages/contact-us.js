import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout'
import Link from 'next/link';

export default function Contactus() {
    return (
        <>
            <Head>
                <title>Contact Us | Somtel Somalia</title>
                <meta name="description" content="Get in touch with Somtel Somalia for telecom services and support" />
            </Head>

             <Layout>
            {/* <Slider/> */}
    <div className="breatcome_area d-flex align-items-center" id="contactus">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breatcome_title">
          <div className="breatcome_title_inner pb-2">
            <h2>Contact Us</h2>
          </div>
          <div className="breatcome_content">
            <ul>
              <li>
                <Link href="/">Home</Link>{" "}
                <i className="fa fa-angle-right" /> <a href="/contactus"> Contact Us</a>{" "}
                <i className="fa fa-angle-right" />{" "}
                <span>Prepaid</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
            <div className="main_contact_area style_three pt-80 pb-90">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="section_title text_left mb-50 mt-3">
                                <div className="section_sub_title uppercase mb-3">
                                    <h6>Contact Info</h6>
                                </div>
                                <div className="section_main_title">
                                    <h1>Get in Touch</h1>
                                </div>
                                <div className="section_title_text pt-2">
                                    <p>
                                        Somtel is a leading Telecom and technology service provider with the widest network coverage in the Somali region.
                                    </p>
                                </div>
                                <div className="em_bar">
                                    <div className="em_bar_bg" />
                                </div>
                            </div>
                            <div className="contact_address">
                                <div className="contact_address_company mb-3">
                                    <ul>
                                        <li>
                                            <i className="fa fa-envelope-o" />
                                            <span>
                                                <a href="mailto:info.ss@somtelnetwork.net">info.ss@somtelnetwork.net</a>
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fa fa-mobile" />
                                            <span> +252-624-666-666 | 151 | 152 | 215000</span>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" />
                                            <span>Howlwadag St. Bakaro Market, Mogadishu-Somalia</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact_from">
                                <div className="contact_from_box">
                                    <div className="contact_title pb-4">
                                        <h3>Send Message</h3>
                                    </div>
                                    <form
                                        id="contact_form"
                                        action="https://formspree.io/f/myyleorq"
                                        method="POST"
                                    >
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form_box mb-30">
                                                    <input 
                                                        type="text" 
                                                        name="name" 
                                                        placeholder="Name" 
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form_box mb-30">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email Address"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form_box mb-30">
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        cols={30}
                                                        rows={10}
                                                        placeholder="Write a Message"
                                                        required
                                                    />
                                                </div>
                                                <div className="quote_btn">
                                                    <button className="btn" type="submit">
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="google_map_area">
                <div className="row-fluid">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="google_map_container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.2045916599662!2d45.31949027234596!3d2.0465180258709728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58423ff2f90acd%3A0x46ebf0de0d41bfcc!2s28W9%2BJMX%2C%20Mogadishu!5e0!3m2!1sen!2sso!4v1721034109877!5m2!1sen!2sso"
                                className="map"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>

          </Layout>
        </>
    );
}