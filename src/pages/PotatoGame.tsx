import { useState, useEffect } from "react";

const eyesImages = ["/eyes-1.png", "/eyes-2.png", "/eyes-3.png"];
const noseImages = ["/nose-1.png", "/nose-2.png", "/nose-3.png"];
const mouthImages = ["/mouth-1.png", "/mouth-2.png", "/mouth-3.png"];

type PotatoParts = [number, number, number];

const getRandomCombination = (): PotatoParts => {
  const combination: PotatoParts = [
    Math.floor(Math.random() * eyesImages.length),
    Math.floor(Math.random() * noseImages.length),
    Math.floor(Math.random() * mouthImages.length),
  ];

  if (combination.every((part) => part === 0)) {
    return getRandomCombination();
  }

  return combination;
};

const PotatoGame = () => {
  const [selectedParts, setSelectedParts] = useState<PotatoParts>([0, 0, 0]);
  const [targetCombination, setTargetCombination] = useState<PotatoParts>(
    getRandomCombination()
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkWin();
  }, [selectedParts]);

  const changePart = (index: number) => {
    setSelectedParts((prevParts) => {
      const newParts: PotatoParts = [...prevParts];
      newParts[index] =
        (newParts[index] + 1) %
        [eyesImages, noseImages, mouthImages][index].length;
      return newParts;
    });
  };

  const checkWin = () => {
    if (selectedParts.every((val, index) => val === targetCombination[index])) {
      setMessage("Congratulations! You matched the potato!");
    } else {
      setMessage("");
    }
  };

  const resetGame = () => {
    setSelectedParts([0, 0, 0]);
    setTargetCombination(getRandomCombination());
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Mafia Potato Head Game</h1>
      <div className="flex justify-center gap-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Your Potato</h2>
          <div className="relative w-48 h-64 border-4 border-brown rounded-[50%] bg-white shadow-lg flex flex-col items-center justify-center">
            {["eyes", "nose", "mouth"].map((part, i) => (
              <div
                key={part}
                className={`w-full h-1/3 flex justify-center items-center cursor-pointer ${
                  i < 2 ? "border-b-2 border-black" : ""
                }`}
                onClick={() => changePart(i)}
              >
                <img
                  src={
                    [eyesImages, noseImages, mouthImages][i][selectedParts[i]]
                  }
                  alt={part}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">Target Potato</h2>
          <div className="relative w-48 h-64 border-4 border-brown rounded-[50%] bg-white shadow-lg flex flex-col items-center justify-center">
            {["eyes", "nose", "mouth"].map((part, i) => (
              <div
                key={part}
                className={`w-full h-1/3 flex justify-center items-center ${
                  i < 2 ? "border-b-2 border-black" : ""
                }`}
              >
                <img
                  src={
                    [eyesImages, noseImages, mouthImages][i][
                      targetCombination[i]
                    ]
                  }
                  alt={part}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        New Game
      </button>

      {message && <p className="mt-4 text-lg font-bold">{message}</p>}
    </div>
  );
};

export default PotatoGame;
