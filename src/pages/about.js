import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import $ from 'jquery';

// @ts-ignore: Owl Carousel expects global jQuery
if (typeof window !== 'undefined') {
  window.$ = $;
  window.jQuery = $;
  require('owl.carousel');
}

export default function About() {
  const pathname = usePathname();

  useEffect(() => {
    const initSlider = () => {
      const $slider = $('.brand_list');

      if ($slider.length && !$slider.hasClass('owl-loaded')) {
        $slider.owlCarousel({
          items: 3,
          nav: false,
          rewind: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplaySpeed: 500,
          dots: true,
          loop: true,
        });
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      initSlider();
    }, 100); // Small delay ensures DOM is mounted

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Layout>
      <div className="breatcome_area d-flex align-items-center" id="about"
        style={{ backgroundImage: "url(/assets/images/slider/dageq.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breatcome_title">
                <div className="breatcome_title_inner pb-2">
                  <h2 style={{ color: "#1f2f5e" }}>Who we are</h2>
                </div>
                <div className="breatcome_content">
                  <ul>
                    <li>
                      <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }} /> <Link href="/about" style={{ color: "#1f2f5e" }}>About</Link>{" "}
                      <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }} />{" "}
                      <span style={{ color: "#1f2f5e" }}>Who we are</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-area pt-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section_title text_center mb-60 mt-3 wow fadeInDown"
                data-wow-delay=".4"
              >
                <div className="section_main_title upper pb-15">
                  <h1>
                    ABOUT  <span> US </span>
                  </h1>
                  <p>
                    Somtel is a leading Telecom and technology service provider with the widest network coverage in the Somali region. From our headquarters in Hargeisa and guided by our values, we are delivering an ambitious, new digital world to our 78% of telecom customers across Somaliland, Somalia and Puntland - one of the region&apos;s fastest growing for mobile telecommunications.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div
                className="em-feature-single-box wow fadeInLeft"
                data-wow-delay=".5"
              >
                <div className="feature-single-box-inner">
                  <div className="em-feature-title">
                    <h2>Our Vision</h2>
                    <p>
                      To be the leading telecommunications
                      solution <br />provider in East Africa and beyond.<br /><br /><br />
                    </p>
                  </div>
                  <div className="em-feature-button">
                    <a href="#">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div
                className="em-feature-single-box wow fadeInRight"
                data-wow-delay=".4"
              >
                <div className="feature-single-box-inner1">
                  <div className="em-feature-title">
                    <h2>Our Mission</h2>
                    <p>
                      Enhance lives with outstanding<br />
                      products and services, and be a<br />
                      trusted partner by delivering<br />
                      innovative mobile communication<br />              
                    </p>
                  </div>
                  <div className="em-feature-button">
                    <a href="#">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area pt-85 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
              <div className="about_thumb">
                <Image 
                  src="/assets/images/aaa.jpg" 
                  alt="About Somtel" 
                  width={570} 
                  height={650}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
              <div className="section_title text_left mb-40 mt-3">
                <div className="section_sub_title uppercase mb-3">
                  <h6>12 YEARS OF EXPERIENCE</h6>
                </div>
                <div className="section_main_title">
                  <h1>Who we are </h1>
                  <h1>
                    Somtel is a leading <span>Telecom.</span>
                  </h1>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg" />
                </div>
                <div className="section_content_text bold pt-5">
                  <p>
                    Somtel is a leading Telecom and technology
                    service provider with the widest network
                    coverage in the Somali region.
                  </p>
                </div>
              </div>
              <div className="singel_about_left mb-30">
                <div className="singel_about_left_inner mb-3">
                  <div className="singel-about-content boder pl-4">
                    <p>
                      Somtel, a prominent telecommunications company operating in Somaliland,
                      Puntland, and South Somalia, is a subsidiary of the Dahabshiil Group. The
                      Dahabshiil Group&apos;s diverse portfolio, which includes telecommunications,
                      remittance services, oil, real estate, and banking, provides Somtel with
                      substantial expertise and resources. 
                    </p>
                    <p>
                      Internationally registered, Somtel adheres to
                      global standards and is committed to delivering high-quality services. The
                      company has developed a robust infrastructure, deploying and maintaining
                      advanced integrated networks throughout the region. This infrastructure
                      encompasses a range of technologies including GSM, UMTS, 4G/5G/LTE, WIFI,
                      and Mobile Money, ensuring comprehensive and reliable connectivity for its
                      customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="choose_us bg_color2" style={{ background: "#ffff" }}>
        <div className="container">
          <div className="row d-flex align-items-center pd_gap nagative_mb">
            <div className="col-lg-6">
              <div className="about_skill_thumb ml-2 mr-4">
                <Image 
                  src="/assets/images/galery/8.PNG" 
                  alt="Why Choose Us" 
                  width={600} 
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section_title text_left mb-5">
                <div className="section_sub_title uppercase mb-3">
                  <h6>WHY CHOOSE Us</h6>
                </div>
                <div className="section_main_title">
                  <h1>We Deal With The Aspects</h1>
                  <h1>
                    Professional <span>Telecomnication Services</span>
                  </h1>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg" />
                </div>
                <div className="section_content_text pt-4">
                  <p>
                    We&apos;re investing in our people, our communities, our networks, and a sustainable future. Our focus is on creating better more connected future for Somalia.
                  </p>
                </div>
              </div>
              <div className="choose_us_content pb-1">
                <div className="choose_icon_lft mt-1 mr-4">
                  <i className="fa fa-cog" />
                </div>
                <div className="choose_content_title_lft pb-2">
                  <h5>Telecommunication Expertise</h5>
                </div>
                <div className="choose_content_text_lft">
                  <p>
                    Our firm excels in delivering seamless and efficient telecommunication
                    solutions, ensuring that user interactions are dynamic and engaging.
                  </p>
                </div>
              </div>
              <div className="choose_us_content pb-1">
                <div className="choose_icon_lft mt-1 mr-4">
                  <i className="fa fa-database" />
                </div>
                <div className="choose_content_title_lft pb-2">
                  <h5>Network Optimization</h5>
                </div>
                <div className="choose_content_text_lft">
                  <p>
                    We specialize in optimizing network performance to provide reliable and high-speed connectivity, enhancing the overall user experience.
                  </p>
                </div>
              </div>
              <div className="choose_us_content pb-1">
                <div className="choose_icon_lft mt-1 mr-4">
                  <i className="fa fa-stack-exchange" />
                </div>
                <div className="choose_content_title_lft pb-2">
                  <h5>Innovative Solutions</h5>
                </div>
                <div className="choose_content_text_lft">
                  <p>
                    We are dedicated to developing innovative telecommunication solutions that meet the evolving needs of our customers and drive growth in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="call_do_action  pt-280 pb-70 "
        style={{ backgroundImage: "url(/assets/images/slider/ss3.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="section_title white text_left mb-60 mt-3">
                <div className="phone_number mb-3">
                  <h5 style={{ color: "#1f2f5e" }}>+252 624 666 666</h5>
                </div>
                <div className="section_main_title">
                  <h1>To make requests for the</h1>
                  <h1>further information</h1>
                </div>
                <div className="button three mt-40">
                  <a href="#">
                    Join With Now
                    <i className="fa fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area style-five upper" style={{ background: "#ffffffff" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="single_about_thumb wow fadeInDown" data-wow-delay=".3">
                <div className="single_about_thumb_inner">
                  <Image 
                    src="/assets/images/value.jpg" 
                    alt="Core Values" 
                    width={631} 
                    height={509}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div
                className="section_title style-two mt-3 wow fadeInRight"
                data-wow-delay=".4"
              >
                <div className="section_sub_title">
                  <h5>Somtel-Somalia</h5>
                </div>
                <div className="section_main_title">
                  <h1>Core Values And</h1>
                  <h1>Principles</h1>
                </div>
                <div className="section_content_text">
                  <p>
                    We believe in upholding high standards of service and corporate
                    social responsibilities guided by the company&apos;s core values of:
                  </p>
                </div>
              </div>
              <div
                className="em-about-border-box1 wow fadeInLeft"
                data-wow-delay=".5"
              >
                <div className="row em-border">
                  <div className="col-md-6 col-lg-6">
                    <div className="em-about-icon-box2">
                      <div className="em-about-icon">
                        <span>
                          <i className="bi bi-check-lg" />
                          <h6>Dedication</h6>
                        </span>
                      </div>
                      <div className="em-about-icon">
                        <span>
                          <i className="bi bi-check-lg" />
                          <h6>Excellence</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="em-about-icon-box2">
                      <div className="em-about-icon">
                        <span>
                          <i className="bi bi-check-lg" />
                          <h6>Innovation</h6>
                        </span>
                      </div>
                      <div className="em-about-icon">
                        <span>
                          <i className="bi bi-check-lg" />
                          <h6>Fairness</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="em-about-icon-box2">
                      <div className="em-about-icon">
                        <span>
                          <i className="bi bi-check-lg" />
                          <h6>Trust</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-special-button">
                <div className="about-button-text">
                  <p>Do you need any Support?</p>
                </div>
                <div className="about-button2">
                  <Link href="/contactus">
                    Contact us <i className="bi bi-arrow-right" />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="em-about-shape">
            <div className="shape-thumb">
              <Image 
                src="/assets/images/shape-ab.png" 
                alt="Shape" 
                width={210} 
                height={210}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="brand_area pb-40" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title text_center mb-50 mt-3">
                <div className="section_main_title">
                  <h1>
                    Our affiliated&nbsp;<span>organisations</span>
                  </h1>
                  <p>
                    We are committed to supporting the social and economic development of Somalia, so we&apos;ve invested in key sectors to rebuild.
                  </p>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
              <div className="row">
                <div className="brand_list owl-carousel curosel-style" >
                  <div className="col-lg-12">
                    <div className="single_brand">
                      <div className="single_brand_thumb">
                        <Image 
                          src="/assets/images/brand/bluecom.png" 
                          alt="Bluecom" 
                          width={150} 
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="single_brand">
                      <div className="single_brand_thumb">
                        <Image 
                          src="/assets/images/brand/bluesky.png" 
                          alt="Bluesky" 
                          width={150} 
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="single_brand">
                      <div className="single_brand_thumb">
                        <Image 
                          src="/assets/images/brand/huwei.png" 
                          alt="Huawei" 
                          width={150} 
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="single_brand">
                      <div className="single_brand_thumb">
                        <Image 
                          src="/assets/images/brand/dbi.png" 
                          alt="DBI" 
                          width={150} 
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="single_brand">
                      <div className="single_brand_thumb">
                        <Image 
                          src="/assets/images/brand/dmt.png" 
                          alt="DMT" 
                          width={150} 
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="single_brand">
                      <div className="single_brand_thumb">
                        <Image 
                          src="/assets/images/brand/edahab.png" 
                          alt="Edahab" 
                          width={150} 
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}