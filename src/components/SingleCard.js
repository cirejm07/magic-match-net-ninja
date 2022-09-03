import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {

const handleClick = () => {
  if(!disabled) {
    handleChoice(card)
  }
}

  return (
          <div className='card' key={card.id}>
            <div className={flipped ? "flipped" : ""}>
              <img 
              className='front' 
              src={card.src ? `http://localhost:3000${card.src}` : null} 
              alt="card-front" />
              <img 
              onClick={handleClick} 
              className='back' 
              src="/img/cover.png" 
              alt="card-back" />
            </div>
          </div>
  )
}
