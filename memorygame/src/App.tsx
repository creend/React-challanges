import { useState } from 'react';
import './App.css';
import Card from './Card';
import { generateBoard } from './utils';

interface Pick {
  row: number;
  col: number;
}

export interface Card {
  revealed: boolean;
  emoji: string;
}

function App() {
  const [cards, setCards] = useState(generateBoard(4));

  const [pick, setPick] = useState<Pick | null>(null);
  const [tries, setTries] = useState(0);
  const [isClickingAllowed, setIsClickingAllowed] = useState(true);

  const handleCardClick = (row: number, col: number) => {
    const copyOfCards = cards.map((card) => card);
    copyOfCards[row][col].revealed = true;
    if (!pick) {
      setPick({ row, col });
      setCards(copyOfCards);
    } else {
      setIsClickingAllowed(false);
      if (cards[row][col].emoji === cards[pick.row][pick.col].emoji) {
        setIsClickingAllowed(true);
      } else {
        setTimeout(() => {
          copyOfCards[row][col].revealed = false;
          copyOfCards[pick.row][pick.col].revealed = false;
          setCards(copyOfCards);
          setIsClickingAllowed(true);
        }, 1000);
      }
      setTries((prevState) => prevState + 1);
      setPick(null);
    }
  };

  return (
    <>
      <p className="tries-info">Tries: {tries}</p>
      <main className="board">
        {cards.map((row, rowIndex) => (
          <div key={rowIndex} className="board__row">
            {row.map((card, cardIndex) => (
              <Card
                key={cardIndex}
                handleClick={() => handleCardClick(rowIndex, cardIndex)}
                revealed={card.revealed}
                setCards={setCards}
                disabled={!isClickingAllowed}
              >
                {card.emoji}
              </Card>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}

export default App;
