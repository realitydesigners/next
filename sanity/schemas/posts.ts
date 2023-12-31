import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDefinition } from "sanity"; // Import the SchemaTypeDefinition type

export default defineType({
	type: "document",
	name: "posts",
	title: "Posts",
	fields: [
		defineField({
			type: "slug",
			name: "slug",
			title: "Slug",
			options: {
				source: "block.0.heading",
			},
		}),
		defineField({
			name: "block",
			title: "Content Block",
			type: "array",
			of: [
				{
					type: "headingBlock",
					title: "Heading",
				},
				{
					type: "headingSplineBlock",
					title: "Heading Spline",
				},
				{
					type: "contentBlock",
					title: "Content",
				},
				{
					type: "teamBlock",
					title: "Team",
				},
				{
					title: "Image Canvas",
					type: "imageCanvasBlock",
				},
			],
		}),
		defineField({
			name: "subcategories",
			title: "Subcategories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
	],
	preview: {
		select: {
			title: "block.0.heading",
			subheading: "block.0.subheading",
			media: "block.0.image",
		},
		prepare(selection) {
			const { title, media, subheading } = selection;
			return {
				title: title || "Untitled",
				media: media,
				subtitle: subheading,
			};
		},
	},
});
