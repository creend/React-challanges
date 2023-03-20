import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Circle from './Circle';

function App() {
  const [circles, setCircles] = useState<{ x: number; y: number }[]>([]);
  const [changingCircleIndex, setChangingCircleIndex] = useState<number | null>(
    null
  );

  const handleWindowClick = useCallback(
    (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (typeof changingCircleIndex === 'number') {
        setCircles((prevState) =>
          prevState.map((circle, index) =>
            index === changingCircleIndex
              ? { x, y }
              : { x: circle.x, y: circle.y }
          )
        );
        setChangingCircleIndex(null);
      } else {
        setCircles((prevState) => [...prevState, { x, y }]);
      }
    },
    [changingCircleIndex, setChangingCircleIndex]
  );

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [handleWindowClick]);
  return (
    <div className="App">
      {circles.map((circle, i) => (
        <Circle
          key={i}
          index={i}
          setCircles={setCircles}
          setChangingCircleIndex={setChangingCircleIndex}
          {...circle}
        />
      ))}
    </div>
  );
}

export default App;
