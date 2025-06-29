import { useCallback, useState } from 'react';

export default function useIsInViewport() {
	const [isInViewport, setSsInViewport] = useState(false);

	const refCallback = useCallback((ref: HTMLDivElement | null) => {
		if (!ref) {
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				setSsInViewport(entries.some((entry) => entry.isIntersecting));
			},
			{ root: null, rootMargin: '300px' }
		);

		observer.observe(ref);

		return () => {
			observer.disconnect();
		};
	}, []);

	return { isInViewport, refCallback };
}
