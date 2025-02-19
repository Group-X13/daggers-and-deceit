
import { useState } from "react";
import { Users, Crown, X, Play, Check, MessageCircle } from "lucide-react";

type GameView = "select" | "host" | "join" | "lobby";
type PlayerStatus = "host" | "ready" | "waiting";

interface Player {
  id: string;
  name: string;
  status: PlayerStatus;
}

const GameNew = () => {
  const [view, setView] = useState<GameView>("select");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Host Player", status: "host" },
    { id: "2", name: "Player 2", status: "ready" },
    { id: "3", name: "Player 3", status: "waiting" },
  ]);
  
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    { id: "1", player: "System", text: "Game lobby created" },
    { id: "2", player: "Player 2", text: "Hello everyone!" },
  ]);

  const SelectView = () => (
    <div className="flex flex-col gap-6 items-center">
      <button 
        onClick={() => {
          setRoomCode("ABCD123");
          setView("host");
        }} 
        className="btn-primary w-64"
      >
        Host Game
      </button>
      
      <button 
        onClick={() => setView("join")} 
        className="btn-primary w-64"
      >
        Join Game
      </button>
      
      <a 
        href="/" 
        className="text-white/80 hover:text-white transition-colors font-medieval"
      >
        Return to Main Menu
      </a>
    </div>
  );

  const JoinView = () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-medieval mb-4 text-center">Join Game</h2>
        <input
          type="text"
          placeholder="Enter room code"
          className="w-full bg-black/50 border border-primary/50 rounded px-4 py-2 text-white placeholder:text-white/50 mb-4"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => setView("lobby")}
            className="btn-primary"
          >
            Join
          </button>
          <button 
            onClick={() => setView("select")}
            className="btn-primary bg-secondary/80 hover:bg-secondary/90"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  const LobbyView = () => (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
      <div className="flex-1 bg-card/30 backdrop-blur-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medieval">Players</h2>
          <div className="flex items-center gap-2 text-white/80">
            <Users className="w-5 h-5" />
            <span>{players.length}/8</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {players.map((player) => (
            <div 
              key={player.id}
              className="flex items-center justify-between bg-black/30 rounded-lg p-3"
            >
              <div className="flex items-center gap-2">
                {player.status === "host" && (
                  <Crown className="w-5 h-5 text-yellow-500" />
                )}
                <span>{player.name}</span>
              </div>
              {player.status === "ready" ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : player.status === "waiting" ? (
                <div className="w-2 h-2 rounded-full bg-white/50" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="btn-primary bg-accent hover:bg-accent/90">
            Ready
          </button>
        </div>
      </div>

      {showChat && (
        <div className="w-full md:w-96 bg-card/30 backdrop-blur-sm rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medieval">Chat</h2>
            <button 
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-black/30 rounded-lg p-3">
                <span className="text-white/80 text-sm">{msg.player}</span>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-black/50 border border-primary/50 rounded px-4 py-2 text-white placeholder:text-white/50"
            />
            <button className="btn-primary px-4">
              Send
            </button>
          </div>
        </div>
      )}

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 right-4 p-3 bg-primary/80 hover:bg-primary/90 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {players[0].status === "host" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <button className="btn-primary bg-accent hover:bg-accent/90 flex items-center gap-2">
            <Play className="w-5 h-5" />
            Start Game
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        <h1 className="medieval-title">
          {view === "select" ? "New Game" :
           view === "join" ? "Join Game" :
           view === "host" ? "Host Game" : "Game Lobby"}
        </h1>
        
        {view === "select" && <SelectView />}
        {view === "join" && <JoinView />}
        {(view === "host" || view === "lobby") && <LobbyView />}
      </div>
    </div>
  );
};

export default GameNew;
