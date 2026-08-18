import React from 'react';

/* Optional editorial block for the empty left column of the Our Story section.
   Typography only, existing tokens only. Removing this file and the single
   `aside` prop on the Our Story SectionHeading restores the previous layout. */
const PROGRESSION = [
  'Field operations',
  'Value chains',
  'Farmer systems',
  'Enterprise systems',
  'Agricultural intelligence'
];

export default function StoryAside() {
  return (
    <div className="story-aside">
      <p className="story-aside__figure">
        <span className="story-aside__num">10+</span>
        <span className="story-aside__unit">Years</span>
      </p>
      <p className="story-aside__note">Building digital systems around the realities of Indian agriculture.</p>
      <ol className="story-aside__track">
        {PROGRESSION.map((step) => (
          <li className="story-aside__step" key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
