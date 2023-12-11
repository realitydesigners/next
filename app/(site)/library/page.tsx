import { loadCategories } from "@/sanity/loader/loadQuery";
import LibraryScene from "@/components/library/LibraryScene";

export default async function CategoryPage() {
	const categories = await loadCategories();
	return (
		<div className="w-screen h-screen bg-gray-200">
			<LibraryScene category={categories} />
		</div>
	);
}
