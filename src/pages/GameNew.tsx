import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameNew = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleHostGame = async () => {
    if (!playerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("playerName", playerName.trim()); // ✅ Store player name

    try {
      const response = await fetch("http://localhost:8000/create-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostName: playerName.trim() }),
      });

      const data = await response.json();
      if (data.gameKey) {
        navigate(`/lobby/${data.gameKey}`);
      } else {
        console.error("Error creating game:", data.error);
      }
    } catch (error) {
      console.error("❌ Error creating game:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Enter your name to Host a Game</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your Name"
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleHostGame}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Host Game
      </button>
    </div>
  );
};

export default GameNew;
