// // import { useState } from "react";
// // import { Shield, Skull, Swords, MessageCircle, Vote, PanelRight, Timer } from "lucide-react";

// // type GamePhase = "role-reveal" | "day" | "night" | "voting";
// // type Role = "villager" | "killer" | "detective" | "medic";
// // type PlayerState = "alive" | "dead";

// // interface GamePlayer {
// //   id: string;
// //   name: string;
// //   role?: Role;
// //   state: PlayerState;
// //   votes: number;
// // }

// // const GamePlay = () => {
// //   const [phase, setPhase] = useState<GamePhase>("role-reveal");
// //   const [showKillerPanel, setShowKillerPanel] = useState(false);
// //   const [showChat, setShowChat] = useState(true);
// //   const [selectedVote, setSelectedVote] = useState<string | null>(null);
// //   const [players, setPlayers] = useState<GamePlayer[]>([
// //     { id: "1", name: "Player 1", role: "killer", state: "alive", votes: 0 },
// //     { id: "2", name: "Player 2", role: "villager", state: "alive", votes: 2 },
// //     { id: "3", name: "Player 3", role: "detective", state: "dead", votes: 1 },
// //     { id: "4", name: "Player 4", role: "villager", state: "alive", votes: 3 },
// //     { id: "5", name: "Player 5", role: "villager", state: "alive", votes: 1 },
// //   ]);

// //   const handleVote = (playerId: string) => {
// //     if (selectedVote === playerId) return;

// //     setPlayers(players.map(p => ({
// //       ...p,
// //       votes: p.id === playerId ? p.votes + 1 :
// //              p.id === selectedVote ? p.votes - 1 : p.votes
// //     })));
// //     setSelectedVote(playerId);
// //   };

// //   const RoleReveal = () => (
// //     <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 animate-fadeIn">
// //       <div className="text-center space-y-8">
// //         <h2 className="medieval-title text-4xl">Your Role</h2>
// //         <div className="bg-card/30 backdrop-blur-sm rounded-lg p-8 flex flex-col items-center gap-4">
// //           <Shield className="w-16 h-16 text-primary" />
// //           <h3 className="text-2xl font-medieval">Killer</h3>
// //           <p className="text-white/80 max-w-md">
// //             You are the Killer. Eliminate other players without getting caught. Use your wit and deception to survive.
// //           </p>
// //           <button
// //             onClick={() => setPhase("night")}
// //             className="btn-primary mt-4"
// //           >
// //             Begin Game
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const VotingPhase = () => (
// //     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
// //       <div className="w-full max-w-4xl p-6 space-y-8">
// //         <div className="text-center space-y-4">
// //           <h2 className="medieval-title text-4xl text-primary">Time to Vote</h2>
// //           <p className="text-white/80 text-lg">
// //             Who do you think is the Killer? Vote wisely...
// //           </p>
// //           <div className="flex items-center justify-center gap-2">
// //             <Timer className="w-5 h-5 text-primary" />
// //             <span className="text-xl">1:30</span>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {players
// //             .filter(p => p.state === "alive")
// //             .map((player) => (
// //               <button
// //                 key={player.id}
// //                 onClick={() => handleVote(player.id)}
// //                 className={`
// //                   bg-card/30 backdrop-blur-sm rounded-lg p-6 text-left
// //                   transition-all duration-300 hover:bg-card/50
// //                   ${selectedVote === player.id ? 'ring-2 ring-primary' : ''}
// //                 `}
// //               >
// //                 <div className="flex items-center justify-between mb-4">
// //                   <span className="font-medieval text-lg">{player.name}</span>
// //                   {selectedVote === player.id && (
// //                     <Vote className="w-5 h-5 text-primary" />
// //                   )}
// //                 </div>

// //                 <div className="mt-4">
// //                   <div className="flex justify-between items-center text-sm text-white/60">
// //                     <span>Votes: {player.votes}</span>
// //                     <div
// //                       className="h-1 flex-1 mx-4 bg-black/30 rounded-full overflow-hidden"
// //                     >
// //                       <div
// //                         className="h-full bg-primary transition-all duration-500"
// //                         style={{
// //                           width: `${(player.votes / players.length) * 100}%`
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </button>
// //             ))}
// //         </div>

// //         <div className="flex justify-center mt-8">
// //           <button
// //             onClick={() => setPhase("night")}
// //             className="btn-primary bg-accent"
// //           >
// //             Confirm Vote
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const GameInterface = () => (
// //     <div className="flex min-h-screen">
// //       <div className="flex-1 p-6">
// //         <div className="max-w-6xl mx-auto space-y-6">
// //           <header className="flex justify-between items-center">
// //             <h1 className="medieval-title text-3xl">
// //               {phase === "day" ? "Discussion Time" :
// //                phase === "night" ? "Night Falls" :
// //                "Voting Time"}
// //             </h1>
// //             <div className="flex items-center gap-4">
// //               <span className="text-white/80">Time Remaining: 2:30</span>
// //             </div>
// //           </header>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {players.map((player) => (
// //               <div
// //                 key={player.id}
// //                 className={`bg-card/30 backdrop-blur-sm rounded-lg p-4
// //                   ${player.state === "dead" ? "opacity-50" : ""}`}
// //               >
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span className="font-medieval">{player.name}</span>
// //                   {player.state === "dead" && (
// //                     <Skull className="w-5 h-5 text-red-500" />
// //                   )}
// //                 </div>

// //                 {phase === "voting" && player.state === "alive" && (
// //                   <div className="mt-2 flex justify-between items-center">
// //                     <div className="flex items-center gap-2">
// //                       <Vote className="w-4 h-4 text-white/60" />
// //                       <span className="text-sm text-white/60">
// //                         {player.votes} votes
// //                       </span>
// //                     </div>
// //                     <button className="btn-primary text-sm px-3 py-1">
// //                       Vote
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {phase === "night" && players[0].role === "killer" && (
// //             <button
// //               onClick={() => setShowKillerPanel(true)}
// //               className="fixed bottom-4 right-4 btn-primary bg-accent"
// //             >
// //               <Swords className="w-5 h-5" />
// //               Actions
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* Killer's Side Panel */}
// //       {showKillerPanel && (
// //         <div className="fixed inset-y-0 right-0 w-96 bg-card/95 backdrop-blur-sm p-6 shadow-xl animate-slide-in-right">
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-2xl font-medieval">Killer Actions</h2>
// //             <button
// //               onClick={() => setShowKillerPanel(false)}
// //               className="p-1 hover:bg-white/10 rounded-lg transition-colors"
// //             >
// //               <PanelRight className="w-5 h-5" />
// //             </button>
// //           </div>

// //           <div className="space-y-4">
// //             {players
// //               .filter(p => p.state === "alive" && p.role !== "killer")
// //               .map(player => (
// //                 <button
// //                   key={player.id}
// //                   className="w-full bg-black/30 hover:bg-black/50 rounded-lg p-4 text-left transition-colors"
// //                 >
// //                   <div className="flex justify-between items-center">
// //                     <span>{player.name}</span>
// //                     <Skull className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
// //                   </div>
// //                 </button>
// //               ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Chat Panel */}
// //       {showChat && (
// //         <div className="w-96 border-l border-primary/20 bg-card/30 backdrop-blur-sm p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h2 className="text-2xl font-medieval">Chat</h2>
// //             <button
// //               onClick={() => setShowChat(false)}
// //               className="p-1 hover:bg-white/10 rounded-lg transition-colors"
// //             >
// //               <MessageCircle className="w-5 h-5" />
// //             </button>
// //           </div>

// //           <div className="h-[calc(100vh-12rem)] flex flex-col">
// //             <div className="flex-1 space-y-3 overflow-y-auto mb-4">
// //               {/* Chat messages would go here */}
// //               <div className="bg-black/30 rounded-lg p-3">
// //                 <span className="text-white/80 text-sm">Player 2</span>
// //                 <p>I think Player 3 is suspicious...</p>
// //               </div>
// //             </div>

// //             <div className="flex gap-2">
// //               <input
// //                 type="text"
// //                 placeholder="Type a message..."
// //                 className="flex-1 bg-black/50 border border-primary/50 rounded px-4 py-2 text-white placeholder:text-white/50"
// //               />
// //               <button className="btn-primary px-4">
// //                 Send
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {!showChat && (
// //         <button
// //           onClick={() => setShowChat(true)}
// //           className="fixed bottom-4 right-4 p-3 bg-primary/80 hover:bg-primary/90 rounded-full shadow-lg"
// //         >
// //           <MessageCircle className="w-6 h-6" />
// //         </button>
// //       )}

// //       {/* Death Message */}
// //       {phase === "night" && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
// //           <div className="text-center space-y-4 animate-scale-in">
// //             <Skull className="w-20 h-20 text-red-500 mx-auto" />
// //             <h2 className="medieval-title text-4xl text-red-500">You Were Killed!</h2>
// //             <p className="text-white/80">
// //               You can still watch the game, but you cannot participate in discussions or voting.
// //             </p>
// //             <button
// //               onClick={() => setPhase("day")}
// //               className="btn-primary mt-4"
// //             >
// //               Continue as Ghost
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <>
// //       {phase === "role-reveal" ? <RoleReveal /> : (
// //         <>
// //           <GameInterface />
// //           {phase === "voting" && <VotingPhase />}

// //           {/* Action Buttons */}
// //           <div className="fixed bottom-4 right-4 flex gap-3">
// //             {!showChat && (
// //               <button
// //                 onClick={() => setShowChat(true)}
// //                 className="p-3 bg-primary/80 hover:bg-primary/90 rounded-full shadow-lg"
// //               >
// //                 <MessageCircle className="w-6 h-6" />
// //               </button>
// //             )}
// //             <button
// //               onClick={() => setPhase("voting")}
// //               className="p-3 bg-accent/80 hover:bg-accent/90 rounded-full shadow-lg"
// //             >
// //               <Vote className="w-6 h-6" />
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default GamePlay;
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:8000", { autoConnect: false });

// const GamePlay = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const role = location.state?.role || "Unknown";
//   const [deathMessage, setDeathMessage] = useState("");
//   const [deadPlayer, setDeadPlayer] = useState(null);
//   const [players, setPlayers] = useState(["Shirin", "Rhea", "Skylar"]); // Dummy player list
//   const [votingPhase, setVotingPhase] = useState(false);
//   const [selectedVote, setSelectedVote] = useState(null);
//   const [gameOver, setGameOver] = useState(false);
//   const [winner, setWinner] = useState("");
//   const [timer, setTimer] = useState(60); // Default timer (adjustable per phase)

//   useEffect(() => {
//     socket.connect();

//     socket.on("playerKilled", ({ targetName, deathMessage }) => {
//       setDeadPlayer(targetName);
//       setDeathMessage(deathMessage);
//       setTimer(5); // 5 seconds before voting starts
//       setTimeout(() => setVotingPhase(true), 5000);
//     });

//     socket.on("nextRound", ({ eliminatedPlayer }) => {
//       setDeadPlayer(eliminatedPlayer);
//       setDeathMessage(`${eliminatedPlayer} has been voted out!`);
//       setTimer(5); // 5 seconds before new round
//       setTimeout(() => {
//         setDeathMessage("");
//         setVotingPhase(false);
//       }, 5000);
//     });

//     socket.on("gameOver", ({ winner }) => {
//       setGameOver(true);
//       setWinner(winner);
//       setTimeout(() => navigate("/"), 5000);
//     });

//     return () => {
//       socket.off("playerKilled");
//       socket.off("nextRound");
//       socket.off("gameOver");
//       socket.disconnect();
//     };
//   }, [navigate]);

//   // ✅ Countdown Timer Logic
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   const votePlayerOut = async () => {
//     if (selectedVote) {
//       try {
//         await fetch("http://localhost:8000/vote-player-out", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             gameKey: "NGVQM1",
//             voter: localStorage.getItem("playerName"),
//             targetName: selectedVote,
//           }),
//         });
//       } catch (error) {
//         console.error("Error voting player out:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="absolute top-5 left-5 text-white text-2xl">
//         ⏳ {timer}s
//       </div>

//       {gameOver ? (
//         // 🏆 Game Over Screen
//         <div className="mt-6 p-6 bg-yellow-500 text-black border border-black rounded">
//           <h2 className="text-2xl font-bold">Game Over</h2>
//           <p className="mt-4">🏆 {winner} Win! 🏆</p>
//         </div>
//       ) : deathMessage ? (
//         // 🟥 Death Message Screen
//         <div className="mt-6 p-6 bg-red-800 text-white border border-red-500 rounded">
//           <h2 className="text-2xl font-bold">A Player Has Died</h2>
//           <p className="mt-4">{deathMessage}</p>
//         </div>
//       ) : votingPhase ? (
//         // 🗳️ Voting Phase
//         <div className="mt-6 p-6 bg-gray-800 text-white border border-gray-500 rounded">
//           <h2 className="text-2xl font-bold">Vote to Eliminate</h2>
//           {players.map((player) => (
//             <label key={player} className="block mt-2">
//               <input
//                 type="radio"
//                 name="voteTarget"
//                 value={player}
//                 onChange={() => setSelectedVote(player)}
//               />
//               <span className="ml-2">{player}</span>
//             </label>
//           ))}
//           <button
//             onClick={votePlayerOut}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//             disabled={!selectedVote}
//           >
//             Submit Vote
//           </button>
//         </div>
//       ) : (
//         <p className="mt-6 text-lg">Waiting for events...</p>
//       )}
//     </div>
//   );
// };

// export default GamePlay;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { autoConnect: false });

const GamePlay = () => {
  const { gameCode } = useParams();
  const [phase, setPhase] = useState("Waiting for events...");

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", gameCode);

    // ✅ Listen for phase changes
    socket.on("phaseUpdate", ({ phase }) => {
      console.log(`🔄 Phase changed: ${phase}`);
      setPhase(phase);
    });

    return () => {
      socket.off("phaseUpdate");
      socket.disconnect();
    };
  }, [gameCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl text-white">{phase}</h1>
    </div>
  );
};

export default GamePlay;
