import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";

export default async function LibraryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-screen bg-gray-200">
			<Navbar pageBackground="light" />
			{children}
			<Footer />
		</div>
	);
}
