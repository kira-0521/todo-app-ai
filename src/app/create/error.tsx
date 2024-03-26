"use client";

export default function ErrorFallbackContent({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div>
			<p>{error.message}</p>
			<button type="button" onClick={reset}>
				reset
			</button>
		</div>
	);
}
