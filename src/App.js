import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/ankit.png", matched: false },
  { src: "/img/prashant.png", matched: false },
  { src: "/img/chhotu.png", matched: false },
  { src: "/img/karan.png", matched: false },
  { src: "/img/manish.png", matched: false },
  { src: "/img/ujjwal.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCard = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  //, matched : falseconsole.log(choiceOne, choiceTwo);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevturn) => prevturn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceTwo != null && choiceOne != null) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        //console.log("card not matched");
        setTimeout(() => {
          resetTurn();
        }, 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  //console.log(cards);

  useEffect(() => {
    shuffleCard();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          ></SingleCard>

          // <div className="card" key={card.id}>
          //   <div>
          //     <img className="front" src={card.src} alt="card-front"></img>
          //     <img className="back" src="/img/cover.png" alt="card-back"></img>
          //   </div>
          // </div>
        ))}
      </div>
      <p>Turns . {turns}</p>
    </div>
  );
}

export default App;
