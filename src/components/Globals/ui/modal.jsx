"use client";

import useStopScroll from "@/hooks/useStopScroll";
import { useEffect, useState } from "react";
import reactDOM from "react-dom";

const Modal = ({ children, toggleModal }) => {
	const [container, setContainer] = useState(null);

	//prevent page scroll when modal is opened
	useStopScroll();

	useEffect(() => {
		const portalContainer = document.createElement("div");
		document?.body?.appendChild(portalContainer);
		setContainer(portalContainer);
		return () => {
			document?.body?.removeChild(portalContainer);
		};
	}, []);

	return (
		container &&
		reactDOM.createPortal(
			<div className='fixed top-0 left-0  w-full h-full z-[200]'>
				<div
					className='fixed top-0 left-0 h-full w-full backdrop-blur-[8px] op flex cursor-pointer items-center justify-center z-[200]'
					onClick={toggleModal}
				>
					{children}
				</div>
			</div>,
			container
		)
	);
};

export default Modal;
