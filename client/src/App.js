import styles from "./App.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageCard from "./components/image-card";
import { BiUpArrowAlt } from "react-icons/bi";
import { GiMoonOrbit } from "react-icons/gi";
import { SpinnerCircular } from "spinners-react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const App = () => {
	const [data, setData] = useState([]);
	const [imageElements, setImageElements] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [scrollPositionY, setScrollPositionY] = useState(0);
	const [topButtonHovered, setTopButtonHovered] = useState(false);


	const updateData = async (numOfResults) => {
		try {
			const res = await axios.post("/api/data", {
				numOfResults: numOfResults,
			});
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
		updateData(30);
	}, [])



	return (
		<div className={styles.main}>


			<header id="top">
				<nav>
					<div className={styles.logoContainer}><span className={styles.moonLogo}>&#x1F680;</span> Spacestagram</div>
				</nav>

				<div style={{
					opacity: dataLoaded ? "1" : "0",
				}} className={styles.sortButtonsContainer}>
					<button style={{
						opacity: dataLoaded ? "1" : "0",
						cursor: dataLoaded ? "pointer" : "default",
					}} onClick={() => sortData("latest")} className={styles.sortByLatest}>Sort by newest</button>
					<button style={{
						opacity: dataLoaded ? "1" : "0",
						cursor: dataLoaded ? "pointer" : "default",
					}} onClick={() => sortData("oldest")} className={styles.sortByOldest}>Sort by oldest</button>

				</div>

				<div style={{
					opacity: dataLoaded ? "1" : "0",
				}}  className={styles.resultChooserContainer}>
					<form style={{
					}} action="" onSubmit={(e) => {
						e.preventDefault();
						setDataLoaded(false);
						updateData(e.target[0].value);
					}}>
						<div className={styles.labelAndInput}>
							<label htmlFor="numOfResults">Number of results:</label>
							<input type="number" name="numOfResults" id="numOfResults" required min={1} max={100} placeholder="1-100" />
						</div>
						<button style={{
							opacity: dataLoaded ? "1" : "0",
							cursor: dataLoaded ? "pointer" : "default",
						}}>Show results</button>
					</form>
				</div>


			</header>
			
			<main style={{
				minHeight: dataLoaded ? "30vh" : "55vh",
			}}>
				{dataLoaded ? <div className={styles.imgContainer}>{imageElements}</div> : <SpinnerCircular style={{marginTop: "5rem",}} color="red" thickness={150} size={50} />}
			</main>

			<a style={{
				opacity: scrollPositionY < -800 ? topButtonHovered ? "1" : "0.5" : "0",
				transition: "opacity 0.2s ease",
			}} onMouseEnter={() => setTopButtonHovered(true)} onMouseLeave={() => setTopButtonHovered(false)} href="#top" className={styles.toTopButton}><BiUpArrowAlt size={80} /></a>

			<footer>
				<p>Created by Syed Wahaj Haider</p>
				<p>
					Copyright &copy; 2022
				</p>
			</footer>
		</div>
	);
};

export default App;
