"use client";
import React, { useEffect, useState, useRef } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { feedQuery } from "@/sanity/lib/queries";
import { PostsPayload, VideoPayload, Image } from "@/types";
import PostItem from "@/components/feed/PostItem";
import VideoItem from "@/components/feed/VideoItem";
import ImageItem from "@/components/feed/ImageItem";
import { useAnimateOnScroll } from "@/components/effects/useAnimateOnScroll";

type FeedItem = PostsPayload | VideoPayload | Image;

export default function FeedPage() {
	const [items, setItems] = useState<FeedItem[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useAnimateOnScroll(".feed-item", {}, process.env.NODE_ENV === "development");

	useEffect(() => {
		async function fetchData() {
			const feedItems: FeedItem[] = await sanityFetch({
				query: feedQuery,
				tags: ["post"],
			});
<<<<<<< HEAD

=======
>>>>>>> feed
			setItems(feedItems);
		}

		fetchData();
	}, []);

	return (
		<div
			ref={containerRef}
			className="w-full min-h-screen pt-16 p-2 grid grid-cols-1 lg:grid-cols-3 gap-4"
		>
			{items.map((feedItem, index) => {
				const key = feedItem._id || index;
				return (
					<div key={key} className="feed-item">
						{feedItem._type === "posts" && feedItem.block?.[0] && (
							<PostItem block={feedItem.block[0]} slug={feedItem.slug} />
						)}
						{feedItem._type === "video" && (
							<VideoItem videos={feedItem as VideoPayload} />
						)}
						{feedItem._type === "img" && (
							<ImageItem image={feedItem as Image} />
						)}
					</div>
				);
			})}
		</div>
	);
}
