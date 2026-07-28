import React from "react";
import { Link } from "react-router-dom";

export default function CollectionCard({ image, title, subtitle, link }) {
	const isExternal = typeof link === "string" && /^(https?:)?\/\//.test(link);

	const Content = (
		<>
			<div className="overflow-hidden rounded-lg bg-white shadow-sm w-50 h-74">
				<img
					src={image}
					alt={title}
					className="w-full object-cover transition duration-500 hover:scale-105 p-3"
					style={{ height: 200 }}
				/>

				<div className="p-4">
					<h3 className="text-[14px] font-semibold text-gray-900">{title}</h3>
					{subtitle && (
						<p className="text-[12px]  text-gray-500">{subtitle}</p>
					)}

					<div className="mt-2 text-[12px]  font-semibold text-gray-700">+ EXPLORE</div>
				</div>
			</div>
		</>
	);

	if (!link) return Content;

	return isExternal ? (
		<a href={link} target="_blank" rel="noopener noreferrer">
			{Content}
		</a>
	) : (
		<Link to={link}>{Content}</Link>
	);
}

