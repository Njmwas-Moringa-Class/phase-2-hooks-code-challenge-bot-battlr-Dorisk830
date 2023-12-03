import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotCard from "./BotCard";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  const [botCollection, setBotCollection] = useState([]);
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  useEffect(() => {
    // Fetch bot data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8002/bots");
        const data = await response.json();
        setBotCollection(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const enlistBot = (botId) => {
    // Check if the bot is not already enlisted
    if (!yourBotArmy.find((bot) => bot.id === botId)) {
      const selectedBot = botCollection.find((bot) => bot.id === botId);
      setYourBotArmy((prevArmy) => [...prevArmy, selectedBot]);
    }
  };

  const releaseBot = (botId) => {
    // Remove the released bot from yourBotArmy state
    setYourBotArmy((prevArmy) => prevArmy.filter((bot) => bot.id !== botId));
  };

  const dischargeBot = async (botId) => {
    // Discharge bot from backend
    try {
      await fetch(`http://localhost:8002/bots/${botId}`, {
        method: "DELETE",
      });

      // Remove the discharged bot from yourBotArmy state
      setYourBotArmy((prevArmy) => prevArmy.filter((bot) => bot.id !== botId));
    } catch (error) {
      console.error("Error discharging bot:", error);
    }
  };

  const showBotDetails = (bot) => {
    // Set the selectedBot state to display BotSpecs
    setSelectedBot(bot);
  };

  const goBack = () => {
    // Clear the selectedBot state to go back to BotCollection
    setSelectedBot(null);
  };

  const deleteBotFromCollection = (botId) => {
    // Delete the bot from botCollection state
    setBotCollection((prevCollection) => prevCollection.filter((bot) => bot.id !== botId));
  };

  return (
    <div>
      {selectedBot ? (
        <BotSpecs bot={selectedBot} goBack={goBack} enlistBot={enlistBot} dischargeBot={dischargeBot} />
      ) : (
        <>
          <YourBotArmy yourBotArmy={yourBotArmy} releaseBot={releaseBot} dischargeBot={dischargeBot} />
          <BotCollection
            botCollection={botCollection}
            enlistBot={enlistBot}
            showBotDetails={showBotDetails}
            deleteBotFromCollection={deleteBotFromCollection}
          />
        </>
      )}
    </div>
  );
}

export default BotsPage;
