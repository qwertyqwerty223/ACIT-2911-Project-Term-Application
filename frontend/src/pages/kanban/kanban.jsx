import { useState, useEffect } from "react";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import axios from "axios";
import "./kanban.css";

import { useLocation } from "react-router-dom";

function AddTaskCard({
  visible,
  mode,
  data,
  onToggle,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="add-task-card">
      <button onClick={onToggle} className="add-task-button">
        {visible ? "Cancel" : mode === "add" ? "Add Task" : "Edit Task"}
      </button>
      {visible && (
        <form onSubmit={onSubmit} className="add-task-form">
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={data.description}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="user"
            placeholder="Assigner user"
            value={data.user}
            onChange={onChange}
          />
          <select
            name="status"
            value={data.status}
            onChange={onChange}
            required
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit">
            {mode === "add" ? "Save Task" : "Update Task"}
          </button>
        </form>
      )}
    </div>
  );
}

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
        user: task.user?.[0] || "",
      });
    }
  });

  return updatedData;
};
// import.meta.env.VITE_BASE_SERVER_URL}/tasks/${card.id
const updateStatusOnCardDrag = async (card, newStatus) => {
  try {
    await axios.patch(`https://projecttracker-pac8.onrender.com/tasks/${card.id}`, {
      _id: card.id,
      description: card.description,
      status: newStatus,
      user: card.user ? [card.user] : [],
    }, {withCredentials: true});
  } catch (error) {
    console.error("Error Sending tasks:", error);
  }
};

const deleteTask = async (cardID, onTaskDeleted) => {
  try {
    await axios.delete(`https://projecttracker-pac8.onrender.com/tasks/${cardID}`, {withCredentials: true});
    if (onTaskDeleted) onTaskDeleted();
    window.location.reload();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const fetchTasks = async (setData) => {
  try {
    const tokenId = window.location.pathname.split("/")[3];
    const res = await axios.get(`https://projecttracker-pac8.onrender.com/tasks/${tokenId}`, {
      withCredentials: true,
    });

    setData(mapTasksToLanes(res.data));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

function Kanban() {
  const location = useLocation();
  const [data, setData] = useState(initialData);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [formData, setFormData] = useState({
    description: "",
    user: "",
    status: "planned",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks(setData);
  }, []);

  const handleFormToggle = () => {
    setFormMode("add");
    setFormData({ description: "", user: "", status: "planned" });
    setEditingTaskId(null);
    setFormVisible((v) => !v);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setEditingTaskId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenId = window.location.pathname.split("/")[3];
      await axios.post(
        `https://projecttracker-pac8.onrender.com/tasks/create-task`,
        { ...formData, tokenId, user: formData.user ? [formData.user] : [] },
        { withCredentials: true }
      );
      await fetchTasks(setData);
      // window.location.reload();
      handleFormCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://projecttracker-pac8.onrender.com/tasks/${editingTaskId}`,
        {
          description: formData.description,
          user: formData.user ? [formData.user] : [],
          status: formData.status,
        },
        { withCredentials: true }
      );
      await fetchTasks(setData);
      // window.location.reload();
      handleFormCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (card, laneTitle) => {
    setFormMode("edit");
    setFormData({
      description: card.description,
      user: card.user,
      status: laneTitle.toLowerCase(),
    });
    setEditingTaskId(card.id);
    setFormVisible(true);
  };

  const handleDragStart = (e, card, sourceLaneId) => {
    e.dataTransfer.setData("card", JSON.stringify({ card, sourceLaneId }));
  };

  const handleDrop = async (e, targetLaneId) => {
    e.preventDefault();
    const { card, sourceLaneId } = JSON.parse(e.dataTransfer.getData("card"));

    if (sourceLaneId === targetLaneId) return;

    const targetLane = data.lanes.find((lane) => lane.id === targetLaneId);
    const newStatus = targetLane.title;

    await updateStatusOnCardDrag(card, newStatus);

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
      <AddTaskCard
        visible={formVisible}
        mode={formMode}
        data={formData}
        onToggle={handleFormToggle}
        onChange={handleFormChange}
        onSubmit={formMode === "add" ? handleAddSubmit : handleUpdateSubmit}
        onCancel={handleFormCancel}
      />

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
                <p className="card-description">{card.description}</p>
                <p className="card-description">{card.user}</p>
                <button
                  className="edit-task-button"
                  onClick={() => handleEditClick(card, lane.title)}
                  title="Edit Task"
                >
                  <img src={editIcon} alt="Edit" />
                </button>
                <button
                  className="delete-task-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(card.id, fetchTasks);
                  }}
                  title="Delete Task"
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export {
  fetchTasks,
  deleteTask,
  mapTasksToLanes,
  updateStatusOnCardDrag,
  AddTaskCard,
};
export default Kanban;
