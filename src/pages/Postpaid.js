import Layout from '../components/layout/Layout'
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaPhoneAlt,
  FaGlobe,
  FaSimCard,
  FaShieldAlt,
  FaStar,
  FaMobileAlt,
} from 'react-icons/fa';

export default function TelecomServicePage() {
  const plans = [
    {
      name: 'Basic Plan',
      description:
        'Affordable and flexible for light users with all essential benefits.',
      features: [
        { icon: <FaPhoneAlt color="#1f2f5e" />, label: 'Local calls: $0.10/min' },
        { icon: <FaGlobe color="#1f2f5e" />, label: 'International calls: $0.50/min' },
        { icon: <FaSimCard color="#1f2f5e" />, label: '5GB monthly data' },
        { icon: <FaShieldAlt color="#1f2f5e" />, label: 'Priority customer support' },
      ],
      cta: 'Select Plan',
      bg:"#fed900",
      tx:"#1f2f5e"
    },
    {
      name: 'Premium Plan',
      description:
        'For power users who want unlimited calls, data, and premium support.',
      features: [
        { icon: <FaPhoneAlt color="#f2f2f5ff" />, label: 'Unlimited local calls' },
        { icon: <FaGlobe color="#ffffffff" />, label: 'Reduced international rates' },
        { icon: <FaSimCard color="#ffffffff" />, label: 'Unlimited data bundles' },
        { icon: <FaShieldAlt color="#ffffffff" />, label: '24/7 priority support' },
        { icon: <FaStar color="#ffffffff" />, label: 'Exclusive perks and rewards' },
      ],
      cta: 'Select Plan',
          tx:"#ffff",
      bg:"#1f2f5e"
    },
  ];

  const faqItems = [
    {
      question: 'Why should I choose a postpaid plan?',
      answer:
        'Postpaid plans save you the trouble of constantly topping up your balance. Youll never have to worry about running out of airtime in the middle of an important call. Plus, with Hormuuds postpaid option, you enjoy a 50% discount on all your monthly call usage, making it both convenient and cost-effective.',
    },
    {
      question: 'How can I subscribe to a Postpaid plan?',
      answer:
        'Getting started is easy, apply at any service center, sign up through our mobile app, or contact customer care and well set you up right away.',
    },
    {
      question: 'How can I choose the right postpaid plan for my needs?',
      answer:
        'If youre unsure which plan fits you best, our team is ready to help. You can reach us instantly through the chat tool at the bottom of the screen, send us an email, give us a call, or visit your nearest branch for in-person assistance.',
    },
  ];

const [openIndex, setOpenIndex] = useState(null);

const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

  return (
 
     
<Layout>
      {/* Breadcrumb */}
      <section className="breadcrumb-section"  id="Postpaid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb-list">
            <li>
              <Link href="/" className="breadcrumb-link">
                Home
              </Link>
            </li>
            <li>›</li>
            <li>
              <Link href="/Prepaid" className="breadcrumb-link">
                Personal
              </Link>
            </li>
            <li>›</li>
            <li className="breadcrumb-current">PostPaid</li>
          </ol>
        </nav>
      </section>

      {/* Title */}
      <section className="title-section">
        <h1>Postpaid Service</h1>
        <p>
          Premium, hassle-free calling and internet with flexible bundles, monthly billing,
          and priority support.
        </p>
        <hr />
      </section>

      {/* Plans Section */}
<section className="plans-section" aria-label="Available plans">
  {plans.map(({ name, description, features, cta, bg, tx }) => (
    <article
      key={name}
      className="plan-card"
      style={{
        background: bg,
        color: tx,
      }}
    >
      <h2 style={{ color: tx }}>{name}</h2>
      <p style={{ color: tx }}>{description}</p>
      <ul className="features-list">
        {features.map(({ icon, label }, i) => (
          <li key={i}>
            <span className="feature-icon">{icon}</span>
            <span style={{ color: tx }}>{label}</span>
          </li>
        ))}
      </ul>
      <button
        className="select-btn"
        onClick={() => alert(`You selected the ${name}`)}
        aria-label={`Select the ${name}`}
        style={{
          background: tx,
          color: bg,
        }}
      >
        {cta}
      </button>
    </article>
  ))}
</section>


      {/* Terms & Conditions */}
      <section className="terms-section">
        <h2>Terms & Conditions</h2>
        <ol>
          <li>Every customer enrolled in the postpaid service must provide a guarantor.</li>
          <li>If the customer is unable to pay the bill, the guarantor will be held accountable.</li>
        </ol>
      </section>

      {/* FAQ Section */}
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
                  style={{ marginTop: "0.8rem", lineHeight: "1.6", color: "#000000ff" }}
                >
                  {answer}
                </p>
              )}
            </div>
          );
        })}
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to get the latest offers and news.</p>
        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            aria-label="Email address"
          />
          <button type="submit" aria-label="Subscribe to newsletter">
            Subscribe
          </button>
        </form>
      </section>



      <style jsx>{`
        /* Breadcrumb styles */
        .breadcrumb-section {
          padding: 1.5rem 1rem;
          background: #f0f4ff;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgb(0 0 0 / 0.05);
          text-align: center;
          margin-bottom: 2rem;
        }
        .breadcrumb-list {
          list-style: none;
          display: inline-flex;
          gap: 0.5rem;
          padding: 0;
          margin: 0;
          align-items: center;
          justify-content: center;
        }
        .breadcrumb-link {
          color: #0052cc;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .breadcrumb-link:hover,
        .breadcrumb-link:focus {
          color: #003d73;
          outline: none;
        }
        .breadcrumb-current {
          font-weight: 700;
          color: #333;
        }

        /* Title Section */
        .title-section {
          padding: 3rem 1rem;
          max-width:1200px,
          margin: auto 1rem 4rem;
          text-align: center;
        }
        .title-section h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #003d73;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }
        .title-section p {
          font-size: 1.25rem;
          color: #0052cc;
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }
        .title-section hr {
          width: 100px;
          border-top: 4px solid #0052cc;
          border-radius: 3px;
          margin: 1.5rem auto 0;
          border-style: solid;
        }

        /* Plans Section */
        .plans-section {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto 5rem;
          padding: 0 1rem;
        }
        .plan-card {
          background: #fff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          border-radius: 15px;
          padding: 2rem;
          flex: 1 1 350px;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s ease;
        }
        .plan-card:hover,
        .plan-card:focus-within {
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
        }
        .plan-card h2 {
          font-size: 2rem;
          color: #1f2f5e;
          margin-bottom: 1rem;
        }
        .plan-card p {
          font-size: 1.15rem;
          color: #1f2f5e;
          margin-bottom: 1.5rem;
          flex-grow: 0;
        }
        .features-list {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1.5rem;
          color: #1f2f5e;
          font-size: 1.1rem;
        }
        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.8rem;
        }
        .feature-icon {
          display: inline-flex;
          font-size: 1.25rem;
          min-width: 24px;
          color: #1f2f5e;
        }
        .select-btn {
          margin-top: auto;
          padding: 0.9rem 3rem;
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          background-color: #fed900;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          align-self: center;
          width: max-content;
          box-shadow: 0 4px 12px rgb(254 217 0 / 0.7);
        }
        .select-btn:hover,
        .select-btn:focus {
          background-color: #1f2f5e;
          color: #fed900;
          outline: none;
          box-shadow: 0 4px 16px rgb(34 46 94 / 0.8);
        }

        /* Terms Section */
        .terms-section {
          background-color: #f9fafd;
          padding: 3rem 1rem;
          max-width: 900px;
          margin: 0 auto 5rem;
          border-radius: 15px;
          box-shadow: 0 8px 24px rgba(7, 31, 87, 0.1);
          font-size: 1.15rem;
          line-height: 1.7;
          color: #444;
        }
        .terms-section h2 {
          text-align: center;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #003d73;
        }
        .terms-section ol {
          padding-left: 1.25rem;
        }
        .terms-section li {
          margin-bottom: 1rem;
        }

        /* FAQ Section */
        .faq-section {
          background-color: #f9fafb;
          padding: 4rem 1rem;
          max-width: 1100px;
          margin: 0 auto 5rem;
          border-radius: 15px;
          box-shadow: 0 8px 24px rgba(7, 31, 87, 0.1);
          font-size: 1.1rem;
          line-height: 1.7;
          color: #444;
        }
        .faq-section h2 {
          text-align: center;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #003d73;
        }
        .faq-list {
          max-width: 700px;
          margin: 0 auto;
        }
        .faq-item {
          margin-bottom: 2rem;
        }
        .faq-item h3 {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: #0052cc;
          margin-bottom: 0.3rem;
        }
        .faq-icon {
          margin-right: 0.6rem;
          font-size: 1.4rem;
          color: #0052cc;
        }
        .faq-item p {
          margin-left: 2rem;
          line-height: 1.5;
          color: #333;
        }

        /* Newsletter Section */
        .newsletter-section {
          background-color: #fed900;
          color: #1f2f5e;
          padding: 4rem 1rem 6rem;
          text-align: center;
          border-radius: 0 0 60px 60px;
        }
        .newsletter-section h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .newsletter-section p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.4;
        }
        .newsletter-form {
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: nowrap;
        }
        .newsletter-form input[type='email'] {
          flex-grow: 1;
          padding: 0.85rem 1.25rem;
          border-radius: 30px;
          border: none;
          font-size: 1rem;
          outline-offset: 4px;
          transition: box-shadow 0.3s ease;
        }
        .newsletter-form input[type='email']:focus {
          box-shadow: 0 0 6px 2px #1f2f5e88;
          outline: none;
        }
        .newsletter-form button {
          padding: 0.85rem 2.25rem;
          border-radius: 30px;
          border: none;
          background-color: #1f2f5e;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex-shrink: 0;
        }
        .newsletter-form button:hover,
        .newsletter-form button:focus {
          background-color: #002d73;
          outline: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .plans-section {
            flex-direction: column;
            gap: 3rem;
          }
          .plan-card {
            max-width: 100%;
          }
          .faq-item p {
            margin-left: 0;
            padding-left: 1.8rem;
            text-indent: -1.8rem;
          }
          .breadcrumb-list {
            font-size: 1rem;
          }
        }
      `}</style>
          </Layout>
  
  );
}