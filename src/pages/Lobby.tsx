import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import logo from "/logo-removebg-preview.png";
import shadowyFigures from "/shadowy-figures-removebg-preview.png";

const socket = io("http://localhost:8000", { autoConnect: false });

const Lobby = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameCode) return;

    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/games/${gameCode}`);
        const data = await response.json();

        setPlayers(data.players || []);
      } catch (error) {
        console.error("❌ Error fetching game details:", error);
      }
    };

    fetchGameDetails();
    socket.connect();
    socket.emit("joinRoom", gameCode);

    socket.on("updatePlayers", ({ players }) => {
      setPlayers(players);
    });

    socket.on("gameStarted", () => {
      setGameStarted(true);
    });

    return () => {
      socket.off("updatePlayers");
      socket.off("gameStarted");
      socket.disconnect();
    };
  }, [gameCode]);

  useEffect(() => {
    if (gameStarted) {
      navigate(`/game/${gameCode}`);
    }
  }, [gameStarted, navigate, gameCode]);

  const startGame = async () => {
    console.log("🚀 Game started! Redirecting all players...");
    navigate(`/game/${gameCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkRed text-white">
      <h1 className="text-3xl font-bold">Lobby</h1>
      <p className="text-xl mt-2">Game Code: {gameCode || "N/A"}</p>
      <ul className="mt-4 text-lg">
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>

      <button
        onClick={startGame}
        className="mt-6 bg-red-600 px-6 py-3 rounded-lg text-xl hover:bg-red-800 transition"
      >
        Start Game
      </button>
    </div>
  );
};

export default Lobby;
