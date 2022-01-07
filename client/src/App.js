import styles from "./App.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageCard from "./components/image-card";
import { BiUpArrowAlt } from "react-icons/bi";
import { SpinnerCircular } from "spinners-react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const App = () => {
	const [data, setData] = useState([]);
	const [imageElements, setImageElements] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [scrollPositionY, setScrollPositionY] = useState(0);

	const [topButtonHovered, setTopButtonHovered] = useState(false);

	const updateData = async () => {
		try {
			const res = await axios.get("/data");
			setData(res.data);
			setDataLoaded(true);

			let currData = res.data;
			setImageElements(
				currData.map((object) => {
					let mediaType = object.media_type;
					if (mediaType === "image") {
						return <ImageCard key={object.url} imgUrl={object.url} title={object.title} description={object.explanation} date={object.date}></ImageCard>
					}
					return null;
				})
			)
		}
		catch (e) {
			console.log(e);
		}
	};

	useScrollPosition(({ prevPos, currPos }) => {
		setScrollPositionY(currPos.y);
	});

	const convertDateStringToDateObject = (dateStr) => {
		// 2020-12-15
		let year = parseInt(dateStr.substring(0,4));
		let month = parseInt(dateStr.substring(5,7));
		let day = parseInt(dateStr.substring(8,10));
		let dateObject = new Date(year, month, day);

		return dateObject;
	}
	
	const sortData = (sortType) => {
		if (sortType === "latest") {
			data.sort((a, b) => {
				let aDate = convertDateStringToDateObject(a.date);
				let bDate = convertDateStringToDateObject(b.date);
				if (aDate > bDate) {
					return -1;
				}
				else if (aDate < bDate) {
					return 1;
				}
				else {
					return 0;
				}
			});
		}
		else if (sortType === "oldest") {
			data.sort((a, b) => {
				let aDate = convertDateStringToDateObject(a.date);
				let bDate = convertDateStringToDateObject(b.date);
				if (aDate < bDate) {
					return -1;
				}
				else if (aDate > bDate) {
					return 1;
				}
				else {
					return 0;
				}
			});
		}

		setImageElements(
			data.map((object) => {
				let mediaType = object.media_type;
				if (mediaType === "image") {
					return <ImageCard key={object.url} imgUrl={object.url} title={object.title} description={object.explanation} date={object.date}></ImageCard>
				}
				return null;
			})
		)
	}

	
	useEffect(() => {
		updateData();
	}, [])



	return (
		<div className={styles.main}>


			<header id="top">
				<nav>
					<div className={styles.logo}>Spacestagram</div>
				</nav>

				<div className={styles.sortButtonsContainer}>
					<button onClick={() => sortData("latest")} className={styles.sortByNewest}>Sort by latest</button>
					<button onClick={() => sortData("oldest")} className={styles.sortByOldest}>Sort by oldest</button>
				</div>

			</header>
			
			<main>
				{dataLoaded ? <div className={styles.imgContainer}>{imageElements}</div> : <SpinnerCircular color="red" thickness={150} size={50} />}
			</main>

			<a style={{
				opacity: scrollPositionY < -800 ? topButtonHovered ? "1" : "0.5" : "0",
				transition: "opacity 0.2s ease",
			}} onMouseEnter={() => setTopButtonHovered(true)} onMouseLeave={() => setTopButtonHovered(false)} href="#top" className={styles.toTopButton}><BiUpArrowAlt size={100} /></a>

			<footer></footer>
		</div>
	);
};

export default App;
