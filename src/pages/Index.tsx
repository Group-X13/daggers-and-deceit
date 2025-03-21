import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "/logo.png";
import shadowyFigures from "/shadowy-figures.png";

const Index = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#3D0707] to-black">
      <div className="absolute top-4 right-4 flex gap-4">
        <span className="w-8 h-8 cursor-pointer hover:opacity-80">⚙️</span>
        <span
          alt="How to Play"
          className="w-8 h-8 cursor-pointer hover:opacity-80"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          ❓
        </span>
      </div>

      <img
        src={shadowyFigures}
        alt="Shadowy Figures"
        className="w-1/3 max-w-[400px] mb-[-50px]"
        style={{ paddingBottom: 50 }}
      />

      <img src={logo} alt="Deceit & Daggers" className="w-80 mb-8" />

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/game/new")}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200"
        >
          Host Game
        </button>
        <button
          onClick={() => navigate("/game/join")}
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200"
        >
          Join Game
        </button>
      </div>
      {/* Instructions Panel */}
      {showInstructions && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white text-lg p-8">
          <h1 className="text-3xl font-bold mb-4">How to Play</h1>
          <ul className="list-decimal text-left space-y-2 max-w-lg">
            <li>Enter your name and host or join a game.</li>
            <li>Each player is assigned a role: Civilian, Medic, or Killer.</li>
            <li>Civilians complete tasks and vote on the killer.</li>
            <li>Medics can save one person per round.</li>
            <li>The killer eliminates players—don't get caught!</li>
          </ul>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-6 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
