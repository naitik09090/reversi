# Reversi Premium — Classic Othello Strategy

A high-fidelity, performance-optimized Reversi (Othello) implementation built with **React**, **Vite**, and **Framer Motion**. Challenge your friends or test your strategic depth against our built-in AI.

![Reversi Game Showcase](https://images.unsplash.com/photo-1611996598538-d335c2a78311?q=80&w=2070&auto=format&fit=crop)

## ✨ Key Features

- **🎮 Dual Game Modes**: Switch seamlessly between **2-Player (Local)** and **VS AI** modes.
- **🧠 Smart AI**: Built-in AI with multiple difficulty levels using **Minimax with Alpha-Beta Pruning**.
- **📜 Strategic Timeline**: Track every move with a detailed history log and capture commentary.
- **📱 Fluid Responsiveness**: Fully optimized for Desktop, Tablet, and Mobile views with custom touch-friendly controls.
- **🎨 Premium Aesthetics**: Modern dark-themed UI featuring glassmorphism, smooth gradients, and elegant animations.
- **⚡ Performance Optimized**: Minimal re-renders, GPU-accelerated animations, and optimized logic for a lag-free experience.
- **🔊 Immersive Audio**: Procedural sound effects using the **Web Audio API** (no external assets required).

## 🚀 Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Vanilla CSS (Custom Tokens & Modern Layouts)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/naitik09090/reversi.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🧠 AI Implementation

The AI uses a **Minimax algorithm** combined with **Alpha-Beta pruning** to explore potential future board states efficiently.
- **Easy**: Random moves for a casual experience.
- **Medium**: Evaluates moves based on a positional weight table (depth 3), prioritizing corners and edges.

## 📱 Mobile Experience

The game features a custom mobile layout with:
- **Bottom Drawers**: Settings and Move History are accessible via intuitive corner toggles.
- **Touch-Optimized Grid**: Large, accessible hit areas for placing discs.
- **Dynamic Viewport Scaling**: Uses `dvh` units to prevent layout shifts on mobile browsers.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Naitik]
