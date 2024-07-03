import Navbar from "@/components/navigation/Navbar";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";
import HomeBase from "./HomeBase";

export default async function IndexPage() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const postData = posts[0];

	return (
		<main className="flex w-full flex-col bg-black">
			<Navbar />
			<HomeBase postData={postData} />
		</main>
	);
}
