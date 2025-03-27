import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { autoConnect: false });

interface Player {
  name: string;
  isAlive: boolean;
  role?: string;
}

const Voting = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [deathMessage, setDeathMessage] = useState<string | null>(null);
  const playerName = localStorage.getItem("playerName") || "";
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", gameCode);

    setTimeout(() => {
      navigate(`/leaderboard/results`);
    }, 5000);

    socket.on("updatePlayers", ({ players }: { players: Player[] }) => {
      const alivePlayers = players.filter((p) => p.isAlive);
      setPlayers(alivePlayers);

      const current = players.find((p) => p.name === playerName);
      if (current?.role) {
        setRole(current.role);
      }
    });

    socket.on("chatMessage", ({ message }: { message: string }) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("playerKilled", ({ deathMessage }: { deathMessage: string }) => {
      setDeathMessage(deathMessage);
    });

    return () => {
      socket.disconnect();
      socket.off("updatePlayers");
      socket.off("chatMessage");
      socket.off("playerKilled");
    };
  }, [gameCode, navigate, playerName]);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      socket.emit("chatMessage", {
        gameKey: gameCode,
        message: `${playerName}: ${chatInput}`,
      });
      setChatInput("");
    }
  };

  const handleVoteSubmit = () => {
    if (!selectedPlayer) return alert("Please select a player.");

    const event = role === "Mafia" ? "submitKill" : "submitVote";
    socket.emit(event, {
      gameKey: gameCode,
      voter: playerName,
      target: selectedPlayer,
    });
  };

  const isMafia = role === "Mafia";
  const voteablePlayers = players.filter((p) => p.name !== playerName);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-darkRed">
      {deathMessage ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">
            A Player Was Killed!
          </h1>
          <p className="text-lg mt-4 italic">{deathMessage}</p>
        </div>
      ) : (
        <div className="flex flex-row w-full max-w-5xl">
          <div className="w-2/3 p-6">
            <h1 className="text-3xl font-bold">Voting Phase</h1>
            <p className="text-lg mt-2">
              {isMafia
                ? "Choose someone to eliminate..."
                : "Vote for who you think the Mafia is..."}
            </p>

            <div className="mt-4">
              {voteablePlayers.map((player) => (
                <div key={player.name} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={player.name}
                    name="vote"
                    value={player.name}
                    checked={selectedPlayer === player.name}
                    onChange={() => setSelectedPlayer(player.name)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={player.name}
                    className="text-lg cursor-pointer"
                  >
                    {player.name}
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleVoteSubmit}
              className="mt-4 bg-red-600 px-6 py-3 rounded-lg text-xl hover:bg-red-800 transition"
            >
              Submit {isMafia ? "Kill" : "Vote"}
            </button>
          </div>

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
      )}
    </div>
  );
};

export default Voting;
