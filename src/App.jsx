import { useState } from "react";
import "./App.css";

function App() {
	const [cards, setCards] = useState([
		{ id: 1, order: 1, title: "Card 1" },
		{ id: 2, order: 2, title: "Card 2" },
		{ id: 3, order: 3, title: "Card 3" },
		{ id: 4, order: 4, title: "Card 4" },
		{ id: 5, order: 5, title: "Card 5" },
	]);

	const [currentCard, setCurrentCard] = useState(null);

	const sortCards = (a, b) => {
		return a.order > b.order ? 1 : -1;
	};

	const dragStart = (event, card) => {
		setCurrentCard(card);
	};

	const dragLeave = (event) => {
		event.target.style.background = "";
	};

	const dragOver = (event) => {
		event.preventDefault();
		event.target.style.background = "blue";
	};

	const drop = (event, card) => {
		event.preventDefault();
		setCards(
			cards.map((c) => {
				if (c.id === card.id) {
					return { ...c, order: currentCard.order };
				}

				if (c.id === currentCard.id) {
					return { ...c, order: card.order };
				}

				return c;
			})
		);
		event.target.style.background = "";
	};

	return (
		<div className="app">
			<div className="cards">
				{cards.sort(sortCards).map((card) => (
					<div
						className="card"
						key={card.id}
						draggable
						onDragStart={(event) => dragStart(event, card)}
						onDragLeave={dragLeave}
						onDragOver={dragOver}
						onDrop={(event) => drop(event, card)}
					>
						{card.title}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
