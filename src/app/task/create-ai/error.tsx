"use client";

import { useEffect } from "react";

export default function ErrorFallbackContent({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.log(
			"========================== error component ==========================",
		);
		console.log(error);
	}, [error]);

	return (
		<div>
			<p>{error.message}</p>
			<button type="button" onClick={reset}>
				reset
			</button>
		</div>
	);
}
