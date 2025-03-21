import React, { useState, useEffect } from "react";

const styles = `
  .container {
    max-width: 800px;
    margin: 20px auto;
    text-align: center;
    font-family: Arial, sans-serif;
  }

  .drop-zone {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
    min-height: 200px;
  }

  .card {
    width: 120px;
    height: 160px;
    background: white;
    border: 3px solid #333;
    border-radius: 10px;
    cursor: move;
    transition: transform 0.2s;
    position: relative;
    padding: 10px;
  }

  .card[draggable="true"]:hover {
    transform: scale(1.05);
  }

  .card.dragging {
    opacity: 0.5;
    background: #eee;
  }

  .hearts, .diamonds {
    color: red;
  }

  .spades, .clubs {
    color: black;
  }

  .drop-target {
    border: 3px dashed #666;
  }

  .message {
    margin: 20px;
    padding: 15px;
    border-radius: 8px;
    font-size: 1.2em;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    opacity: 1;
  }

  .card-corner {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;
    line-height: 1;
  }

  .top-left {
    top: 5px;
    left: 5px;
  }

  .bottom-right {
    bottom: 5px;
    right: 5px;
    transform: rotate(180deg);
  }

  .card-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5em;
  }
`;

const Game2 = () => {
  const [message, setMessage] = useState("");
  const [cards, setCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const suits = ["♣", "♦", "♥", "♠"];
    const classes = ["clubs", "diamonds", "hearts", "spades"];
    const numbers: number[] = [];

    while (numbers.length < 4) {
      let num = Math.floor(Math.random() * 10) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }

    const newCards = suits.map((suit, index) => {
      const cardClass = `card ${classes[index]}`;
      return (
        <div
          key={`${suit}-${numbers[index]}`}
          className={cardClass}
          draggable="true"
          data-value={numbers[index]}
          onDragStart={(e) => {
            (e.target as HTMLElement).classList.add("dragging");
          }}
          onDragEnd={(e) => {
            (e.target as HTMLElement).classList.remove("dragging");
            checkOrder();
          }}
        >
          <div className="card-corner top-left">
            {numbers[index]}
            <br />
            {suit}
          </div>
          <div className="card-center">{suit}</div>
          <div className="card-corner bottom-right">
            {numbers[index]}
            <br />
            {suit}
          </div>
        </div>
      );
    });

    setCards(newCards);
  }, []);

  useEffect(() => {
    const dropZone = document.getElementById("dropZone");

    dropZone?.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingCard = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(dropZone, e.clientX);

      if (afterElement) {
        dropZone.insertBefore(draggingCard, afterElement);
      } else {
        dropZone.appendChild(draggingCard);
      }
    });

    function getDragAfterElement(container: HTMLElement, x: number) {
      const draggableElements = [
        ...container.querySelectorAll(".card:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = x - box.right;

          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }, []);

  function checkOrder() {
    const dropZone = document.getElementById("dropZone");
    const currentOrder = Array.from(dropZone?.children || []).map((card) =>
      parseInt((card as HTMLElement).dataset.value || "0")
    );

    const isCorrect = currentOrder.every(
      (value, index) => index === 0 || value > currentOrder[index - 1]
    );

    if (isCorrect) {
      setMessage("Correct!");
    } else {
      setMessage("");
    }
  }

  return (
    <div className="container">
      <style>{styles}</style>
      <h1>Card Sorting Game</h1>
      <div className="drop-zone" id="dropZone">
        {cards}
      </div>
      <div className={`message ${message ? "success" : ""}`} id="message">
        {message}
      </div>
    </div>
  );
};

export default Game2;