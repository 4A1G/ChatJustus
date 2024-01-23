# ChatJustus Frontend

This is the react webapp frontend for ChatJustus.

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- ...more in `package.json`

## Project Setup

Unless you want to make changes to the frontend, the frontend is already compiled and hosted on the backend server (`/backend/webapp_static`), so you do not need to run the following just to use the app. Instead, follow the instructions in the `/backend/README.md`.

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### "Deploy" to Backend Server

This simple script will build the project and copy the files to the backend server's static files directory.

```bash
./deploy.sh
```bash