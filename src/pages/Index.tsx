
import { useNavigate } from "react-router-dom";
import { Settings, HelpCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-4">
        <button className="p-2 rounded-full bg-muted/20 hover:bg-muted/30 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-full bg-muted/20 hover:bg-muted/30 transition-colors">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
      
      <div className="w-full max-w-4xl animate-fadeIn">
        <h1 className="medieval-title mb-16">
          deceit & daggers
        </h1>
        
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={() => navigate("/game/new")}
            className="btn-primary w-64"
          >
            Start Game
          </button>
          
          <button 
            onClick={() => navigate("/how-to-play")}
            className="text-white/80 hover:text-white transition-colors font-medieval"
          >
            How to Play
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative w-full h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};

export default Index;
