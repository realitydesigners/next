export default async function IndexPage({
	children,
}: { children: React.ReactNode }) {
	return <div className="w-full h-screen bg-black">{children}</div>;
}
