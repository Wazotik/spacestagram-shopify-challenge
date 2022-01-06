import React, { useState } from 'react';
import styles from "./image-card-styles.module.css";

const ImageCard = ({ imgUrl, title, description, date }) => {
	
	const [liked, setLiked] = useState(false);
	

	return (
		<div className={styles.card} onClick={() => {
			setLiked(!liked);
		}}>

			<div className={styles.titleContainer}>
				<h4>{title}</h4>
			</div>

			<div className={styles.dateContainer}>
				<h4>{date}</h4>
			</div>

			<img src={imgUrl} alt="" />

			<div className={styles.descContainer}>
				<h4>{description}</h4>
			</div>

			<div className={styles.likeContainer} style={{
				opacity: liked ? "1" : "0",
				height: liked ? "50px" : "0px",
				transition: liked ? "opacity 1s ease-in-out, height 0.5s ease-in-out" : "opacity 0.5s ease-in-out, height 0.5s ease-in-out",
			}}>Liked</div>

			{/* <div className={styles.buttonContainer}>
				<button className={styles.likeButton}>Like</button>
			</div> */}

		</div>
	)
}

export default ImageCard;

