import React from 'react';
import './CommunityGuidelines.css'; // Import the CSS for styling

const guidelines = [
  "Be respectful and considerate to others.",
  "Avoid offensive or inappropriate language.",
  "No spamming or self-promotion.",
  "Keep discussions relevant to the topic.",
  "Report any inappropriate content to the moderators.",
  "Follow the rules set by the forum administrators."
];

const CommunityGuidelines = () => {
  return (
    <div className="community-guidelines">
      <h2>Community Guidelines</h2>
      <ul className="guideline-list">
        {guidelines.map((guideline, index) => (
          <li key={index} className="guideline-item">
            {guideline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityGuidelines;
