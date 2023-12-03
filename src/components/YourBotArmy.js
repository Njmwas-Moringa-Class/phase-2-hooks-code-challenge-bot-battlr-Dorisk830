import React, { useState } from "react";
import BotCard from "./BotCard"; // Assuming you have a BotCard component

function YourBotArmy({ yourBotArmy, enlistBot, releaseBot, dischargeBot }) {
  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          <h2>Your Bot Army</h2>
          {yourBotArmy.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              buttonText="Release"
              onClick={() => releaseBot(bot.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
