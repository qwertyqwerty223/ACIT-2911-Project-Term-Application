import { fetchEvents, deleteEvent } from "../timeLine"; // Adjust path if needed
import axios from "axios"; // Axios import
import { fireEvent, waitFor, render, screen } from "@testing-library/react"; // React testing utilities
import React from "react";

// Mock axios functions
// allows me to make mocks for axios.get, axios.delete, etc.
// i.e. lets me define what axios.* should return or do during the test
jest.mock("axios");

// defining the image asset mock to resolve error
jest.mock("../../../assets/delete-icon.svg", () => "delete-icon.svg");

// Define a test block - a group of tests
// Test block for Handling events
describe("HandleEvents", () => {
  // runs before each test in this "describe" test block
  beforeEach(() => {
    // clears any previous usage data from the mock function axios.get
    axios.get.mockClear();
  });

  // TEST CASE #1: for successful data fetching
  it("should fetch events and update data correctly", async () => {
    // defines the shape of the data axios.get is suppose to return from the API
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

    // returns a promise that resolves with the mock data mentioned above
    axios.get.mockResolvedValue(mockData);

    // mock function for simulating the state setter
    const setTimelineEvent = jest.fn();

    // call fetchEvents with the state setter mock
    await fetchEvents(setTimelineEvent);

    // verify that setTimelineEvent is called with the correct data
    expect(setTimelineEvent).toHaveBeenCalledWith([
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

  // TEST CASE #2: for handling fetch errors
  it("should handle error when fetching events fails", async () => {
    // axios.get mock to reject with an error
    axios.get.mockRejectedValue(new Error("Failed to fetch events"));

    // mock for state setter
    const setTimelineEvent = jest.fn();

    // call fetchEvents with state setter
    await fetchEvents(setTimelineEvent);

    // Verify that state setter was not called upon error
    await waitFor(() => expect(setTimelineEvent).not.toHaveBeenCalled());
  });

  // TEST CASE #3: handling empty response
  it("should handle empty events response", async () => {
    axios.get.mockResolvedValue({ data: { events: [] } });
    const setTimelineEvent = jest.fn();
    await fetchEvents(setTimelineEvent);
    expect(setTimelineEvent).toHaveBeenCalledWith([]);
  });

  // TEST CASE #4: handing incorrect data
  it("should handle incorrect event data", async () => {
    axios.get.mockResolvedValue({ data: { events: [{ notAKey: "badData" }] } });
    const setTimelineEvent = jest.fn();
    await fetchEvents(setTimelineEvent);
    expect(setTimelineEvent).toHaveBeenCalledWith([]);
  });
});

// Test block for deleting Events (success + failure)
describe("deleteEvents", () => {
  // TEST CASE #5: successful event deletion
  it("should delete Event successfully", async () => {
    // Mock axios.delete to resolve successfully
    axios.delete.mockResolvedValue({});

    // mock function for deletion callback
    const onEventDeleted = jest.fn();

    // call deleteEvent with sample ID and callback mock
    await deleteEvent("1", onEventDeleted);

    // verify that axios.delete was called with the correct URL
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/events/1");

    // verify that the callback was called exactly once
    expect(onEventDeleted).toHaveBeenCalledTimes(1);
  });

  // TEST CASE #6: handling deletion errors
  it("Should handle error if deletion fails", async () => {
    // create axios.delete mock for rejecting with an error
    axios.delete.mockRejectedValue(new Error("failed to delete event"));

    // callback mock
    const onEventDeleted = jest.fn();

    // call deleteEvent with sample ID and callback mock
    await deleteEvent("1", onEventDeleted);

    // Verify that axios.delete was attempted with the correct URL
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/events/1");

    // Verify that callback was not called upon error
    expect(onEventDeleted).not.toHaveBeenCalled();
  });

  // TEST CASE #7: handling invalid id for deletion
  it("should handle invalid event ID during deletion", async () => {
    axios.delete.mockRejectedValue(new Error("Event not found"));
    const onEventDeleted = jest.fn();
    await deleteEvent("999", onEventDeleted);
    expect(onEventDeleted).not.toHaveBeenCalled();
  });
});

