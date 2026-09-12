import React from 'react';
import Script from "next/script";
import Link from 'next/link';
import Image from 'next/image';
import { BiMap ,BiPhone } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const CurrentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer-middle style-four upper pt-130">
        <div className="container">
          <div className="row">

            <div className="col-lg-3 col-md-6">
              <div className="widget widgets-company-info wow fadeInLeft" data-wow-delay=".4">
                <div className="footer-bottom-logo pb-30">
                  <Image src="/assets/images/2.png" alt="Somtel Somalia Logo" width={150} height={60} />
                </div>
                <div className="company-info-desc">
                  <p>
                    We believe in upholding high standards of service and corporate social responsibilities guided by the values of
                  </p>
                </div>
                <div className="follow-company-info pt-2">
                  <div className="follow-company-text mr-3">
                    <a href="#"><p>Follow Us</p></a>
                  </div>
                  <div className="follow-company-icon">
                    <a className="social-icon-color" href="https://www.facebook.com/SomtelSomalia" target='_blank' rel="noopener noreferrer">
                      <i className="fa fa-facebook" />
                    </a>
                    <a className="social-icon-color2" href="https://www.instagram.com/somtelsomalia.so/">
                      <i className="fa fa-instagram" />
                    </a>
                    <a className="social-icon-color1" href="https://x.com/somtel_so">
                      <i className="fa fa-twitter" />
                    </a>
                    <a className="social-icon-color3" href="https://www.youtube.com/@somtelsomalia">
                      <i className="fa fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="widget widget-nav-menu wow fadeInDown" data-wow-delay=".5">
                <h4 className="widget-title pb-30">Self Services</h4>
                <div className="menu-quick-link-container ml-4">
                  <ul id="menu-quick-link" className="menu">
                    <li><Link href="/Prepaid">Prepaid</Link></li>
                    <li><Link href="/Dhameys">Dhameys Plus</Link></li>
                    <li><Link href="/kaafiye">Kaafiye Plus</Link></li>
                    <li><Link href="/Muraadso">Muraadso</Link></li>
                    <li><Link href="/eDahab">eDahab</Link></li>
                    <li><Link href="/Keydso">Keydso</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="widget widget-nav-menu wow fadeInDown" data-wow-delay=".5">
                <h4 className="widget-title pb-30">Corporate Services</h4>
                <div className="menu-quick-link-container ml-4">
                  <ul id="menu-quick-link" className="menu">
                    <li><Link href="/fiberoptic">FTTX / FTTA</Link></li>
                    <li><Link href="/Dhameys">USSD</Link></li>
                    <li><Link href="/SMS">SMS</Link></li>
                    <li><Link href="/Ivr">IVR</Link></li>
                    <li><Link href="/Roaming">Roaming</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6">
              <div className="widget widgets-company-info wow fadeInRight" data-wow-delay=".7">
                <h3 className="widget-title pb-30">Contact Info</h3>

                <div className="company-info-desc">
                  <div className="company-icon">
                    <a href="#"><BiMap  size={24} /></a>
                  </div>
                  <div className="company-info-title">
                    <h6>Location</h6>
                    <p>Howlwadag St. Bakaro Market, Somalia</p>
                  </div>
                </div>

                <div className="company-info-desc">
                  <div className="company-icon">
                    <a href="mailto:info.ss@somtelnetwork.net"><MdEmail size={24} /></a>
                  </div>
                  <div className="company-info-title">
                    <h6>Email Us</h6>
                    <p>info.ss@somtelnetwork.net</p>
                  </div>
                </div>

                <div className="company-info-desc">
                  <div className="company-icon">
                    <a href="tel:+252624666666"><BiPhone size={24} /></a>
                  </div>
                  <div className="company-info-title">
                    <h6>Phone | Mobile </h6>
                    <p>+252-624-666-666 | 151 | 152 | 215000</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row footer-bottom mt-90 pt-3 pb-1">
            <div className="col-lg-6 col-md-6">
              <div className="footer-bottom-content wow fadeInLeft" data-wow-delay=".8">
                <div className="footer-bottom-content-copy">
                  <p>© {CurrentYear} @SomtelSomalia. All Rights Reserved.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="footer-bottom-right wow fadeInRight" data-wow-delay=".9">
                <div className="footer-bottom-right-text">
                  <a className="absod" href="#">Privacy Policy</a>
                  <a href="#"> Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Script type="text/javascript" src="/assets/js/vendor/modernizr-3.5.0.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/vendor/jquery-3.2.1.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/bootstrap.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/owl.carousel.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/jquery.counterup.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/waypoints.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/wow.js"></Script>
      <Script type="text/javascript" src="/assets/js/imagesloaded.pkgd.min.js"></Script>
      <Script type="text/javascript" src="/venobox/venobox.js"></Script>
      <Script type="text/javascript" src="/assets/js/ajax-mail.js"></Script>
      <Script type="text/javascript" src="/assets/js/testimonial.js"></Script>
      <Script type="text/javascript" src="/assets/js/animated-text.js"></Script>
      <Script type="text/javascript" src="/venobox/venobox.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/isotope.pkgd.min.js"></Script>
      <Script type="text/javascript" src="/assets/js/jquery.nivo.slider.pack.js"></Script>
      <Script type="text/javascript" src="/assets/js/jquery.meanmenu.js"></Script>
      <Script type="text/javascript" src="/assets/js/jquery.scrollUp.js"></Script>
      <Script type="text/javascript" src="/assets/js/theme.js"></Script>
      <script src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" defer></script>
      <script src="https://files.bpcontent.cloud/2024/10/09/10/20241009101115-C3YKY3EM.js" defer></script>
    </>
  );
}