// Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, templateName }) => {
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
					padding: "2%",
					border: "2px solid #000",
					borderRadius: "10px",
					boxShadow: "2px solid black",
				}}
			>
                <h2>Please provide the template name:</h2>
                <input onChange={e => {templateName = e.target.value}} type="text" name="templateName"></input>
                <button onClick={saveBtnClicked}>Save</button>
			</div>
		</div>
	);
};

export default Modal;
