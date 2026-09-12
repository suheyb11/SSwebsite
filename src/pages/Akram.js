import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout'
import plansData from "../components/layout/plan.json";
import { FaArrowRight, FaCheckCircle, FaMobileAlt, FaEnvelopeOpenText } from 'react-icons/fa';

export default function Akram() {
  const Akram = plansData.Akram;

  // Example FAQ data
  const faqItems = [
    {
      question: 'How do I decide which Akram Voice package suits me best?',
      answer: 'You can choose your Akram Voice package based on how often you make calls. Select the package that matches your calling habits to save more.',
    },
    {
      question: 'How can I subscribe to a Somtel Akram Voice package?',
      answer: 'Dial *104# and follow the menu options. You can also subscribe through the Somtel app or by visiting the nearest Somtel customer care office.',
    },
    {
      question: 'Can I manage or check my Akram Voice balance?',
      answer: 'Yes. Dial *121# at any time to check your remaining minutes, expiry date, or to top up again.',
    },
    {
      question: 'What makes Akram Voice different from other call packages?',
      answer: 'Akram Voice offers flexible minutes at the lowest possible rates, giving you more talk time for less money.',
    }
  ];
  
  const [openIndex, setOpenIndex] = useState(null);
    
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      {/* Breadcrumb Section */}
      <section
        className="breadcrumb_section"
        style={{
          padding: '1.5rem 1rem',
          background: '#f0f4ff',
          fontWeight: '600',
          fontSize: '1.1rem',
          boxShadow: '0 4px 10px rgb(0 0 0 / 0.05)',
          textAlign: 'center',
        }} 
        id='Akram'
      >
        <nav aria-label="breadcrumb">
          <ol
            style={{
              listStyle: 'none',
              display: 'inline-flex',
              gap: '0.5rem',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/" style={{ color: '#0052cc', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li>›</li>
            <li>
              <Link href="/Prepaid" style={{ color: '#0052cc', textDecoration: 'none' }}>
                Personal
              </Link>
            </li>
            <li>›</li>
            <li style={{ color: '#333', fontWeight: '700' }}>Akram</li>
          </ol>
        </nav>
      </section>

      {/* Title Section */}
      <section
        style={{
          padding: '3rem 1rem',
          maxWidth: '1200px',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#003d73',
            marginBottom: '0.5rem',
          }}
        >
          Airtime Service - Akram Voice
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#0052cc',
            fontWeight: '500',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          Explore our flexible and affordable prepaid plans tailored for your
          communication needs.
        </p>
        <hr
          style={{
            width: '100px',
            borderTop: '4px solid #0052cc',
            borderRadius: '3px',
            margin: '1.5rem auto',
          }}
        />
      </section>

      {/* Plans Section */}
      <section
        className="plans_grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 6rem auto',
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          padding: '0 1rem',
        }}
      >
        {Akram.map((plan) => (
          <article
            key={plan.id}
            className="plan_card"
            style={{
              background: plan.bgColor,
              borderRadius: '20px',
              color: plan.textColor,
              padding: '2.5rem 2rem',
              boxShadow: '0 8px 24px rgba(0, 82, 204, 0.2)',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '350px',
            }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = `perspective(600px) rotateX(${-y / 30}deg) rotateY(${x / 30}deg) scale(1.05)`;
              card.style.boxShadow = `0 15px 40px rgba(0, 82, 204, 0.4)`;
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
              card.style.boxShadow = '0 8px 24px rgba(0, 82, 204, 0.2)';
            }}
          >
            <header style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: plan.textColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <span>$</span>
                {plan.price}
                <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {' '}
                  {plan.unit}
                </span>
              </div>
            </header>

            <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '2rem' }}>
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: '0.4rem 0',
                    fontSize: '1.05rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <FaCheckCircle color={plan.textColor} /> {feature}
                </li>
              ))}
            </ul>

            <a
              href="#"
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.85)',
                color: '#0052cc',
                padding: '0.75rem 1.8rem',
                fontWeight: '700',
                fontSize: '1rem',
                borderRadius: '30px',
                textDecoration: 'none',
                boxShadow: '0 5px 15px rgba(0,82,204,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0052cc';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
                e.currentTarget.style.color = '#0052cc';
              }}
            >
              Buy Now <FaArrowRight />
            </a>
          </article>
        ))}
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
    </Layout>
  );
}