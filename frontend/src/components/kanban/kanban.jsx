
// import { fetchAllFromEndPoint } from "../../helpers/fetchData"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./kanban.css";

const initialData = {
  lanes: [
    {
      id: "lane1",
      title: "Planned",
      cards: [],
    },
    {
      id: "lane2",
      title: "In-Progress",
      cards: [],
    },
    {
      id: "lane3",
      title: "Completed",
      cards: [],
    },
  ],
};

const mapTasksToLanes = (tasksFromServer) => {
  const updatedData = {
    lanes: initialData.lanes.map((lane) => ({ ...lane, cards: [] })),
  };

  tasksFromServer.forEach((task) => {
    const lane = updatedData.lanes.find(
      (l) => l.title.toLowerCase() === task.status.toLowerCase()
    );

    if (lane) {
      lane.cards.push({
        id: task._id,
        title: "Unnamed Task",
        description: task.description,
        user: task.user?.[0] || ""
      });
    }
  });

  return updatedData;
};

const fetchTasks = async (setData) => {
  try {
    // update your server endpoint, if different from localhost:3000
    const res = await axios.get("http://localhost:3000/tasks");
    const updatedBoardData = mapTasksToLanes(res.data);
    console.log(res.data)
    setData(updatedBoardData);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const updateStatusOnCardDrag = async (id) => {
  // when you drag the card. get the id task
  // put request to update the status
  
}

function Kanban() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    fetchTasks(setData);
  }, []); 

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
                <p className="card-description">{card.user}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Kanban;
