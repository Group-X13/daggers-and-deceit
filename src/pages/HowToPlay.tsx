const HowToPlay = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-fadeIn">
        <h1 className="medieval-title">How to Play</h1>

        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 space-y-6 text-lg">
          <section>
            <h2 className="text-2xl font-medieval mb-4">Overview</h2>
            <p className="text-white/90">
              Deceit & Daggers is a social deduction game where players must use
              their wit and intuition to identify the killer among them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medieval mb-4">Roles</h2>
            <ul className="list-disc list-inside space-y-2 text-white/90">
              <li>Innocent - Survive and identify the killer</li>
              <li>Killer - Eliminate other players without being caught</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medieval mb-4">Game Flow</h2>
            <ol className="list-decimal list-inside space-y-2 text-white/90">
              <li>Each player is secretly assigned a role</li>
              <li>
                Players participate in mini-games while the killer plans their
                moves
              </li>
              <li>
                When a player dies, everyone discusses and votes on the killer's
                identity
              </li>
              <li>
                The game continues until the killer is caught or all innocents
                are eliminated
              </li>
            </ol>
          </section>
        </div>

        <div className="flex justify-center">
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

export default HowToPlay;
