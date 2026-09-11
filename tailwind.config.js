/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				rise: {
					from: { transform: 'translateY(12px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
			},
			animation: { rise: 'rise .25s ease-out' },
		},
	},
	plugins: [],
};