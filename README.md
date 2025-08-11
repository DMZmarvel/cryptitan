🚀 Cryptitan-Style Dashboard Clone
Front-end-only Next.js + Tailwind + MUI project replicating core pages of Cryptitan.
Includes authentication flow, forgot/reset password process, mock data system, and responsive tables.
Perfect for UI/UX prototyping and frontend practice — no backend required.



📖 Overview
This is a front-end implementation of selected Cryptitan dashboard pages, built with Next.js, Tailwind CSS, and Material UI.
It simulates authentication, dashboard navigation, commerce/peer/exchange/stake modules, and includes a forgot/reset password flow — all without any backend API.

🌍 Live Demo
https://cryptitan-xi.vercel.app/

🛠 Tech Stack
Framework: Next.js 14+

Styling: Tailwind CSS, Material UI

Icons: react-icons

State Management: React useState/useEffect

Data Storage: localStorage (simulated backend)

✨ Features
🔑 Authentication
Register (stores user in localStorage)

Login (validates stored user)

Demo Login for quick preview

Logout (clears user session)

Avatar initials from username/email

🔄 Forgot & Reset Password
Full 3-step simulated process:

Forgot Password: Enter email → store reset request

Verify Code: 6 masked boxes, resend timer, validation

Reset Password: Update local user password → redirect to login

📊 Dashboard Pages
Main: Home, Profile, Payments, Wallets

Commerce: Dashboard, Transactions, Payments, Customers, Account

Peer: Buy Crypto, Sell Crypto, Create Offer, Trades

Exchange: Trade, Swap

Stake: Plans, Manage

🧩 UI/UX
Collapsible mobile-friendly sidebar

Topbar with glassmorphic effect & profile dropdown

Mock data toggle for quick previews

Fully responsive tables & layouts
