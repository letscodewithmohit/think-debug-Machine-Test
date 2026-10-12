import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <section className="newsletter">
      <div className="newsletter-copy">
        <h1 className="eyebrow">Join Our Newsletter</h1>
       
      </div>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit">
          {subscribed ? "You're on the list!" : "Count me in"} <span aria-hidden="true">→</span>
        </button>
        {subscribed && (
          <p className="newsletter-success" role="status">
            Thanks for joining us!
          </p>
        )}
      </form>
    </section>
  );
}

export default Newsletter;
