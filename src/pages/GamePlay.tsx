import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Game1 from "./PotatoGame";
import Game2 from "./CardGame";
import Game3 from "./DaggerGame";

const GamePlay = () => {
  const [assignedGame, setAssignedGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔀 Randomly selecting a game...");
    const gameComponents = [<Game1 />, <Game2 />, <Game3 />];
    setAssignedGame(
      gameComponents[Math.floor(Math.random() * gameComponents.length)]
    );

    // Auto transition to Voting Lobby after 15 seconds
    setTimeout(() => {
      navigate("/voting/host");
    }, 15000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkRed text-white">
      <h1 className="text-2xl">Playing Mini-Game</h1>
      {assignedGame}
    </div>
  );
};

export default GamePlay;
