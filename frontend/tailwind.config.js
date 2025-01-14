/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./shared/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./entities/**/*.{js,ts,jsx,tsx}",
        "./widgets/**/*.{js,ts,jsx,tsx}",
        "./features/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opactiy: 1 }
                },
                scaleLg: {
                    from: { scale: 1 },
                    "50%": { scale: 1.5 },
                    to: { scale: 1 }
                },
                scaleAndFadeout: {
                    from: { opacity: 0.5, scale: 0.5 },
                    "50%": { opacity: 1, scale: 1.2 },
                    to: { opacity: 0, scale: 1.7 }
                }
            },
            animation: {
                fadeIn: "fadeIn .5s ease-in-out",
                scaleLg: "scaleLg .35s ease-in-out", // not used so far
                scaleAndFadeout: "scaleAndFadeout .35s ease-in-out"
            }
        }
    },
    plugins: []
};
