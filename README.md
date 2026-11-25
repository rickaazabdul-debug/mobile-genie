# Mobile Genie — Phone Store & Express Repair Lab

Modern Next.js (App Router) + Tailwind CSS + Firebase website for **Mobile Genie**, featuring express repair appointment booking, a certified smartphone & accessories storefront, shopping bag reservations, and Firebase Authentication.

## Features

- **Express Repair Services**: Interactive repair catalog (OLED screens, battery swaps, charging ports, water recovery, cameras, diagnostics) that pre-fills the booking form.
- **Certified Storefront**: Searchable and filterable catalog of new & certified refurbished smartphones and accessories with an interactive cart drawer.
- **Firebase Authentication**: Email/password sign-up & sign-in plus Google OAuth (`src/context/AuthContext.tsx`).
- **Cloud Firestore Integration**:
  - `repair_bookings` collection for repair appointments.
  - `orders` collection for in-store pickup reservations.
  - Live **My Tickets & Orders** modal synced via Firestore `onSnapshot`.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (`.env.local` is pre-configured for `mobie-genie`, or copy `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Deploy Firestore Security Rules (`firestore.rules`) in the Firebase Console under **Firestore Database → Rules** and enable **Email/Password** and **Google** providers under **Authentication → Sign-in method**.
