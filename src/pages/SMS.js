import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image';
import { FaMobileAlt, FaLock, FaDollarSign } from 'react-icons/fa';

const features = [
  { icon: <FaMobileAlt size={32} />, title: 'Easy API Integration', description: 'Connect your application quickly and securely.' },
  { icon: <FaLock size={32} />, title: 'Enterprise Security', description: 'Data encryption and protection at all levels.' },
  { icon: <FaDollarSign size={32} />, title: 'Affordable Pricing', description: 'Flexible plans tailored to your needs.' },
];

const plans = [
  { name: 'Personal Package 1', price: '$10 / SMS', details: ['1000 SMS', 'Valid For 30 Days'], bac: "#fed900", tx: "#1f2f5e" },
  { name: 'Personal Package 2', price: '$20 / SMS', details: ['3000 SMS', 'Valid For 30 Days'], bac: "#1f2f5e", tx: "#ffffff" },
  { name: 'Best Deal 1', price: '$30 / SMS', details: ['6000 SMS', 'Valid For 45 Days'], bac: "#ffffff", tx: "#1f2f5e" },
  { name: 'Best Deal 2', price: '$50 / SMS', details: ['10,000 SMS', 'Valid 60 days'], bac: "#1f2f5e", tx: "#ffffff" },
  { name: 'Institutions Package', price: '$100 / SMS', details: ['50,000 SMS', 'Valid 90 days'], bac: "#fed900", tx: "#1f2f5e", highlight: true },
];

export default function SMS() {
  const faqItems = [
    {
      question: 'How do I customize messages for my customers?',
      answer: 'Our platform allows you to personalize each message with customer names, appointment details, and other data fields for higher engagement.',
    },
    {
      question: 'Can I schedule SMS campaigns in advance?',
      answer: 'Yes! Easily set up future campaigns to send at specific dates and times, perfect for promotions and reminders.',
    },
    {
      question: 'Do you support two-way messaging for customer responses?',
      answer: 'Absolutely! MySMS supports real-time two-way SMS conversations so you can interact directly with your customers.',
    },
    {
      question: 'How do I monitor my SMS campaign performance?',
      answer: 'Access detailed analytics dashboards that show delivery reports, open rates, click-throughs, and overall engagement metrics.',
    },
    {
      question: 'Is MySMS compliant with data privacy regulations?',
      answer: 'We take privacy seriously. MySMS complies with GDPR, HIPAA, and other regional regulations ensuring your data is secure and protected.',
    },
    {
      question: 'What support channels are available if I encounter issues?',
      answer: 'Our 24/7 customer support team is accessible via live chat, email, and phone to assist with any questions or technical needs.',
    },
  ];

   const [openIndex, setOpenIndex] = useState(null);
  
  
     const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
};

  return (
    <>
       <Layout>

      {/* Hero Section with Split Layout and Accent */}
      <section
        style={{
          background: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)',
          color: '#1f2f5e',
          padding: '70px 0 50px',
          textAlign: 'center',
          position: 'relative',
        }} id='SMS'
      >
        <div className="container">
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 900,
              color: '#1f2f5e',
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            MySMS — Connect and Communicate Faster
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#1f2f5e',
              lineHeight: 1.6,
              marginBottom: '30px',
            }}
          >
            Engage your customers with a platform built for speed, security, and simplicity. Lightning-fast APIs streamline your
            messaging workflow with clear, upfront pricing.
          </p>
          <button
            style={{
              padding: '15px 45px',
              backgroundColor: '#0a3d62',
              color: '#f9fafb',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(10, 61, 98, 0.3)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#183b71')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0a3d62')}
          >
            Get Started Now
          </button>
        </div>
      </section>
      <br />
      <section className="container py-5" style={{ background: "#f4f9fb", borderRadius: 20 }}>
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            {/* Replace src with your code or illustration asset */}
            <Image src="/assets/images/sms.png" alt="SMS illustration" width={360} height={300} style={{ width: "90%", maxWidth: 360, height: "auto" }} />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold" style={{ color: "#1f2f5e" }}>
              Why Choose MySMS?
            </h2>
            <ul className="list-unstyled mt-3 mb-3" style={{ color: "#415165", fontSize: '1rem', lineHeight: 1.5 }}>
              {features.map(({ title, description }, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#0a3d62' }}>• {title}:</strong> {description}
                </li>
              ))}
            </ul>
            <button
              className="btn rounded-pill"
              style={{
                backgroundColor: "#fed900",
                color: "#1f2f5e",
                fontWeight: "600",
                padding: "10px 25px",
                boxShadow: '0 2px 8px rgba(254, 217, 0, 0.5)',
                border: 'none',
              }}
            >
              View Integration Guide
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Plans horizontal cards */}
      <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '2.2rem',
            marginBottom: '3px',
            color: '#003366',
          }}
        >
          Our Plans
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            maxWidth: '960px',
            margin: 'auto',
          }}
        >
          {plans.map(({ name, price, details, bac, tx, highlight }, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 1 220px',
                background: bac,
                borderRadius: '16px',
                boxShadow: highlight ? '0 4px 30px rgba(0, 122, 204, 0.4)' : '0 4px 15px rgba(0,0,0,0.1)',
                border: highlight ? '2px solid #fed900' : '1px solid #d1d9e6',
                padding: '30px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h3 style={{ margin: '0 0 12px', color: tx }}>{name}</h3>
              <p style={{ fontWeight: '700', fontSize: '1.5rem', margin: '0 0 20px', color: tx }}>{price}</p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, color: '#556f8c', fontSize: '0.9rem' }}>
                {details.map((d, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    • {d}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  marginTop: '12px',
                  backgroundColor: highlight ? '#1f2f5e' : '#f0f6ff',
                  color: highlight ? 'white' : '#1f2f5e',
                  border: 'none',
                  borderRadius: '26px',
                  padding: '10px 22px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
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
                  style={{ marginLeft: '2rem', marginTop: '0.3rem', whiteSpace: 'pre-line', color: '#333' }}
                >
                  {answer}
                </p>
              )}
            </div>
          );
        })}
      </section>

      {/* Sticky Call To Action Bar */}
      <section
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#fed900',
          padding: '16px 24px',
          textAlign: 'center',
          zIndex: 100,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.15)',
        }}
      >
        <button
          style={{
            backgroundColor: 'white',
            color: '#1f2f5e',
            fontWeight: '700',
            padding: '12px 52px',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
          }}
          onClick={() => alert('Contact form coming soon!')}
        >
          Contact Us to Get Started
        </button>
      </section>
  
        </Layout>
    </>
  );
}