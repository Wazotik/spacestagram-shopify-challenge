import styles from "./App.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageCard from "./components/image-card";
import { BiUpArrowAlt } from "react-icons/bi";

const App = () => {
	// const [data, setData] = useState([]);
	const [imageElements, setImageElements] = useState([]);

	const updateData = async () => {
		const res = await axios.get("/data");
		let data = res.data;
		console.log(data);

		setImageElements(
			data.map((object) => {
				let mediaType = object.media_type;
				if (mediaType === "image") {
					return <ImageCard key={object.url} imgUrl={object.url} title={object.title} description={object.explanation} date={object.date}></ImageCard>
				}
				return null;
			})
		)

	};
	
	useEffect(() => {
		updateData();
	}, [])



	return (
		<div className={styles.main}>

			<a href="#top" className={styles.toTopButton}><BiUpArrowAlt size={100} /></a>

			<header>
				<nav>
					<div id="top">Spacestagram</div>
				</nav>
			</header>
			
			<main>
				<div className={styles.imgContainer}>{imageElements}</div>
			</main>


			<footer></footer>
		</div>
	);
};

export default App;
