/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // layout.tsx에서 정의한 --font-myeongjo 변수를 font-serif에 연결
                serif: ["var(--font-myeongjo)", "serif"],
                // layout.tsx에서 정의한 --font-sans 변수를 font-sans에 연결
                sans: ["var(--font-sans)", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;