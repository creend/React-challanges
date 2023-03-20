import { MouseEvent } from 'react';

interface Props {
  x: number;
  y: number;
  index: number;
  setCircles: React.Dispatch<
    React.SetStateAction<
      {
        x: number;
        y: number;
      }[]
    >
  >;
  setChangingCircleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
function Circle({ x, y, setCircles, index, setChangingCircleIndex }: Props) {
  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCircles((prevState) => prevState.filter((circle, i) => i !== index));
  };

  const handleChangeClick = (e: MouseEvent<HTMLButtonElement>) => {
    setChangingCircleIndex(index);

    e.stopPropagation();
  };

  return (
    <div className="circle" style={{ top: `${y}px`, left: `${x}px` }}>
      <button className="circle__button" onClick={handleRemoveClick}>
        Remove
      </button>
      <button className="circle__button" onClick={handleChangeClick}>
        Change
      </button>
    </div>
  );
}

export default Circle;
