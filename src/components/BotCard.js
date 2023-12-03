import React from "react";

function BotCard({ bot, buttonText, onClick }) {
  return (
    <div className="column">
      <div className="ui fluid card">
        <div className="image">
          <img src={bot.avatar_url} alt={bot.name} />
        </div>
        <div className="content">
          <div className="header">{bot.name}</div>
          <div className="meta">{bot.bot_class}</div>
          <div className="description">{bot.catchphrase}</div>
        </div>
        <div className="extra content">
          <button className="ui button" onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BotCard;
