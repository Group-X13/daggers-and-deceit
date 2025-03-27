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
      <h1 className="text-4xl mb-4">🏆 Game Over</h1>
      <p className="text-2xl text-green-400 mb-10">Mafia was: Sky</p>
    </div>
  );
};

export default Leaderboard;
