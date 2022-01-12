import React, { useState } from 'react';
import styles from "./image-card-styles.module.css";

const ImageCard = ({ imgUrl, title, description, date }) => {
	
	const [liked, setLiked] = useState(false);
	

	return (
		<div
			className={styles.card}
		>
			<div className={styles.titleAndDate}>
				<div className={styles.titleContainer}>
					<h4>{title}</h4>
				</div>

				<div className={styles.dateContainer}>
					<h4>{date}</h4>
				</div>
			</div>

			<img onClick={() => {
				setLiked(!liked);
			}} src={imgUrl} alt="" />

			<div className={styles.descContainer}>
				<p>{description}</p>
			</div>

			<div
				className={styles.likeContainer}
				onClick={() => {
					setLiked(!liked);
				}}
				style={{
					boxShadow: liked ? "inset 600px 0 0 0 red" : "none",
					color: liked ? "white" : "black",
					borderTop: liked ? "1px solid red" : "1px solid #d3d3d3",
					transition: "color 0.2s ease-out, border-top 0.3s ease, box-shadow 0.2s ease-out",
				}}
			>{liked ? "Liked" : "Like"}</div>
		</div>
	);
}

export default ImageCard;

