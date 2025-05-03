import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Index() {
	const [num, setNum] = useState(0);
	return (
		<main className="flex flex-col items-center justify-center h-screen">
			This is the homepage
			<Button onClick={() => setNum((prev) => prev + 1)}>{num}</Button>
		</main>
	);
}
