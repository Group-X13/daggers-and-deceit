import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinGame = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [gameKey, setGameKey] = useState("");

  const handleJoinGame = async () => {
    if (!playerName.trim() || !gameKey.trim()) {
      console.error("🚨 Error: Game key and player name are required!");
      return;
    }

    try {
      console.log(
        `📡 Sending join request for Player: ${playerName}, Game Key: ${gameKey}`
      );

      const response = await fetch(
        "https://deceit-and-daggers-back-end.onrender.com/join-game",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerName, gameKey }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Successfully joined game:", data);
        localStorage.setItem("playerName", playerName);
        navigate(`/lobby/${gameKey}`);
      } else {
        console.error("❌ Error joining game:", data.error);
      }
    } catch (error) {
      console.error("❌ Network error while joining game:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl text-white">Join a Game</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="mt-4 p-2 text-black rounded"
      />

      <input
        type="text"
        placeholder="Enter Game Code"
        value={gameKey}
        onChange={(e) => setGameKey(e.target.value)}
        className="mt-4 p-2 text-black rounded"
      />

      <button
        onClick={handleJoinGame}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Join Game
      </button>
    </div>
  );
};

export default JoinGame;
