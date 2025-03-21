import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Voting = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [showDeathMessage, setShowDeathMessage] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    // Show death message after 10 seconds
    const deathTimer = setTimeout(() => {
      setShowDeathMessage(true);
    }, 10000);

    // Redirect to leaderboard after an additional 5 seconds
    const leaderboardTimer = setTimeout(() => {
      setRedirecting(true);
      navigate(`/leaderboard/${gameCode}`);
    }, 15000);

    return () => {
      clearTimeout(deathTimer);
      clearTimeout(leaderboardTimer);
    };
  }, [gameCode, navigate]);

  const handleVoteSubmit = () => {
    if (!selectedPlayer) {
      alert("Please select a player to vote for.");
      return;
    }
    alert(`You voted for ${selectedPlayer}`);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages((prev) => [...prev, chatInput]);
      setChatInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-darkRed">
      {!showDeathMessage ? (
        <div className="flex flex-row w-full max-w-4xl">
          <div className="w-2/3 p-6">
            <h1 className="text-3xl font-bold">Voting Phase</h1>
            <p className="text-lg mt-2">
              Discuss and vote on who you think is the Mafia...
            </p>

            <div className="mt-4">
              {["Shirin", "Rhea", "Sky"].map((player) => (
                <div key={player} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={player}
                    name="vote"
                    value={player}
                    checked={selectedPlayer === player}
                    onChange={() => setSelectedPlayer(player)}
                    className="mr-2"
                  />
                  <label htmlFor={player} className="text-lg cursor-pointer">
                    {player}
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleVoteSubmit}
              className="mt-4 bg-red-600 px-6 py-3 rounded-lg text-xl hover:bg-red-800 transition"
            >
              Submit Vote
            </button>
          </div>

          {/* Chatbox Section */}
          <div className="w-1/3 p-6 border-l border-gray-600">
            <h2 className="text-xl font-bold">Chat Box</h2>
            <div className="h-48 overflow-y-auto bg-gray-900 p-3 rounded mt-2">
              {messages.length === 0 ? (
                <p className="text-gray-400 italic">No messages yet...</p>
              ) : (
                messages.map((msg, index) => (
                  <p key={index} className="text-white">
                    {msg}
                  </p>
                ))
              )}
            </div>
            <div className="mt-3 flex">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 p-2 text-black rounded"
                placeholder="Type here..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Arjun was killed!</h1>
          <p className="text-lg mt-4 italic">
            Arjun always thought his swing dance footwork was flawless—until he
            ‘accidentally’ pirouetted straight into an open manhole. Some say
            the killer merely removed the cover; others claim it was just fate.
            Either way, Arjun’s last dance move was… underground.
          </p>
          {redirecting && (
            <p className="text-lg mt-4 text-gray-300">
              Redirecting to leaderboard...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Voting;
