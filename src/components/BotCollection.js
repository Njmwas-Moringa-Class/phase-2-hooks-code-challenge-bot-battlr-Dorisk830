import React from "react";
import BotCard from "./BotCard";

function BotCollection({ botCollection, enlistBot }) {
  return (
    <div className="ui four column grid">
      <div className="row">
        <h2>Collection of all bots</h2>
        {botCollection.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            buttonText="Enlist"
            onClick={() => enlistBot(bot.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
