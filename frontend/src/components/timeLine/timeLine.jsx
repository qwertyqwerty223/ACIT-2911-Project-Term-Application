import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./timeLine.css";
// import activities from "../../data/sample";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchAllFromEndPoint } from "../../helpers/fetchData";

const formatEvents = (sourceEventData) => {
  const formattedData = sourceEventData.events.map((event) => ({
    id: event._id,
    title: event.title,
    description: event.description,
    date: new Date(event.date).toLocaleDateString("en-US"),
  }));

  return formattedData;
};

const fetchEvents = async (setTimelineEvent) => {
  try {
    // update your server endpoint, if different from localhost:3000
    const res = await axios.get(fetchAllFromEndPoint("events"));
    const updatedEventData = formatEvents(res.data);
    setTimelineEvent(updatedEventData);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

function TimeLine() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [timelineEvents, setTimelineEvent] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchEvents(setTimelineEvent);
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
    };

    // SETUP BACKEND INTEGRATION HERE FOR STORING EVENTS
    try {
      await axios.post(fetchAllFromEndPoint("events/create-event"), newTimelineEvent);
      await fetchEvents(setTimelineEvent);
    } catch (error) {
      console.error("Error adding event:", error);
    }

    setNewEvent({
      title: "",
      description: "",
      date: "",
    });

    setIsFormVisible(false);
  };

  return (
    <div className="timeline">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="add-event-button"
      >
        {isFormVisible ? "Cancel" : "Add Timeline Event"}
      </button>

      {isFormVisible && (
        <form onSubmit={AddNewEvent} className="add-event-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Write a description for the event"
            value={newEvent.description}
            onChange={handleInputChange}
            required
          />

          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Save Event</button>
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
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default TimeLine;
