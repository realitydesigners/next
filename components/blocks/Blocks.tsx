"use client";
import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	ImageCanvasBlock,
	TeamBlock,
} from "@/components/blockstyles/index";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import {
	DarkTemplate,
	LightTemplate,
	TeamTemplate,
	VideoTemplate,
} from "./Templates";

type LayoutTheme = "dark" | "light" | "team" | "video";
type BlockType =
	| "headingBlock"
	| "headingSplineBlock"
	| "contentBlock"
	| "teamBlock"
	| "imageCanvasBlock";

export interface BlockProps {
	_type: BlockType;
	layout?: LayoutTheme;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	content?: any;
}

const templateComponents: Record<LayoutTheme, PortableTextComponents> = {
	dark: DarkTemplate as PortableTextComponents,
	light: LightTemplate as PortableTextComponents,
	team: TeamTemplate as PortableTextComponents,
	video: VideoTemplate as PortableTextComponents,
};

const blockTypeComponents: Record<
	BlockType,
	(props: BlockProps) => JSX.Element | null
> = {
	headingBlock: (props) => (
		<HeadingBlock block={{ ...props, className: props.layout }} />
	),
	headingSplineBlock: (props) => (
		<HeadingSplineBlock block={{ ...props, className: props.layout }} />
	),
	contentBlock: ({ layout, content }) => (
		<ContentBlock
			content={content}
			className={layout === "dark" ? "bg-black" : "bg-gray-200"}
			components={templateComponents[layout || "light"]}
		/>
	),
	teamBlock: (props) => <TeamBlock block={props} />,
	imageCanvasBlock: (props) => (
		<ImageCanvasBlock block={{ ...props, className: props.layout }} />
	),
};

const Blocks: React.FC<{ block: BlockProps }> = ({ block }) => {
	const BlockComponent = blockTypeComponents[block._type];
	return <>{BlockComponent ? BlockComponent(block) : null}</>;
};

export default Blocks;