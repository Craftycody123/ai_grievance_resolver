import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature cards data
  const featureCards = [
    {
      id: 1,
      icon: '📝',
      title: 'Submit Complaint',
      description: 'Describe your issue in natural language. Our AI understands and routes it automatically.',
      gradient: 'from-blue-500 to-cyan-500',
      link: '/submit',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      icon: '🔍',
      title: 'Track Status',
      description: 'Monitor your complaint progress in real-time with detailed updates.',
      gradient: 'from-purple-500 to-pink-500',
      link: '/track',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'View comprehensive insights and system performance metrics.',
      gradient: 'from-green-500 to-emerald-500',
      link: '/dashboard',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      id: 4,
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Get instant help from our AI-powered support assistant.',
      gradient: 'from-orange-500 to-red-500',
      link: '/ai-assistant',
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    }
  ];

  // Stats data
  const stats = [
    { value: '24/7', label: 'Support Available' },
    { value: '85%', label: 'Faster Resolution' },
    { value: '10k+', label: 'Complaints Resolved' },
    { value: '4.8', label: 'User Rating' }
  ];

  // How it works steps
  const steps = [
    { number: '01', title: 'Describe Your Issue', description: 'Simply explain your problem in plain language.', icon: '💬' },
    { number: '02', title: 'AI Analysis', description: 'Our AI understands and categorizes your complaint.', icon: '🧠' },
    { number: '03', title: 'Smart Routing', description: 'Automatically sent to the right department.', icon: '🚀' },
    { number: '04', title: 'Track Progress', description: 'Real-time updates on your complaint status.', icon: '📈' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              
              <h1 className="hero-title">
                Resolve Your <span className="text-gradient">Grievances</span> 
                <br />Intelligently & Efficiently
              </h1>
              <p className="hero-subtitle">
                Experience next-generation complaint resolution powered by artificial intelligence. 
                Submit, track, and resolve issues seamlessly with our intelligent system.
              </p>
              <div className="hero-buttons">
                <Link to="/submit" className="btn-primary">
                  Submit Complaint
                  <span className="btn-icon">→</span>
                </Link>
                <Link to="/track" className="btn-secondary">
                  Track Status
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card">
                <div className="card-content">
                  <div className="card-icon">🤖</div>
                  <h3>AI Processing</h3>
                  <p>Analyzing your complaint...</p>
                </div>
              </div>
              <div className="floating-card delayed">
                <div className="card-content">
                  <div className="card-icon">⚡</div>
                  <h3>Fast Resolution</h3>
                  <p>85% faster than traditional systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">How We Help You</h2>
            <p className="section-description">
              Our platform combines AI technology with user-friendly design to transform 
              the way grievances are handled.
            </p>
          </div>

          <div className="features-grid">
            {featureCards.map((card) => (
              <Link to={card.link} key={card.id} className="feature-card">
                <div className={`card-gradient ${card.color}`}>
                  <div className="card-icon">{card.icon}</div>
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="card-link">
                    Get Started
                    <span className="link-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Process</span>
            <h2 className="section-title">Simple & Efficient Process</h2>
            <p className="section-description">
              Four simple steps from submission to resolution
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={step.number} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Resolve Your Issue?</h2>
            <p className="cta-description">
              Join thousands who have experienced faster, more efficient grievance resolution.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/about" className="btn-secondary btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;