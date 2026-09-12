import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import Image from 'next/image';

export default function SMSAPI() {
  const features = [
    { icon: "💬", title: "Reliable Delivery", desc: "99.9% uptime ensures your SMS reaches users instantly." },
    { icon: "⚡", title: "Ultra-Fast API", desc: "Send thousands of messages per second with our RESTful API." },
    { icon: "🔐", title: "Enterprise Security", desc: "Our platform ensures data privacy and message encryption." },
    { icon: "📊", title: "Advanced Analytics", desc: "Real-time insights and campaign tracking dashboards." },
    { icon: "🤝", title: "Dedicated Support", desc: "24/7 expert technical assistance, always." },
  ];

  const plans = [
  {
    name: "Business Level Package",
    price: "100",
    unit: "SMS",
    tagline: "Unlimited Groups",
    features: ["10,000 LocalSMS","Valid For 90 Days"],
    bac:"#fed900", tx:"#1f2f5e"
  },
  {
    name: "Institutions Level 1 Package",
    price: "450",
    unit: "SMS",
    tagline: "Unlimited Groups",
    features: ["50,000 LocalSMS","Valid For 90 Days"],  
    bac:"#1f2f5e", tx:"#ffffff"
  },
  {
    name: "Institutions Level 2 Package",
    price: "700",
    unit: "SMS",
    tagline: "Unlimited Groups",
    features: ["100,000 LocalSMS","Valid For 90 Days"],  
    bac:"#ffffff", tx:"#1f2f5e"
  },
  {
    name: "Institutions Level 3 Package",
    price: "5000",
    unit: "SMS",
    tagline: "Best for enterprises",
    features: ["1,000,000 LocalSMS","Valid For 90 Days"],  
    bac:"#1f2f5e", tx:"#ffffff",
    highlight: false,
  },
  {
    name: "Institutions Level 4 Package",
    price: "6000",
    unit: "SMS",
    tagline: "Best for enterprises",
    features: ["2,000,000 LocalSMS","Valid For 90 Days"],  
    bac:"#fed900", tx:"#1f2f5e",
    highlight: false,
  },
];


  const faq= [
    {
      question: "What is SMS API and how does it differentiate from My SMS?",
      answer: "SMS API is a type of API that allows your business to integrate SMS messaging into your existing software platforms. SMS APIs enable you to send or receive messages quickly and easily through your business' website or application."
    },
    {
      question: "How do I integrate SMS API into my app?",
      answer: "Integration is done through RESTful endpoints or SMPP with documentation and sample codes provided for quick setup."
    },
    {
      question: "Are all apps compatible?",
      answer: "Most modern applications can integrate via API. Contact us for specific platform questions."
    },
    {
      question: "What are the terms and conditions?",
      answer: "Our terms cover acceptable use policies, payment terms, and privacy regulations. Please contact support or read our full agreement on the website."
    },
  ];

const [openIndex, setOpenIndex] = useState(null);


   const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};
  return (
<Layout>
     
      <main style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* HERO */}
        <section style={{
          background: "linear-gradient(135deg, #fed900 0%, #1f2f5e 100%)", // BTC yellow gradient
          color: "#1f2f5e",
          padding: "70px 0 50px",
          textAlign: "center",
          position: "relative"
        }} id='SMSAPI'
        
        >
          <div className="container">
            <h1 style={{ fontWeight: 800, fontSize: "2.5rem", color: "white" }}>The Modern SMS API<br />for Fast-Growing Teams</h1>
            <p style={{ margin: "30px auto 30px", maxWidth: 500, fontSize: "1.25rem", color: "white" }}>
              Send, receive, &amp; manage SMS campaigns worldwide.<br />
              Developer-friendly, powerful analytics, no hidden fees.
            </p>
            <div>
              <button className="btn btn-light btn-lg fw-bold me-3" style={{ borderRadius: 8, backgroundColor: "white", color: "#1f2f5e" }}>Get Started Free</button>&nbsp;
              <button className="btn btn-outline-light btn-lg" style={{ borderRadius: 8, borderColor: "white", color: "white" }}>API Docs</button>
            </div>
            <div style={{
              position: "absolute", right: 0, top: 0, width: "30%", height: "100%", background: "url('/mobile-chat-mockup.svg') no-repeat bottom right", backgroundSize: "contain", opacity: 0.2, pointerEvents: "none"
            }} />
          </div>
        </section>

        {/* FEATURES */}
        <section className="container py-5">
          <div className="row text-center">
            {features.map(f => (
              <div className="col-6 col-md-4 col-lg-2 mx-auto mb-4" key={f.title}>
                <div style={{ fontSize: "2.2rem" }}>{f.icon}</div>
                <strong>{f.title}</strong>
                <p className="text-muted small">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API SECTION */}
     <section className="container py-5" style={{ background: "#f4f9fb", borderRadius: 20 }}>
  <div className="row align-items-center">
    <div className="col-md-6 mb-4 mb-md-0 text-center">
      {/* Replace src with your code or illustration asset */}
      <Image src="/assets/images/api.png" alt="API screenshot" width={360} height={300} style={{ width: "90%", maxWidth: 360, height: "auto" }} />
    </div>
    <div className="col-md-6">
      <h2 className="fw-bold" style={{ color: "#1f2f5e" }}>
        Why Choose MySMS?
      </h2>
      <ul className="list-unstyled mt-3 mb-3" style={{ color: "#415165", fontSize: '1rem', lineHeight: 1.5 }}>
        {features.map(({ title, desc }, idx) => (
          <li key={idx} style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#0a3d62' }}>• {title}:</strong> {desc}
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


        {/* PRICING */}
        <section style={{ background: "#fff", padding: "60px 0" }}>
          <div className="container text-center ">
            <h2 className="mb-4" style={{ fontWeight: 700 }}>Simple, Transparent Pricing</h2>
            <div className="row g-4 justify-content-center">
              {plans.map(plan => (
                <div className="col-md-4" key={plan.name} style={{ padding: "6px 0 6px 10px" }} >
                <div className={`card h-100 shadow ${plan.highlight ? "border border-2 border-warning" : ""}`} style={{ borderRadius: 16, background: plan.bac }}>
  <div className="card-body">
    <span className={`badge ${plan.highlight ? "bg-warning text-secondary" : "bg-secondary text-white"} mb-2`} style={{ color: plan.tx }}>{plan.name}</span>
    <h3 className="fw-bold mb-3" style={{ color: plan.tx }}>
      ${plan.price} <span className="fs-6 text-muted" style={{ color: plan.tx }}>/ {plan.unit}</span>
    </h3>
    <p className="mb-3" style={{ color: plan.tx }}>{plan.tagline}</p>
    <ul className="list-unstyled text-start mb-4" style={{ color: plan.tx }}>
      {plan.features.map(f => <li key={f}>✔ {f}</li>)}
    </ul>
    <button className={`btn w-100 rounded-pill ${plan.highlight ? "btn-warning" : "btn-outline-primary"}`}>Choose</button>
  </div>
</div>

                </div>
              ))
              
              }
            </div><br></br>
            <div className="text-center mt-3 text-muted">Custom needs? <a href="#" style={{color:"#1f2f5e"}}>Contact sales</a></div>
          </div>
          
        </section>

        {/* FAQ */}
       <section style={{ maxWidth: "1100px", margin: "0 auto 5rem", padding: "0 1.5rem" }}>
        <h2 style={{ fontSize: "2rem", color: "#1f2f5e", marginBottom: "1.7rem", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        {faq.map(({ question, answer }, i) => {
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
      </main>
      

      <style jsx>{`
        .faq-question:hover {
          background-color: #f8f9fa !important;
        }
      `}</style>
   </Layout>
  );
}