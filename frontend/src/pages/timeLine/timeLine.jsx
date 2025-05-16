import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./timeLine.css";

import { useLocation  } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchAllFromEndPoint } from "../../helpers/fetchData";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";



const formatEvents = (sourceEventData) => {
  const formattedData = sourceEventData.events
    .filter(
      (event) => event._id && event.title && event.description && event.date
    )
    .map((event) => ({
      id: event._id,
      title: event.title,
      description: event.description,
      date:
        new Date(event.date).toString() === "Invalid Date"
          ? "Invalid Date"
          : new Date(event.date).toLocaleDateString("en-US", {
              timeZone: "UTC",
            }),
    }));

  console.log("Formatted Event Data:", formattedData);
  return formattedData;
};

const fetchEvents = async (setTimelineEvent, location) => {
  const token = location.pathname.split('/')[3]
  try {
    // update your server endpoint, if different from localhost:3000
    const res = await axios.get(`${fetchAllFromEndPoint("events")}/${token}`, {
      withCredentials: true
    });
    console.log(res)
    // Check if res.data exists
    // If res.data does not exist, it will return undefined . Which we do not want
    const updatedEventData = formatEvents(res.data);
    console.log(res.data);
    setTimelineEvent(updatedEventData);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

const deleteEvent = async (eventID, atEventDeleted) => {
  try {
    await axios.delete(fetchAllFromEndPoint(`events/${eventID}`));
    atEventDeleted();
  } catch (error) {
    console.error("Error Deleting event:", error);
  }
};

function TimeLine() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdate, setUpdate] = useState(false)
  const [eventId, setEventId] = useState('')
  const [timelineEvents, setTimelineEvent] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    tokenId: ""
  });

  const location = useLocation()

  useEffect(() => {
    fetchEvents(setTimelineEvent, location);
  }, []);


  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setNewEvent({
      ...newEvent,
      [inputName]: inputValue,
    });
  };

  const AddNewEvent = async (event) => {
    event.preventDefault();

    const newTimelineEvent = {
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      tokenId: location.pathname.split('/')[3]
    };

    // SETUP BACKEND INTEGRATION HERE FOR STORING EVENTS
    try {
      await axios.post(
        fetchAllFromEndPoint("events/create-event"),
        newTimelineEvent
      );
      await fetchEvents(setTimelineEvent, location);
    } catch (error) {
      console.error("Error adding event:", error);
    }

    setNewEvent({
      title: "",
      description: "",
      date: "",
      tokenId: ""
    });

    setIsFormVisible(false);
  };

  const updateEvent = async (eventID) => {
    const updatedTimelineEvent = {
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
    };

    // SETUP BACKEND INTEGRATION HERE FOR STORING EVENTS
    try {
      await axios.patch(
        fetchAllFromEndPoint(`events/${eventID}`),
        newEvent
      );
      await fetchEvents(setTimelineEvent, location);
    } catch (error) {
      console.error("Error updating event:", error);
    }

    setNewEvent({
      title: "",
      description: "",
      date: "",
      tokenId: ""
    });

    setIsFormVisible(false);
  };


  return (
    <div className="timeline">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="add-event-button"
      >
        {isFormVisible ? "Cancel" : 'Add Timeline Event'}
      </button>

      {isFormVisible && (
        <form onSubmit={isUpdate ?()=>{updateEvent(eventId)}: AddNewEvent} className="add-event-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Write a description for the event"
            value={newEvent.description}
            onChange={handleInputChange}
          />

          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
          />
          <button type="submit">{isUpdate ? 'Update Event': 'Add Event'}</button>
        </form>
      )}
      <VerticalTimeline>
        {timelineEvents.map((a) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#fff", color: "#000" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date={a.date}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            key={a.id}
          >
            <h3 className="vertical-timeline-element-title">{a.title}</h3>
            <p>{a.description}</p>
            <button
              className="delete-event-button"
              onClick={() => {
                deleteEvent(a.id, () => fetchEvents(setTimelineEvent, location));
              }}
              title="Delete event"
            >
              <img src={deleteIcon} alt="Delete Icon" />
            </button>
            <button
              className="update-event-button"
              onClick={() => {
                setIsFormVisible(true)
                setUpdate(true)
                setEventId(a.id)
              }}
              title="update event"
            >
              <img src={editIcon} alt="Delete Icon" />
            </button>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export {fetchEvents, deleteEvent};
export default TimeLine;
