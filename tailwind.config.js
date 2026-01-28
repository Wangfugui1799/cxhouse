/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 方案A 温馨优雅色调
                cream: {
                    50: '#FFFEF9',
                    100: '#FAF9F6',
                    200: '#F5F3EE',
                    300: '#EBE8E0',
                },
                wood: {
                    100: '#F5E6D3',
                    200: '#E8D4BC',
                    300: '#DEB887',
                    400: '#C9A86C',
                    500: '#B8956A',
                },
                warm: {
                    orange: '#FF8C42',
                    coral: '#FF6B6B',
                    gold: '#FFB347',
                },
                text: {
                    primary: '#2C2C2C',
                    secondary: '#5C5C5C',
                    muted: '#8C8C8C',
                }
            },
            fontFamily: {
                sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'card': '16px',
                'card-lg': '24px',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
                'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
            },
            transitionDuration: {
                '400': '400ms',
            }
        },
    },
    plugins: [],
}
