import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import logo from "/logo.png";
import shadowyFigures from "/shadowy-figures.png";

const socket = io(import.meta.env.VITE_API_URL);

const Lobby = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [hostName, setHostName] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const storedPlayerName = localStorage.getItem("playerName")?.trim();
    if (!gameCode || !storedPlayerName) return;

    const fetchGame = async () => {
      try {
        const response = await fetch(
          `https://deceit-and-daggers-back-end.onrender.com/games/${gameCode}`
        );
        const data = await response.json();
        setPlayers(data.players || []);
        setHostName(data.hostName.trim());
        setIsHost(
          storedPlayerName.toLowerCase() === data.hostName.trim().toLowerCase()
        );
        if (data.gameStarted) setGameStarted(true);
      } catch (err) {
        console.error("Failed to fetch game:", err);
      }
    };

    fetchGame();
    socket.connect();
    socket.emit("joinRoom", gameCode);

    socket.on("updatePlayers", ({ players }) => {
      setPlayers(players);
    });

    socket.on("gameStarted", () => {
      setGameStarted(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameCode]);

  useEffect(() => {
    if (gameStarted) navigate(`/game/${gameCode}`);
  }, [gameStarted, navigate, gameCode]);

  const startGame = async () => {
    try {
      await fetch(
        "https://deceit-and-daggers-back-end.onrender.com/start-game",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameKey: gameCode }),
        }
      );
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkRed text-white">
      <img src={logo} alt="Logo" className="w-72 mb-4" />
      <h1 className="text-3xl font-bold">Lobby</h1>
      <p className="text-xl mt-2">Game Code: {gameCode}</p>

      <ul className="mt-4 text-lg">
        {players.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>

      {!gameStarted && isHost ? (
        <button
          onClick={startGame}
          className="mt-6 bg-red-600 px-6 py-3 rounded-lg text-xl hover:bg-red-800 transition"
        >
          Start Game
        </button>
      ) : !gameStarted ? (
        <p className="mt-4 text-gray-400">
          Waiting for host to start the game...
        </p>
      ) : null}

      <img
        src={shadowyFigures}
        alt="Silhouettes"
        className="w-96 mt-6 opacity-80"
      />
    </div>
  );
};

export default Lobby;
