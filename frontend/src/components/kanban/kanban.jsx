import React, { useState } from "react";
import "./kanban.css";

const initialData = {
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      cards: [
        { id: "Card1", title: "Task 1", description: "Does something" },
        { id: "Card2", title: "Task 2", description: "Do somthing even more" },
      ],
    },
    {
      id: "lane2",
      title: "In Progress",
      cards: [],
    },
    {
      id: "lane3",
      title: "Completed",
      cards: [],
    },
    {
      id: "lane4",
      title: "Completed",
      cards: [],
    },
  ],
};

function Kanban() {
  const [data, setData] = useState(initialData);

  const handleDragStart = (e, card, sourceLaneId) => {
    e.dataTransfer.setData("card", JSON.stringify({ card, sourceLaneId }));
  };

  const handleDrop = (e, targetLaneId) => {
    e.preventDefault();
    const { card, sourceLaneId } = JSON.parse(e.dataTransfer.getData("card"));

    if (sourceLaneId === targetLaneId) return;

    const updatedLanes = data.lanes.map((lane) => {
      if (lane.id === sourceLaneId) {
        return {
          ...lane,
          cards: lane.cards.filter((c) => c.id !== card.id),
        };
      }
      if (lane.id === targetLaneId) {
        return {
          ...lane,
          cards: [...lane.cards, card],
        };
      }
      return lane;
    });

    setData({ lanes: updatedLanes });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-board">
      {data.lanes.map((lane) => (
        <div
          key={lane.id}
          className="kanban-lane"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, lane.id)}
        >
          <h3 className="lane-title">{lane.title}</h3>
          <div className="lane-cards">
            {lane.cards.map((card) => (
              <div
                key={card.id}
                className="kanban-card"
                draggable
                onDragStart={(e) => handleDragStart(e, card, lane.id)}
              >
                <h4 className="card-title">{card.title}</h4>
                <p className="card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Kanban;
