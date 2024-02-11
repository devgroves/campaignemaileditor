// Modal.js

import React from "react";

interface ModalProps {
	isOpen:boolean;
	onClose: (templateName: string) => Promise<void>;
	templateName:string;
}
const Modal = ({ isOpen, onClose, templateName }: ModalProps) => {
	if (!isOpen) return null;

	const saveBtnClicked = () => {
		console.log("save button click");
		console.log("templatename ", templateName);
		onClose(templateName);
	};

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					background: "whitesmoke",
					margin: "auto",
					padding: "5%",
					border: "2px solid #000",
					borderRadius: "10px",
					boxShadow: "2px solid black",
				}}
				className="flex flex-col justify-center items-center"
			>
				<h2 className="font-semibold  p-2 text-gray-500 dark:text-gray-400">Please provide the template name:</h2>
				<input onChange={e => { templateName = e.target.value }} type="text" name="templateName" 
					className="bg-gray-50 p-2 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				<button onClick={saveBtnClicked} className="w-56">Save</button>
			</div>
		</div>
	);
};

export default React.memo(Modal);
