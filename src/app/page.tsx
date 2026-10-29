
"use client";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

const starterItems: Item[] = [
  {
    id: 1,
    name: "Classic Ivory Handbag",
    category: "Accessories",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
    description:
      "An elegant ivory handbag for special occasions and everyday styling.",
  },
  {
    id: 2,
    name: "Minimal Gold Jewellery",
    category: "Jewellery",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700",
    description:
      "Timeless jewellery to complete your favourite outfits.",
  },
  {
    id: 3,
    name: "Designer Evening Dress",
    category: "Clothing",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700",
    description:
      "A statement outfit for celebrations and memorable evenings.",
  },
  {
    id: 4,
    name: "Everyday Mini Bag",
    category: "Accessories",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700",
    description:
      "A versatile mini bag for outings, college and weekend plans.",
  },
  {
    id: 5,
    name: "Handmade Ceramic Vase",
    category: "Handmade",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=700",
    description:
      "A handcrafted decorative piece to bring warmth to your space.",
  },
  {
    id: 6,
    name: "Statement Sunglasses",
    category: "Accessories",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
    description:
      "A stylish finishing touch for sunny days and weekend trips.",
  },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>(starterItems);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Item | null>(null);
  const [days, setDays] = useState(2);
  const [message, setMessage] = useState("");

  
useEffect(() => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("novellaListings") || "[]"
    ) as Item[];

    if (Array.isArray(saved)) {
      const allItems = [...saved, ...starterItems];

      // Remove duplicate listings using their name
      const uniqueItems = allItems.filter(
        (item, index, self) =>
          index === self.findIndex(
            (other) =>
              other.name.trim().toLowerCase() ===
              item.name.trim().toLowerCase()
          )
      );

      setItems(uniqueItems);
    } else {
      setItems(starterItems);
    }
  } catch {
    setItems(starterItems);
  }
}, []);


  const categories = [
    "All",
    "Clothing",
    "Accessories",
    "Jewellery",
    "Handmade",
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  function bookItem() {
    if (!selected) return;

    const total = selected.price * days;

    const booking = {
      id: Date.now(),
      item: selected.name,
      days,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("novellaBookings") || "[]"
      );

      if (!Array.isArray(existing)) {
        throw new Error("Invalid booking data");
      }

      localStorage.setItem(
        "novellaBookings",
        JSON.stringify([...existing, booking])
      );

      setMessage(
        `Demo booking saved! ${selected.name} for ${days} ${
          days === 1 ? "day" : "days"
        }. Total: ₹${total}.`
      );

      setSelected(null);
    } catch {
      setMessage("Could not save the booking. Please try again.");
    }
  }

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="/">
          novella<span>.</span>
        </a>

        <nav>
          <a href="/#explore">Explore</a>
          <a href="/#how-it-works">How it works</a>
          <a href="/bookings">My Rentals</a>
        </nav>

        <a className="nav-button" href="/sell">
          List an item ↗
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            A MORE THOUGHTFUL WAY TO DISCOVER
          </p>

          <h1>
            Find something
            <br />
            <em>worth sharing.</em>
          </h1>

          <p className="hero-description">
            Beautiful things deserve more than one story.
            Discover special finds, rent what you love, and
            give every item a new chapter.
          </p>

          <a className="primary-button" href="#explore">
            Discover the collection <span>↗</span>
          </a>

          <p className="hero-note">
            Less waste. More stories. Better finds.
          </p>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200"
            alt="Carefully curated fashion collection"
          />

          <div className="image-note">
            <span>THE ART OF SHARING</span>
            <strong>One find. A new story.</strong>
          </div>
        </div>
      </section>

      <section className="values">
        <div>
          <span>01</span>
          <p>Discover unique finds</p>
        </div>
        <div>
          <span>02</span>
          <p>Rent for the days you need</p>
        </div>
        <div>
          <span>03</span>
          <p>Give every item another story</p>
        </div>
      </section>

      <section className="collection" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR NEXT FAVOURITE FIND</p>
            <h2>
              Curated for <em>you.</em>
            </h2>
          </div>

          <p className="section-description">
            From everyday essentials to special occasion pieces,
            find something that feels like you.
          </p>
        </div>

        <div className="search-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search bags, jewellery, clothing..."
            aria-label="Search rentals"
          />

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "category active" : "category"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div className="success-message">
            {message}
            <button onClick={() => setMessage("")}>
              Dismiss
            </button>
          </div>
        )}

        <div className="product-grid">
          {filteredItems.map((item) => (
            <article className="product-card" key={item.id}>
              <button
                className="product-image"
                onClick={() => {
                  setSelected(item);
                  setDays(2);
                }}
                aria-label={`View ${item.name}`}
              >
                <img
  src={
    item.image ||
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700"
  }
  alt={item.name}
/>
                <span className="view-tag">View details ↗</span>
              </button>

              <div className="product-info">
                <div>
                  <p className="product-category">
                    {item.category}
                  </p>
                  <h3>{item.name}</h3>
                </div>

                <div className="price">
                  <strong>₹{item.price}</strong>
                  <span>/ day</span>
                </div>
              </div>

              <button
                className="rent-button"
                onClick={() => {
                  setSelected(item);
                  setDays(2);
                }}
              >
                Rent this item <span>↗</span>
              </button>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="empty-state">
            No items found. Try a different search or category.
          </p>
        )}
      </section>

      <section className="how-it-works" id="how-it-works">
        <p className="eyebrow">SIMPLE BY DESIGN</p>
        <h2>
          Good things are <em>better shared.</em>
        </h2>

        <div className="steps">
          <div>
            <span>01</span>
            <h3>Find your thing</h3>
            <p>
              Explore unique items chosen to make everyday moments special.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Choose your days</h3>
            <p>
              Select how long you need an item and see the rental total.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Start a new story</h3>
            <p>
              Save a demo booking and discover a more thoughtful way to use things.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="/">
          novella<span>.</span>
        </a>
        <p>Every find has a new story.</p>
        <span>Made for things worth sharing.</span>
      </footer>

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Rental details"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>

            <img src={selected.image} alt={selected.name} />

            <div className="modal-content">
              <p className="eyebrow">{selected.category}</p>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>

              <label htmlFor="rental-days">
                Rental duration
              </label>

              <select
                id="rental-days"
                value={days}
                onChange={(event) =>
                  setDays(Number(event.target.value))
                }
              >
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <option key={day} value={day}>
                    {day} {day === 1 ? "day" : "days"}
                  </option>
                ))}
              </select>

              <div className="total-row">
                <span>Total rental price</span>
                <strong>₹{selected.price * days}</strong>
              </div>

              <button
                className="primary-button full-button"
                onClick={bookItem}
              >
                Save demo booking ↗
              </button>

              <p className="demo-note">
                Demo only. No payment or real reservation is made.
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
