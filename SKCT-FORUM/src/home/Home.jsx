// import React from 'react';
// import './Home.css'; // Import the CSS file
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import Footer from '../components/Footer'; // Import the Footer component

// const Home = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleJoinNowClick = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   return (
//     <div className="main-container">
//       <div className="blur-circle1"></div>
//       <div className="blur-circle2"></div>
      
//       {/* Start Landing Page */}
//       <div className="landing-page">
//         <div className="content">
//           <div className="container">
//             <div className="info">
//               <h1>Welcome to the SKCT Forum</h1>
//               <p>Join the vibrant community of Sri Krishna College of Technology! Connect, share, and collaborate with fellow students and faculty. Let's build a thriving academic network together.</p>
//               <button onClick={handleJoinNowClick}>Join Now</button>
//             </div>
//             <div className="image">
//               {/* <img className="main-image" src="https://abped-college-dashboard.s3.us-east-2.amazonaws.com/tted/college-backend/college/f8061479-1f5a-4bfb-b162-4a4a46835328.jpg" alt="Main Visual"/> */}
//             </div>
//           </div>
//           <div className="card">
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import './Home.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Footer from '../components/Footer'; // Import the Footer component

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleJoinNowClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="main-container">
      <div className="blur-circle1"></div>
      <div className="blur-circle2"></div>
      
      {/* Start Landing Page */}
      <div className="landing-page">
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Welcome to the SKCT Forum</h1>
              <p>Join the vibrant community of Sri Krishna College of Technology! Connect, share, and collaborate with fellow students and faculty. Let's build a thriving academic network together.</p>
              <button onClick={handleJoinNowClick}>Start your queries here</button>
            </div>
            <div className="image">
              {/* <img className="main-image" src="https://abped-college-dashboard.s3.us-east-2.amazonaws.com/tted/college-backend/college/f8061479-1f5a-4bfb-b162-4a4a46835328.jpg" alt="Main Visual"/> */}
            </div>
          </div>
          <div className="card">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
