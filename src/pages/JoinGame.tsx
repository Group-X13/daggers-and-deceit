import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();

  const handleJoinGame = async () => {
    if (!playerName.trim() || !gameCode.trim()) {
      alert("Please enter your name and game code.");
      return;
    }

    localStorage.setItem("playerName", playerName.trim()); // ✅ Store player name

    try {
      const response = await fetch("http://localhost:8000/join-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameKey: gameCode,
          playerName: playerName.trim(),
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        navigate(`/lobby/${gameCode}`); // ✅ FIXED: Use backticks!
      }
    } catch (error) {
      console.error("❌ Error joining game:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Join a Game</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your Name"
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
        placeholder="Game Code"
        className="mt-4 p-2 border border-gray-300 rounded"
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
