import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
// shuffle cards
// duplicate cards
// randomize cards
// apply random id
const [cards, setCards] = useState([])
const [turns, setTurns] = useState(0)
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)

const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({ ...card, id: Math.random() }))

  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0)
}

// handle a choice
const handleChoice = (card) => {
 choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

// compare 2 select cards
useEffect(() => {
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
      setCards(cards => {
        return cards.map((card) => {
          if(card.src === choiceOne.src){
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      
      setTimeout(() => {
        resetTurn()
      }, 500)
    }
  }
  
  },[choiceOne, choiceTwo])

  console.log(cards);
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setDisabled(false)
  }


console.log(choiceOne)
console.log(choiceTwo)

useEffect(() => {
  shuffleCards()
},[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button> <div className='card-grid'>
    {cards.map((card) => (
      <SingleCard 
      handleChoice={handleChoice} 
      card={card} 
      key={card.id} 
      flipped={card === choiceOne || card === choiceTwo || card.matched}
      disabled={disabled}
      />  
    ))}  
    <p className='turn'>Turns: {turns}</p>
    </div>
    </div>
  );
}

export default App;
