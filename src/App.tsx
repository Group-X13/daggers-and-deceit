import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GameNew from "./pages/GameNew";
import JoinGame from "./pages/JoinGame";
import Lobby from "./pages/Lobby";
import GamePlay from "./pages/GamePlay";
import HowToPlay from "./pages/HowToPlay";
import NotFound from "./pages/NotFound";
import VotingLobby from "./pages/VotingLobby";
import Leaderboard from "./pages/Leaderboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary to-black">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game/new" element={<GameNew />} />
            <Route path="/game/join" element={<JoinGame />} />
            <Route path="/lobby/:gameCode" element={<Lobby />} />
            <Route path="/game/:gameCode" element={<GamePlay />} />{" "}
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/voting/:gameKey" element={<VotingLobby />} />
            <Route path="/leaderboard/:gameCode" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
