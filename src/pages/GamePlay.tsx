import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Game1 from "./PotatoGame";
import Game2 from "./CardGame";
import Game3 from "./DaggerGame";

const socket = io("http://localhost:8000", { autoConnect: false });

const GamePlay = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [assignedGame, setAssignedGame] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const storedPlayerName = localStorage.getItem("playerName") || "";
    setPlayerName(storedPlayerName);

    socket.connect();
    socket.emit("joinRoom", gameCode);

    const gameComponents = [<Game1 />, <Game2 />, <Game3 />];
    const selectedGame =
      gameComponents[Math.floor(Math.random() * gameComponents.length)];
    setAssignedGame(selectedGame);

    const timer = setTimeout(() => {
      socket.emit("gameCompleted", {
        gameKey: gameCode,
        playerName: storedPlayerName,
      });
      navigate(`/voting/${gameCode}`);
    }, 15000);

    return () => {
      socket.disconnect();
      clearTimeout(timer);
    };
  }, [gameCode, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkRed text-white">
      <h1 className="text-2xl">Playing Mini-Game</h1>
      {assignedGame}
    </div>
  );
};

export default GamePlay;
