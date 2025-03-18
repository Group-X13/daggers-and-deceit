import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Deceit & Daggers</h1>

      <button
        onClick={() => navigate("/game/new")}
        className="bg-green-500 text-white px-6 py-3 rounded mb-4"
      >
        Host Game
      </button>

      <button
        onClick={() => navigate("/game/join")}
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Join Game
      </button>
    </div>
  );
};

export default Index;
