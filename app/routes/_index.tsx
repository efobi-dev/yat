import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "workers/trpc/client";
import { Skeleton } from "~/components/ui/skeleton";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
	const authz = await auth.api.getSession({ headers: request.headers });
	return { user: authz?.user.name };
}

export default function Index({ loaderData }: Route.ComponentProps) {
	const { user } = loaderData;
	const trpc = useTRPC();
	const { data, error, isPending } = useQuery(
		trpc.public.hello.queryOptions(user),
	);
	return (
		<main className="flex flex-col items-center justify-center h-screen">
			{error?.message}
			This is the homepage
			<h1>{isPending ? <Skeleton /> : data ? data : "Guest"}</h1>
			{!user && "Sign in to continue"}
		</main>
	);
}
