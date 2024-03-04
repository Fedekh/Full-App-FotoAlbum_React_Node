# Getting Started with Create React App

```
npx create-react-app my-project
```

## Install react-router
```
npm i react-router
```
## Install tailwind

```
npm install -D tailwindcss
npx tailwindcss init
```

### Configure your template paths

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS
#### Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ```npm start```