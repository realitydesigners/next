"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play } from "@/fonts";
import { BlockItem, PostsPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
	block: BlockItem;
	slug?: {
		current?: string;
	};
}

interface PostsListProps {
	post: PostsPayload[];
	slug?: {
		current?: string;
	};
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const PostImage: FC<{ image: any; heading: any }> = ({ image, heading }) => {
	if (!image) return null;

	return (
		<div className="relative">
			<SanityImage
				width={500}
				height={500}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="w-full h-[250px] lg:h-[175px] object-cover object-contain rounded-[.7em]"
			/>
		</div>
	);
};

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const formattedDate = publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	const renderHeading = () => {
		return heading || "no title";
	};

	const renderSubheading = () => {
		return subheading || "no subheading";
	};

	return (
		<div className="h-auto border flex flex-col border-gray-600/50 p-2 rounded-[1em]">
			<PostImage image={image} heading={heading} />
			<span
				className={`${monomaniac.className} w-full p-2 pt-4 h-auto  text-xs text-gray-400  uppercase tracking-widest`}
			>
				{formattedDate}
			</span>
			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${monomaniac.className} p-2 text-3xl capitalize leading-none text-gray-200 cursor-pointer`}
					>
						{renderHeading()}
					</h2>
				</Link>
				<p
					className={`${play.className} p-2 text-md leading-tight text-gray-400`}
				>
					{renderSubheading()}
				</p>
			</div>
		</div>
	);
};

const SideBar: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="lg:w-1/4 w-full gap-4 flex flex-col">
			{post.map((postItem) =>
				postItem.block?.map((block, index) =>
					block.heading && block.image ? (
						<PostItem
							key={`${postItem.slug?.current}-${index}`}
							block={block}
							slug={
								postItem.slug?.current
									? { current: postItem.slug.current }
									: undefined
							}
						/>
					) : null,
				),
			)}
		</div>
	);
};

export default SideBar;
