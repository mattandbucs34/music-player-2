import React from 'react';

const Landing = () => (
  <section className = {'landing'}>
    <h1 className={'landing-title'}>Turn the music up!</h1>

    <div className={'selling-points'}>
      <div className={'point'}>
        <h2 className={'point-title'}>Choose your music</h2>
        <p className={'point-description'}>
          Your music preferences at your fingertips.
        </p>
      </div>

      <div className={'point'}>
        <h2 className={'point-title'}>
          Unlimited. Ad-free. Streaming.
        </h2>
        <p className={'point-description'}>
          No arbitrary limits. No distractions. No useless ads.
        </p>
      </div>

    </div>
  </section>
);

export default Landing;