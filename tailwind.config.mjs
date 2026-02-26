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
                // 이제 font-serif 클래스를 쓰면 나눔명조가 나옵니다.
                serif: ["var(--font-myeongjo)", "serif"],
                // 이제 font-sans 클래스를 쓰면 노토산스가 나옵니다.
                sans: ["var(--font-sans)", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;