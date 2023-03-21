interface Props {
  children: React.ReactNode;
  revealed: boolean;
  handleClick: () => void;
  setCards: React.Dispatch<
    React.SetStateAction<
      {
        revealed: boolean;
        emoji: string;
      }[][]
    >
  >;
  disabled: boolean;
}

function Card({ children, handleClick, revealed, disabled }: Props) {
  return (
    <button
      className={`board__card ${revealed ? 'board__card--clicked' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Card;
