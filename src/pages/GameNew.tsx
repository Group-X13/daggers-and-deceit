
const GameNew = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-fadeIn">
        <h1 className="medieval-title">New Game</h1>
        
        <div className="flex flex-col gap-6 items-center">
          <button className="btn-primary w-64">
            Host Game
          </button>
          
          <button className="btn-primary w-64">
            Join Game
          </button>
          
          <a 
            href="/" 
            className="text-white/80 hover:text-white transition-colors font-medieval"
          >
            Return to Main Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameNew;
