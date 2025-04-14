import React from 'react';
import './PublicPages.css';
import './AboutusPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-header">
          <h1>About Us</h1>
          <p className="subtitle">Learn more about our company and mission</p>
        </section>
        
        <section className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, 
              mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed 
              eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.
            </p>
            <p>
              Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, 
              tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Nam vestibulum, arcu sodales feugiat consectetur, nisl orci bibendum elit, eu euismod magna sapien ut nibh. 
              Donec mattis at sem nec condimentum. Fusce vehicula, diam id ornare placerat, nulla augue tincidunt sem, at 
              euismod magna risus at purus.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo"></div>
                <h3>John Doe</h3>
                <p>CEO & Founder</p>
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <h3>Jane Smith</h3>
                <p>CTO</p>
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <h3>Mike Johnson</h3>
                <p>Lead Developer</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;