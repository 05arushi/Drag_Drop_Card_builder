# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Custom Card Builder

The Custom Card Builder is an interactive web application developed with React.js, utilizing the Craft.js framework to enable a flexible and intuitive drag-and-drop editing experience. It empowers users to design fully customized cards without writing a single line of code.

Users can visually assemble their cards by dragging and dropping reusable components such as text, buttons, images, image galleries, dividers, lists, and tables. Each component includes extensive customization options like font styling, color schemes, spacing, alignment, and background settings. The layout system supports nested containers such as rows and columns, allowing both simple and complex card structures to be built effortlessly.

The application also provides a variety of background customization options, including color palettes, patterns, and custom image uploads, enabling users to create visually appealing and on-brand designs. Users can upload a single image or an entire image gallery to integrate rich media content directly into their cards.

A key feature of the builder is its multi-format export capability, allowing users to download their finished cards in PNG, SVG, or JPG formats. This makes the tool suitable for creating assets for digital platforms, printing, or embedding into websites and marketing materials.

This project highlights practical use of Craft.js for real-time visual editing and React component design for modularity and scalability. It offers a user-friendly alternative to traditional design tools, ideal for designers, marketers, and content creators looking to rapidly generate professional-looking cards through a browser interface.

## Features
- Drag-and-drop editor (Craft.js)
- Component customization
- Background patterns & colors
- Export as PNG, JPG, SVG

## Setup
```bash
npm install
npm run dev