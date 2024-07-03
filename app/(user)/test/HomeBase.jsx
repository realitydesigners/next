"use client";
import Navbar from "@/components/navigation/Navbar";
import React, { useState, useRef } from "react";
import SplineScene from "./SplineScene";


function setSplineVariables(spline, updates) {
	// biome-ignore lint/complexity/noForEach: <explanation>
	updates.forEach(({ objectName, variableName, value }) => {
		const obj = spline.findObjectByName(objectName);
		if (obj) {
			console.log(`${objectName} object:`, obj);
			spline.setVariable(variableName, value);
		} else {
			console.log(`${objectName} object not found`);
		}
	});
}

const HomeBase = ({ postData }) => {
	console.log(postData);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedObjectName, setSelectedObjectName] = useState(null);
	const splineRef = useRef(null);

	function closeModal() {
		setModalOpen(false);
	}

	function onSplineMouseDown(e) {
		const object = e.target.obj || e.target;

		if (object) {
			console.log("Clicked object:", object);
			const objectName = object.name;
			setSelectedObjectName(objectName);
			setModalOpen(true);
		} else {
			console.error("Clicked object does not have a name property:", e.target);
		}
	}

	function onLoad(spline) {
		splineRef.current = spline;
		const updates = [
			{
				objectName: "Text 5",
				variableName: "TextVariable",
				value: `${postData.block[0].heading}`,
			},
			// Add more updates here as needed
		];
		setSplineVariables(spline, updates);
	}

	return (
		<main className="w-screen h-screen">
			<Navbar />
			<div className="relative w-screen h-screen">
				<SplineScene onSplineMouseDown={onSplineMouseDown} onLoad={onLoad} />
				<Modal
					isOpen={modalOpen}
					onClose={closeModal}
					objectName={selectedObjectName}
					postData={postData}
				/>
			</div>
		</main>
	);
};

export default HomeBase;

const Modal = ({ isOpen, onClose, objectName, postData }) => {
	if (!isOpen) return null;

	let modalContent = null;

	switch (objectName) {
		case "ClickThis":
			modalContent = (
				<div className="bg-white p-4 rounded-lg shadow-lg">
					<h2 className="text-lg font-bold mb-4">POSTS</h2>
					<p>Object Name: {objectName}</p>
					<div className="p-4 text-white">
						<h1 className="text-black">{postData.block[0].heading}</h1>
					</div>
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			);
			break;
		case "Monitor 2":
			modalContent = (
				<div className="p-4 w-full h-full bg-black rounded-lg shadow-lg text-white">
					<h2 className="text-lg font-bold mb-4">VIDEOS</h2>
					<p>Object Name: {objectName}</p>
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			);
			break;
		default:
			modalContent = null;
	}

	return (
		<dialog
			open={isOpen}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		>
			{modalContent}
		</dialog>
	);
};
