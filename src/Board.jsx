import { useState } from 'react';
import clickSound from './assets/click.mp3';
import winSound from './assets/win.mp3';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [animatedIndex, setAnimatedIndex] = useState(null);

  const xAvatar = "❌";
  const oAvatar = "⭕";

  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = [...squares];
    nextSquares[i] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
    setAnimatedIndex(i);

    new Audio(clickSound).play();

    setTimeout(() => {
      const w = calculateWinner(nextSquares);
      if (w) new Audio(winSound).play();
    }, 100);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setAnimatedIndex(null);
  }

  return (
    <div>
      <div className="board">
        {squares.map((value, i) => (
          <div
            key={i}
            className={`square ${animatedIndex === i ? "animated" : ""}`}
            onAnimationEnd={() => setAnimatedIndex(null)}
            onClick={() => handleClick(i)}
          >
            {value === "X" ? xAvatar : value === "O" ? oAvatar : ""}
          </div>
        ))}
      </div>

      <h2>
        {winner
          ? `Winner: ${winner === "X" ? xAvatar : oAvatar}`
          : isDraw
          ? "It's a Draw!"
          : `Next Player: ${isXNext ? xAvatar : oAvatar}`}
      </h2>

      {(winner || isDraw) && (
        <button onClick={resetGame}>Reset Game</button>
      )}
    </div>
  );
}

export default Board;
