"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play, space } from "@/fonts";
import { BlockItem, PostsPayload } from "@/types";
import Image from "next/image";
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
				classesWrapper="w-full h-[50vw] md:h-[33vw] lg:h-[15vw] object-cover object-contain  -[.7em]"
			/>
		</div>
	);
};

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const imageUrl = block.imageRef?.imageUrl;

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
		<div className="group flex h-auto flex-col border-gray-600/50 p-1 transition duration-300 ease-in-out hover:shadow-lg">
			<div className="overflow-hidden">
				{/* Apply scaling on hover to the image */}
				<div className="transform transition duration-300 ease-in-out group-hover:scale-105">
					{/* <PostImage image={image} heading={heading} /> */}
					<Image
						src={imageUrl}
						width={300}
						height={300}
						alt={"this"}
						className="-[.7em] h-[50vw] w-full object-contain object-cover md:h-[33vw]  lg:h-[15vw]"
					/>
				</div>
			</div>
			<span
				className={`${monomaniac.className} h-auto w-full bg-gradient-to-r from-blue-100/50 to-blue-100/50 bg-clip-text p-1 pt-2 text-xs uppercase  tracking-widest text-transparent`}
			>
				{formattedDate}
			</span>
			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${space.className} cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 bg-clip-text p-1 text-4xl font-bold capitalize leading-[1.2em] text-transparent`}
					>
						{renderHeading()}
					</h2>
				</Link>
				<p
					className={`${space.className} bg-gradient-to-r from-blue-100/50 to-blue-100/50 bg-clip-text p-1 text-lg leading-tight text-transparent`}
				>
					{renderSubheading()}
				</p>
			</div>
		</div>
	);
};

const PostsList: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
			{post.map((postItem) =>
				postItem.block?.map((block, index) =>
					block.heading && block.imageRef ? (
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

export default PostsList;
