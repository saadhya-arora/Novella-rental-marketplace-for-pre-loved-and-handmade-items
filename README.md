
# Novella — Every Find Has a New Story

Novella is a web-based rental marketplace for pre-loved products and handmade creations. It aims to make temporary access to useful items easier, helping people rent items they need without always having to purchase them.

**Tagline:** Every Find Has a New Story.

## About the Project

People often buy products for occasional use while many useful belongings remain unused. Novella explores an alternative through a rental marketplace where users can browse items, view rental prices, create listings, and book items for a selected duration.

The project focuses on a simple, accessible user experience with a minimal beige-and-ivory visual identity.

## Features

- **Browse Items:** Explore available products on the homepage.
- **Search and Categories:** Find items using search and category filters.
- **Item Details:** View item descriptions, categories, and daily rental prices.
- **Seller Listings:** Create listings with a name, category, price, description, and optional image URL.
- **Rental Duration:** Select a rental period for an item.
- **Price Calculation:** Calculate the demo rental cost based on the daily price and selected duration.
- **Booking Management:** Save and view demo bookings on the My Rentals page.
- **Listing Management:** View and delete saved listings.
- **Browser Storage:** Retain listing and booking data using browser localStorage.

## Tech Stack

- **Framework:** Next.js
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** CSS and JSX-based styling
- **Storage:** Browser localStorage
- **Development Tools:** Node.js and npm

## Main Pages

| Page | Purpose |
|---|---|
| `/` | Browse and search rental items |
| `/sell` | Create and manage item listings |
| `/bookings` | View saved demo bookings |

## Getting Started

### Prerequisites

Install Node.js and npm.

### 1. Clone the repository

```bash
git clone YOUR_PUBLIC_REPOSITORY_URL
```

Replace `YOUR_PUBLIC_REPOSITORY_URL` with the actual public GitHub repository URL.

### 2. Navigate to the project directory

```bash
cd novella-rental-marketplace
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm run dev
```

## Current Limitations

This is a working prototype demonstrating the core marketplace experience.

- Listings and bookings are stored in the browser using localStorage.
- Data is not shared between different browsers or devices.
- Image input accepts a public image URL; direct file upload is not implemented.
- Real payments, a shared database, and user authentication are not implemented.
- AI-based listing generation is not implemented in the current version.

## Future Improvements

- Add a shared database and backend API.
- Implement user accounts and seller profiles.
- Support direct image uploads.
- Add secure rental transactions and payment integration.
- Explore AI-assisted item categorisation and description generation.
- Improve booking management and rental availability tracking.

## Project Vision

Novella encourages people to make better use of existing belongings by making useful and unique items accessible for temporary use.

**Every item has a story. Pass it on to start a new chapter.**
