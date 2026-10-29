
"use client";

import { useEffect, useState, type FormEvent } from "react";

type Listing = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

const STORAGE_KEY = "novellaListings";

export default function SellPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (Array.isArray(saved)) {
        setListings(saved);
      }
    } catch {
      setListings([]);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanDescription = description.trim();
    const dailyPrice = Number(price);

    if (!cleanName || !cleanDescription || !price) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!Number.isFinite(dailyPrice) || dailyPrice <= 0) {
      setError("Please enter a valid daily rental price.");
      return;
    }

    const newListing: Listing = {
      id: Date.now(),
      name: cleanName,
      category,
      price: dailyPrice,
      image: image.trim(),
      description: cleanDescription,
    };

    try {
      const existing: Listing[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (!Array.isArray(existing)) {
        throw new Error("Invalid saved listing data");
      }

      const updated = [newListing, ...existing];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setListings(updated);

      setName("");
      setCategory("Clothing");
      setPrice("");
      setDescription("");
      setImage("");

      setMessage(
        "Your item has been listed successfully! It is saved on this browser."
      );
    } catch {
      setError(
        "Could not save your listing. Please check your browser storage and try again."
      );
    }
  }

  function deleteListing(id: number) {
    try {
      const updated = listings.filter((listing) => listing.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setListings(updated);
      setMessage("Listing deleted successfully.");
      setError("");
    } catch {
      setError("Could not delete this listing. Please try again.");
    }
  }

  return (
    <main className="sell-page">
      <header className="navbar">
        <a className="brand" href="/">
          novella<span>.</span>
        </a>

        <nav>
          <a href="/#explore">Explore</a>
          <a href="/#how-it-works">How it works</a>
          <a href="/bookings">My Rentals</a>
        </nav>

        <a className="nav-button" href="/">
          Back to collection ↗
        </a>
      </header>

      <section className="sell-hero">
        <p className="eyebrow">GIVE YOUR ITEMS A NEW STORY</p>
        <h1>
          List something <em>lovely.</em>
        </h1>
        <p>
          Have something worth sharing? Add your item to Novella
          and let someone else enjoy it for a while.
        </p>
      </section>

      <section className="sell-layout">
        <form className="sell-form" onSubmit={handleSubmit}>
          <h2>Item details</h2>
          <p className="form-intro">
            Tell renters a little about what you're offering.
          </p>

          {message && (
            <div className="success-message" role="status">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <label htmlFor="item-name">Item name *</label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Elegant pearl necklace"
            required
          />

          <label htmlFor="item-category">Category *</label>
          <select
            id="item-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Handmade">Handmade</option>
            <option value="Footwear">Footwear</option>
            <option value="Bags">Bags</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="item-price">Daily rental price (₹) *</label>
          <input
            id="item-price"
            type="number"
            min="1"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="e.g. 150"
            required
          />

          <label htmlFor="item-description">Description *</label>
          <textarea
            id="item-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the item's style, condition, colour, and details..."
            rows={5}
            required
          />

          <label htmlFor="item-image">Image URL (optional)</label>
          <input
            id="item-image"
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com/item.jpg"
          />
          <p className="field-note">
            Use a publicly accessible image URL. Image upload is not
            enabled in this demo.
          </p>

          <button className="primary-button full-button" type="submit">
            List my item ↗
          </button>

          <p className="demo-note">
            Demo only: listings are stored in this browser, not on a
            shared online server.
          </p>
        </form>

        <aside className="seller-sidebar">
          <div className="seller-note">
            <span className="seller-note-number">01</span>
            <h3>Every item has a story.</h3>
            <p>
              Share useful, unique, or handmade finds with someone
              who can enjoy them next.
            </p>
          </div>

          <div className="seller-note">
            <span className="seller-note-number">02</span>
            <h3>Set your daily price.</h3>
            <p>
              Choose a rental price that makes sense for your item.
            </p>
          </div>

          <div className="seller-note">
            <span className="seller-note-number">03</span>
            <h3>Keep it honest.</h3>
            <p>
              Include accurate details about the item's condition
              and what makes it special.
            </p>
          </div>
        </aside>
      </section>

      <section className="my-listings">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR CONTRIBUTIONS</p>
            <h2>
              My <em>listings.</em>
            </h2>
          </div>
          <p className="section-description">
            Items saved on this browser.
          </p>
        </div>

        {listings.length === 0 ? (
          <p className="empty-state">
            You haven't listed any items yet. Your first listing
            will appear here.
          </p>
        ) : (
          <div className="seller-list-grid">
            {listings.map((listing) => (
              <article className="seller-list-card" key={listing.id}>
                {listing.image ? (
                  <img src={listing.image} alt={listing.name} />
                ) : (
                  <div className="seller-image-placeholder">
                    novella.
                  </div>
                )}

                <div className="seller-list-info">
                  <p className="product-category">{listing.category}</p>
                  <h3>{listing.name}</h3>
                  <p className="seller-list-price">
                    ₹{listing.price} <span>/ day</span>
                  </p>
                  <p className="seller-list-description">
                    {listing.description}
                  </p>
                  <button
                    className="delete-listing-button"
                    type="button"
                    onClick={() => deleteListing(listing.id)}
                  >
                    Delete listing
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>
        <a className="brand" href="/">
          novella<span>.</span>
        </a>
        <p>Every find has a new story.</p>
        <span>Made for things worth sharing.</span>
      </footer>

      <style jsx>{`
        .sell-page {
          min-height: 100vh;
          background: #f8f5ef;
          color: #343027;
        }

        .sell-hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 64px 24px 44px;
          text-align: center;
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8b7860;
          margin-bottom: 16px;
        }

        .sell-hero h1 {
          font-size: clamp(36px, 6vw, 60px);
          font-weight: 400;
          margin: 0 0 18px;
        }

        .sell-hero h1 em,
        .section-heading h2 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .sell-hero > p:last-child {
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.8;
          color: #746d62;
        }

        .sell-layout {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 72px;
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(250px, 0.7fr);
          gap: 48px;
          align-items: start;
        }

        .sell-form {
          background: #fffefa;
          padding: 32px;
          border: 1px solid #e8e0d4;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
        }

        .sell-form h2 {
          margin: 0 0 8px;
          font-size: 25px;
          font-weight: 400;
        }

        .form-intro,
        .field-note,
        .demo-note {
          color: #81796e;
          font-size: 13px;
          line-height: 1.6;
        }

        .form-intro {
          margin: 0 0 24px;
        }

        .sell-form label {
          margin: 17px 0 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .sell-form input,
        .sell-form select,
        .sell-form textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ded5c8;
          border-radius: 3px;
          padding: 13px 14px;
          background: #fff;
          color: #343027;
          font: inherit;
          font-size: 14px;
        }

        .sell-form input:focus,
        .sell-form select:focus,
        .sell-form textarea:focus {
          outline: 2px solid #bca78a;
          outline-offset: 1px;
        }

        .sell-form textarea {
          resize: vertical;
        }

        .field-note {
          margin: 7px 0 0;
        }

        .primary-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border: none;
          background: #38342c;
          color: #fffdf8;
          padding: 14px 20px;
          text-decoration: none;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
        }

        .primary-button:hover {
          background: #554a3c;
        }

        .full-button {
          width: 100%;
          margin-top: 24px;
        }

        .success-message,
        .error-message {
          padding: 12px 14px;
          margin: 12px 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .success-message {
          background: #edf3e9;
          color: #345a36;
        }

        .error-message {
          background: #f8e9e5;
          color: #8a3028;
        }

        .demo-note {
          text-align: center;
          margin: 14px 0 0;
        }

        .seller-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .seller-note {
          padding: 26px 0;
          border-bottom: 1px solid #e0d7ca;
        }

        .seller-note-number {
          color: #9a8468;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .seller-note h3 {
          font-family: Georgia, serif;
          font-weight: 400;
          font-size: 23px;
          margin: 12px 0;
        }

        .seller-note p {
          color: #746d62;
          line-height: 1.8;
          font-size: 14px;
          margin: 0;
        }

        .my-listings {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 24px;
          margin-bottom: 28px;
        }

        .section-heading h2 {
          font-size: 36px;
          font-weight: 400;
          margin: 0;
        }

        .section-description {
          max-width: 330px;
          color: #746d62;
          font-size: 14px;
          line-height: 1.7;
        }

        .empty-state {
          padding: 32px;
          text-align: center;
          color: #746d62;
          border: 1px dashed #d8cbbb;
        }

        .seller-list-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .seller-list-card {
          background: #fffefa;
          border: 1px solid #e8e0d4;
          min-width: 0;
        }

        .seller-list-card > img,
        .seller-image-placeholder {
          width: 100%;
          height: 210px;
          object-fit: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee6d9;
          color: #8b7860;
        }

        .seller-list-info {
          padding: 18px;
        }

        .product-category {
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8b7860;
        }

        .seller-list-info h3 {
          margin: 8px 0;
          font-size: 18px;
          font-weight: 400;
        }

        .seller-list-price {
          font-weight: 600;
        }

        .seller-list-price span {
          color: #81796e;
          font-weight: 400;
          font-size: 13px;
        }

        .seller-list-description {
          font-size: 13px;
          line-height: 1.6;
          color: #746d62;
          overflow-wrap: anywhere;
        }

        .delete-listing-button {
          border: 1px solid #d8cbbb;
          background: transparent;
          color: #6c4038;
          padding: 10px 12px;
          cursor: pointer;
        }

        .delete-listing-button:hover {
          background: #f8e9e5;
        }

        footer {
          border-top: 1px solid #e8e0d4;
          padding: 28px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          color: #81796e;
          font-size: 13px;
        }

        @media (max-width: 760px) {
          .sell-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .sell-form {
            padding: 22px;
          }

          .seller-list-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .section-heading {
            display: block;
          }

          footer {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .seller-list-grid {
            grid-template-columns: 1fr;
          }

          .navbar {
            gap: 12px;
          }

          .navbar nav {
            gap: 10px;
          }

          .navbar nav a {
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  );
}
