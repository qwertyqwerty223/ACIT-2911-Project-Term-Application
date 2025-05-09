import { fetchEvents, deleteEvent } from "../timeLine"; // Adjust path if needed
import axios from "axios"; // Axios import
import { waitFor } from "@testing-library/react"; // React testing utilities

// Mock axios
jest.mock("axios");
jest.mock("../../../assets/delete-icon.svg", () => "delete-icon.svg");

// Mock fetchEvents
jest.mock("../timeLine", () => ({
  ...jest.requireActual("../timeLine"), // Import actual functions except fetchEvents
  fetchEvents: jest.fn(), // Mock fetchEvents function
}));

describe("HandleEvents", () => {
  it("should fetch events and update data correctly", async () => {
    // Mocking axios GET request
    const mockData = {
      data: {
        events: [
          {
            _id: "681d6627b4675a6ae1708069",
            title: "This is a new event",
            date: "2025-05-08T00:00:00.000Z",
            description: "something something something",
          },
          {
            _id: "681d7422d9b13cc21a4d4753",
            title: "another new event",
            date: "2025-05-10T00:00:00.000Z",
            description: "Lorem ipsum",
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockData);

    const setTimelineEvent = jest.fn(); // Mocking the setData function to verify the update

    // Calling fetchTasks
    await fetchEvents(setTimelineEvent);

    // Check if setData was called with the correct updated data
    expect(fetchEvents).toHaveBeenCalledWith([
      {
        id: "681d6627b4675a6ae1708069",
        title: "This is a new event",
        description: "something something something",
        date: "5/8/2025", // Format date to "en-US"
      },
      {
        id: "681d7422d9b13cc21a4d4753",
        title: "another new event",
        description: "Lorem ipsum",
        date: "5/10/2025", // Format date to "en-US"
      },
    ]);
  });

  it("should handle error when fetching events fails", async () => {
    // Mocking axios GET request to simulate error
    axios.get.mockRejectedValue(new Error("Failed to fetch events"));

    const setTimelineEvent = jest.fn();

    // Calling fetchEvents
    await fetchEvents(setTimelineEvent);

    // Verifying that setTimelineEvent is not called when the API call fails
    await waitFor(() => expect(setTimelineEvent).not.toHaveBeenCalled());
  });
});

describe("deleteEvents", () => {
  it("should delete Event successfully", async () => {
    // STEP 1: mock the axios DELETE request
    axios.delete.mockResolvedValue({});

    // STEP 2: mock the callback function 'onEventDeleted'
    const onEventDeleted = jest.fn();

    // STEP 3: call the deleteTask for success scenario
    await deleteEvent("1", onEventDeleted);

    // STEP 4: test for if the correct API URL is being called
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/events/1");

    // STEP 5: verify that the onTaskDeleted was called
    expect(onEventDeleted).toHaveBeenCalledTimes(1);
  });

  // STEP 6: Test case for deletion failure
  it("Should handle error if deletion fails", async () => {
    // STEP 7: mock the axios.delete for failure
    axios.delete.mockRejectedValue(new Error("failed to delete event"));

    // STEP 8: mock the callback function 'onEventDeleted'
    const onEventDeleted = jest.fn();

    // STEP 9: call the deleteTask method for failure scenario
    await deleteEvent("1", onEventDeleted);

    // STEP 10: test for correct API URL calling
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/events/1");

    // STEP 11: verify that the onEventDeleted in NOT called upon error
    expect(onEventDeleted).not.toHaveBeenCalled();
  });
});
