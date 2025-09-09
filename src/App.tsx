import { useState } from "react";
import "./style.css"; // імпортуємо свій файл стилів


function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Переможець: ${winner}` : `Наступний гравець: ${xIsNext ? "X" : "O"}`;

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

// Функція для визначення переможця
function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // рядки
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // стовпці
    [0, 4, 8], [2, 4, 6],            // діагоналі
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
