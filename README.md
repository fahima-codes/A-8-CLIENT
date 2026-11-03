# StudioSpace - Creative Studio Marketplace

A high-performance peer-to-peer marketplace for creators, filmmakers,
photographers, podcasters, and musicians to discover and book creative spaces.

**Live Site URL:** https://a-8-client-six.vercel.app

---

### ✨ Key Features

- **Dynamic Studio Discovery:** Explore all studios with category filtering
  (Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop), search, and
  real-time availability with `.limit(6)` featured section on Home.
- **Secure Auth with BetterAuth:** Email/Password login with strong validation +
  Google Social Login. JWT stored in HTTPOnly cookies, protected private routes
  don't redirect on reload.
- **Complete CRUD & Booking System:** Hosts can Add, Update, Delete their
  listings with imgbb image upload. Users can book studios with double-booking
  prevention logic that checks time overlap against Confirmed bookings.
- **Advanced UI/UX:** Custom 404 page, branded skeleton loaders, empty states
  with CTA, Sonner toast for all actions (no alert/lorem), theme toggling
  (light/dark), fully responsive with Swiper.js slider.
- **Host & Creator Ecosystem:** Wishlist (Save Studios), PDF Invoice for
  bookings, Dashboard, My Listings, My Bookings with status
  (Pending/Confirmed/Cancelled), Host Guarantee & How It Works sections.

### 🛠️ Tech Stack

| Layer          | Technology                                                              |
| -------------- | ----------------------------------------------------------------------- |
| Frontend       | Next.js 15 (App Router), TypeScript, Shadcn UI, Tailwind CSS, Swiper.js |
| Authentication | BetterAuth, MongoDB Adapter, JWT (HTTPOnly Cookie)                      |
| Backend        | Express.js, Node.js, MongoDB, Mongoose                                  |
| Tools          | imgbb API, Sonner Toast, PDF Generator                                  |

### 💻 Local Setup Steps

1. **Clone Client & Server:**
   ```bash
   git clone https://github.com/fahima-codes/A-8-CLIENT
   git clone https://github.com/fahima-codes/A-8-SERVER
   ```
