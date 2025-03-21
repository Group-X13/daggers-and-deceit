import { useState, useEffect } from "react";

const allowedAngles = [0, 45, 90, 135, 180, 225, 270, 315];
const daggerOffset = 90;
const handOffset = 0;
const maxRounds = 5;

const getRandomHandDirection = () => {
  return allowedAngles[Math.floor(Math.random() * allowedAngles.length)];
};

const HandDirectionGame = () => {
  const [correctHandDirection, setCorrectHandDirection] = useState(
    getRandomHandDirection()
  );
  const [daggerAngle, setDaggerAngle] = useState(0);
  const [roundCount, setRoundCount] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (
      (daggerAngle + daggerOffset) % 360 ===
      (correctHandDirection + handOffset) % 360
    ) {
      setTimeout(() => {
        if (roundCount < maxRounds) {
          setRoundCount(roundCount + 1);
          setCorrectHandDirection(getRandomHandDirection());
          setMessage("Correct! Next round...");
        } else {
          setMessage("Game Over! You completed all 5 rounds!");
        }
      }, 300);
    }
  }, [daggerAngle]);

  const rotateDagger = () => {
    setDaggerAngle((prev) => (prev + 45) % 360);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-maroon text-white">
      <h1 className="text-3xl font-bold mb-4">
        Rotate the dagger to match the hand
      </h1>
      <p className="text-lg mb-4">
        Round: {roundCount} / {maxRounds}
      </p>
      <div className="flex justify-center items-center gap-24 p-6 bg-white rounded-lg shadow-lg">
        <img
          id="hand"
          src="/hand.png"
          alt="Hand Direction"
          className="w-44 h-auto"
          style={{ transform: `rotate(${correctHandDirection}deg)` }}
        />
        <img
          id="dagger"
          src="/dagger.png"
          alt="Rotate Me"
          className="w-44 h-auto cursor-pointer"
          style={{ transform: `rotate(${daggerAngle}deg)` }}
          onClick={rotateDagger}
        />
      </div>
      <p className="text-lg font-semibold mt-4">{message}</p>
    </div>
  );
};

export default HandDirectionGame;
