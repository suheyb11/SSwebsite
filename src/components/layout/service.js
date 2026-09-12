
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js optimized Image component

export default function Service() {
    return (
        <>
            {/*--- Start Techno Service Area ---*/}
           <div className="about_area style-five" style={{ background: "#ffffffff" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="single_about_thumb wow " data-wow-delay=".3">
                                <div className="single_about_thumb_inner">
  <Image 
                                        src="/assets/images/Website branding - Map-01.png"
                                        alt="Somtel Telecommunication Network"
                                        width={600}
                                        height={400}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="em-about-shape-thumb">
                                    <div className="em-about-thmub-inner2">
                                        <Image 
                                            src="/assets/images/about-sp.png" 
                                            alt="Somtel shape"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="section_title style-two mb-30 mt-3 wow " data-wow-delay=".4">
                                <div className="section_main_title">
                                    <h1>SOMTEL - SOMALIA</h1>
                                    <h1>TELECOMMUNICATION NETWORK</h1>
                                </div>
                                <div className="section_content_text upper">
                                    <p>
                                        Somtel is a leading telecommunications and technology provider with the widest network coverage in the Somali region. Headquarters in Mogadishu and driven by our core values, we are building a bold new digital future for our customers. Serving 78% of telecom users across South Central Somalia, Somaliland, and Puntland, we operate in one of the region’s fastest-growing mobile telecommunications markets.
                                    </p>
                                </div>
                            </div>
                            <div className="em-about-border-box1 pt-1 wow " data-wow-delay=".5">
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
                                        <div className="em-about-icon-box1 wow " data-wow-delay=".6">
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
                            <div className="row wow " data-wow-delay=".7">
                                <div className="col-md-6 col-lg-12">
                                    <div className="section_button2 mt-40">
                                        <div className="abou-button1">
                                            <Link 
                                                href="/contactus" 
                                                className="btn btn-primary"
                                                legacyBehavior
                                            >
                                                <a>
                                                    Contact Us
                                                    <i className="bi bi-arrow-right" aria-hidden="true" />
                                                </a>
                                            </Link>
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
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*--- End Techno Service Area ---*/}
        </>
    )
}