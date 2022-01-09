export default (context, inject) => {
	const copy = (value) => {
		if (value.length) {
			navigator.clipboard.writeText(value);
			context.$toast.success('Copied to clipboard');
		}
		return;
	};
	// Inject $copy(value) in Vue, context and store.
	inject('copy', copy);
	// For Nuxt <= 2.12, also add 👇
	context.$copy = copy;
};
