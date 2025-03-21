import { useParams } from "react-router-dom";

const Leaderboard = () => {
  const { gameCode } = useParams();

  const players = [
    { name: "Rhea", points: 0 },
    { name: "Sky", points: 100 }, // ✅ Mafia
    { name: "Shirin", points: 0 },
    { name: "Arjun", points: 0 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl mb-4">🏆 Game Over</h1>
      <h2 className="text-xl mb-2">Game Code: {gameCode}</h2>
      <p className="text-green-400 mb-4">Mafia was: Sky</p>

      <div className="bg-gray-800 p-4 rounded shadow w-64">
        <h3 className="text-lg mb-2">Leaderboard</h3>
        <ul>
          {players
            .sort((a, b) => b.points - a.points)
            .map((player, index) => (
              <li key={index} className="mb-1">
                {player.name} — {player.points} pts
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
