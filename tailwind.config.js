/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx, scss, css}",
	],
	theme: {
		container: {
			padding: '2rem',
			center: true,
		},
		extend: {
			fontFamily: {
				'roboto-thin': ['Roboto-thin', 'sans-serif'], //Вариант-1 написания
				roboto_light: ['Roboto-Light', 'sans-serif'], //Вариант-2 написания
				'roboto-regular': ['Roboto-Regular', 'sans-serif'], 
				'roboto-medium': ['Roboto-Medium', 'sans-serif'],
				'roboto-bold': ['Roboto-Bold', 'sans-serif'],
				'roboto-black': ['Roboto-Bold', 'sans-serif']
			}
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('@tailwindcss/forms'),
	],
}

