import { fetchEvents, deleteEvent } from "../timeLine"; // Adjust path if needed
import axios from "axios"; // Axios import
import { fireEvent, waitFor, render, screen } from "@testing-library/react"; // React testing utilities
import React from "react";

// Mock axios functions
jest.mock("axios");

// Mock assets to resolve errors
jest.mock("../../../assets/delete-icon.svg", () => "delete-icon.svg");
jest.mock("../../../assets/edit-icon.svg", () => "edit-icon.svg");

// Mock useLocation to provide a dynamic token
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      pathname: "/projectName/sectionName/token123",
    }),
  };
});

// Test block for handling events
describe("HandleEvents", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  // TEST CASE #1: Successful data fetching
  it("should fetch events and update data correctly", async () => {
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

    const setTimelineEvent = jest.fn();
    const location = { pathname: "/projectName/sectionName/token123" };

    await fetchEvents(setTimelineEvent, location);

    expect(setTimelineEvent).toHaveBeenCalledWith([
      {
        id: "681d6627b4675a6ae1708069",
        title: "This is a new event",
        description: "something something something",
        date: "5/8/2025",
      },
      {
        id: "681d7422d9b13cc21a4d4753",
        title: "another new event",
        description: "Lorem ipsum",
        date: "5/10/2025",
      },
    ]);
  });

  // TEST CASE #2: Handling fetch errors
  it("should handle error when fetching events fails", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch events"));

    const setTimelineEvent = jest.fn();
    const location = { pathname: "/projectName/sectionName/token123" };

    await fetchEvents(setTimelineEvent, location);

    await waitFor(() => expect(setTimelineEvent).not.toHaveBeenCalled());
  });

  // TEST CASE #2: Handling empty response
  it("should handle empty events response", async () => {
    axios.get.mockResolvedValue({ data: { events: [] } });

    const setTimelineEvent = jest.fn();
    const location = { pathname: "/projectName/sectionName/token123" };

    await fetchEvents(setTimelineEvent, location);

    expect(setTimelineEvent).toHaveBeenCalledWith([]);
  });
});

// Test block for deleting events
describe("deleteEvents", () => {
  // TEST CASE #3: Successful event deletion
  it("should delete event successfully", async () => {
    axios.delete.mockResolvedValue({});

    const onEventDeleted = jest.fn();

    await deleteEvent("1", onEventDeleted);

    // expect(axios.delete).toHaveBeenCalledWith(
    //   "https://projecttracker-pac8.onrender.com/events/1"
    // );
    expect(onEventDeleted).toHaveBeenCalledTimes(1);
  });

  // TEST CASE #4: Handling deletion errors
  it("should handle error if deletion fails", async () => {
    axios.delete.mockRejectedValue(new Error("Failed to delete event"));

    const onEventDeleted = jest.fn();

    await deleteEvent("1", onEventDeleted);

    // expect(axios.delete).toHaveBeenCalledWith(
    //   "https://projecttracker-pac8.onrender.com/events/1"
    // );
    expect(onEventDeleted).not.toHaveBeenCalled();
  });
});