import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { autoConnect: false });

const Lobby = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [hostName, setHostName] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameCode) return;

    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/games/${gameCode}`);
        const data = await response.json();

        setPlayers(data.players || []);
        setHostName(data.hostName.trim()); // ✅ Ensure hostName is set correctly

        // ✅ Preserve isHost state across updates
        const storedPlayerName = localStorage.getItem("playerName")?.trim();
        console.log(
          "🔍 Checking if host:",
          storedPlayerName,
          "vs",
          data.hostName.trim()
        );
        if (storedPlayerName) {
          setIsHost(
            storedPlayerName.toLowerCase() ===
              data.hostName.trim().toLowerCase()
          );
        }
      } catch (error) {
        console.error("❌ Error fetching game details:", error);
      }
    };

    fetchGameDetails();
    socket.connect();
    socket.emit("joinRoom", gameCode);

    // ✅ Ensure all players' UIs update instantly when someone joins
    socket.on("updatePlayers", ({ players }) => {
      console.log("📢 Players Updated:", players);
      setPlayers(players);
    });

    // ✅ Ensure game start updates UI instantly
    socket.on("gameStarted", ({ players }) => {
      console.log("🎮 Game started, redirecting...");
      setPlayers(players);
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
    if (!isHost) {
      console.warn("🚫 Only the host can start the game!");
      return;
    }

    console.log(
      `🚀 Start Game Clicked by: ${localStorage.getItem("playerName")}`
    );

    try {
      const response = await fetch("http://localhost:8000/start-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameKey: gameCode }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("❌ Error starting game:", data.error);
      }
    } catch (error) {
      console.error("❌ Error starting game:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Lobby</h1>
      <p>Game Code: {gameCode || "Error: No game code found"}</p>
      <h2>Players:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>

      {isHost && !gameStarted ? (
        <button
          onClick={startGame}
          className={`mt-4 text-white px-4 py-2 rounded ${
            players.length >= 3
              ? "bg-red-500"
              : "bg-gray-500 opacity-50 cursor-not-allowed"
          }`}
          disabled={players.length < 3}
        >
          Start Game
        </button>
      ) : !gameStarted ? (
        <p className="mt-4 text-gray-400">
          Waiting for the host to start the game...
        </p>
      ) : null}
    </div>
  );
};

export default Lobby;
