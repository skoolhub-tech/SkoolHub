import React, { useRef } from 'react';
import snipp1 from '../../photos/snip1.gif';
import snipp2 from '../../photos/snipp2.gif';
import snipp3 from '../../photos/snipp3.gif';
import snipp4 from '../../photos/snipp4.gif';
import skoolhublogo from '../../photos/skoolhub2-no-background.png';

function LandingPage() {
  const snippContainer1Ref = useRef(null);

  const scrollToSnippContainer1 = () => {
    snippContainer1Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="landing-page-container">
      <button>Login</button>
      <div className="landing-page">
      <div className="landing-page-header">
        <h1>Welcome to SkoolHub</h1>
      </div>
      <div className="starting-page">
        <img className="logo-landing" src={skoolhublogo}></img>
      </div>
      <button className="scroll-down" onClick={scrollToSnippContainer1}>↓ Learn More ↓</button>
      </div>
      <div className="snipp1-p">
        <p>Seamless, Easy-to-use 2FA login interface</p>
      </div>
      <div className="snipp-container1" ref={snippContainer1Ref}>
        <div className="snipp-text1">
          <p className="typing-animation">In an era where education is both a passport to opportunity and a pathway to innovation, our web-based education management system is designed to revolutionize the teaching and learning experience. </p>
        </div>
        <div className="snipp1">
          {/* <p>Seamless, Easy-to-use 2FA login interface</p> */}
          <img className="snipp-img" src={snipp1} alt="snipp1" />
        </div>
      </div>
      <div className="snipp2-p">
        <p> Giving assignments to students with just a touch of a button...</p>
      </div>
      <div className="snipp-container2">
        <div className="snipp-text2">
          <p>
            By eliminating the complexities and tedium inherent in traditional educational  administration, we empower educators to focus on what truly matters—inspiring
            students and igniting a passion for learning
          </p>
        </div>
        <div className="snipp2">
          <img className="snipp-img" src={snipp2} alt="snipp2" />
          {/* <p>Giving assignments to students with just a touch of a button...</p> */}
        </div>
      </div>
      <div className="snipp3-p">
        <p> Full administrative control with a friendly user-interface...</p>
      </div>
      <div className="snipp-container3">
        <div className="snipp-text3">
        <p>Our platform streamlines administrative tasks, enhances classroom interaction, and provides actionable insights into student performance, all through an intuitive, user-friendly interface.</p>
        </div>
        <div className="snipp3">
        <img className="snipp-img" src={snipp3} alt="snipp2" />
          {/* <p>Full administrative control with a friendly user-interface...</p> */}
        </div>
      </div>
      <div className="snipp4-p">
        <p> Intuitive caledar design for users to create personal task lists...</p>
      </div>
      <div className="snipp-container4">
        <div className="snipp-text4">
        <p>
          For educators, this means more time devoted to teaching and less to paperwork.
          For students, it promises a more engaging, personalized learning journey. And for
          institutions, it offers a seamless, efficient, and cost-effective way to manage and
          elevate the educational experience. Join us in transforming the future of education,
          making it more accessible, enjoyable, and effective for all.
        </p>
        </div>
        <div className="snipp4">
        <img className="snipp-img" src={snipp4} alt="snipp2" />
          {/* <p>intuitive caledar design for users to create personal task lists...</p> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
