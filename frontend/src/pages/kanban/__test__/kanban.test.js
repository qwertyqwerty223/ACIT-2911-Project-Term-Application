import {
  fetchTasks,
  deleteTask,
  mapTasksToLanes,
  updateStatusOnCardDrag,
  AddTaskCard,
} from "../kanban"; // Adjust path if needed
import axios from "axios"; // Axios import
import { waitFor } from "@testing-library/react"; // React testing utilities

// Mock axios to control API behaviour
jest.mock("axios");
// mock SVG asset to avoid file-loader issues
jest.mock("../../../assets/delete-icon.svg", () => "delete-icon.svg");
jest.mock("../../../assets/edit-icon.svg", () => "edit-icon.svg");

// Test Block for fetching tasks
describe("fetchTasks", () => {

  // Test Case #1: Successful task fetching
  it("should fetch tasks and update data correctly", async () => {
    // Create the shape of mock data for axios.get
    const mockData = [
      { _id: "1", description: "Test Task", status: "planned", user: ["John"] },
    ];

    // mock axios.get to resolve with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    // mock state setter
    const setData = jest.fn();

    // Calling fetchTasks with state setter mock
    await fetchTasks(setData);

    // Check if setData was called with the correct updated data
    await waitFor(() =>
      // assert that setData was called with correct data structure
      expect(setData).toHaveBeenCalledWith({
        // verify lanes array to contain specific objects
        lanes: expect.arrayContaining([
          // verify object to have specific properties
          expect.objectContaining({
            id: "lane1",
            title: "Planned",
            // verify card array to contain the expected objects
            cards: expect.arrayContaining([
              // verify the object is the one with title and description keys
              expect.objectContaining({
                title: "Unnamed Task",
                description: "Test Task",
              }),
            ]),
          }),
        ]),
      })
    );
  });

  // Test Case #2: handle task fetch errors
  it("should handle error when fetching tasks fails", async () => {
    // Mocking axios GET request to reject with an error
    axios.get.mockRejectedValue(new Error("Failed to fetch tasks"));

    // define mock for state setter
    const setData = jest.fn();

    // Calling fetchTasks with state setter mock
    await fetchTasks(setData);

    // Verifying that setData is not called when the API call fails
    await waitFor(() => expect(setData).not.toHaveBeenCalled());
  });
});

// Test block for task deletion (success + failure)
describe("deleteTasks", () => {
  // Test Case #3: Success task deletion
  it("should delete task successfully", async () => {
    // mock the axios DELETE request to resolve with empty object
    axios.delete.mockResolvedValue({});

    // mock the callback function 'onTaskDeleted'
    const onTaskDeleted = jest.fn();

    // call the deleteTask for success scenario
    await deleteTask("1", onTaskDeleted);

    // test for if the correct API URL is being called
    expect(axios.delete).toHaveBeenCalledWith("https://projecttracker-pac8.onrender.com/tasks/1");

    // verify that the onTaskDeleted was called
    expect(onTaskDeleted).toHaveBeenCalledTimes(1);
  });

  // Test Case #4: handling deletion failure
  it("Should handle error if deletion fails", async () => {
    // mock the axios.delete for failure
    axios.delete.mockRejectedValue(new Error("failed to delete task"));

    // mock the callback function 'onTaskDeleted'
    const onTaskDeleted = jest.fn();

    // call the deleteTask method for failure scenario
    await deleteTask("1", onTaskDeleted);

    // test for correct API URL calling
    expect(axios.delete).toHaveBeenCalledWith("https://projecttracker-pac8.onrender.com/tasks/1");

    // verify that the onTaskDeleted in NOT called upon error
    expect(onTaskDeleted).not.toHaveBeenCalled();
  });
});

// Test block for mapping tasks to lanes
describe("mapTasksToLanes", () => {
  const initialLanes = [
    { id: "lane1", title: "Planned", cards: [] },
    { id: "lane2", title: "In-Progress", cards: [] },
    { id: "lane3", title: "Completed", cards: [] },
  ];

  // TEST CASE #5: Correctly map tasks to lanes
  it("should correctly map tasks to their lanes", () => {
    const tasksFromServer = [
      { _id: "1", description: "Task 1", status: "Planned", user: ["UserA"] },
      {
        _id: "2",
        description: "Task 2",
        status: "In-Progress",
        user: ["UserB"],
      },
      { _id: "3", description: "Task 3", status: "Completed", user: ["UserC"] },
      { _id: "4", description: "Task 4", status: "Planned" },
    ];

    const result = mapTasksToLanes(tasksFromServer);

    expect(result.lanes[0].cards).toHaveLength(2);
    expect(result.lanes[0].cards[0]).toEqual(
      expect.objectContaining({ id: "1", description: "Task 1", user: "UserA" })
    );
    expect(result.lanes[0].cards[1]).toEqual(
      expect.objectContaining({ id: "4", description: "Task 4", user: "" })
    );

    expect(result.lanes[1].cards).toHaveLength(1);
    expect(result.lanes[1].cards[0]).toEqual(
      expect.objectContaining({ id: "2", description: "Task 2", user: "UserB" })
    );

    expect(result.lanes[2].cards).toHaveLength(1);
    expect(result.lanes[2].cards[0]).toEqual(
      expect.objectContaining({ id: "3", description: "Task 3", user: "UserC" })
    );
  });

  // TEST CASE #6: Handles empty list of tasks
  it("should return lanes with empty cards if no tasks are provided", () => {
    const tasksFromServer = [];
    const result = mapTasksToLanes(tasksFromServer);
    expect(result.lanes[0].cards).toHaveLength(0);
    expect(result.lanes[1].cards).toHaveLength(0);
    expect(result.lanes[2].cards).toHaveLength(0);
  });
});

describe("updateStatusOnCardDrag", () => {
  // TEST CASE #7: successful update task status
  it("should call axios.put with the correct data to update task status", async () => {
    const card = {
      id: "1",
      description: "Task no. 1",
      user: "User1",
    };
    const newStatus = "Completed";
    axios.patch.mockResolvedValue({});

    await updateStatusOnCardDrag(card, newStatus);

    expect(axios.patch).toHaveBeenCalledWith("https://projecttracker-pac8.onrender.com/tasks/1", {
      _id: "1",
      description: "Task no. 1",
      status: "Completed",
      user: ["User1"],
    });
  });

  // TEST CASE #8: Handle API error during status update
   it("should log an error if axios.put fails", async () => {
    const card = {
      id: "1",
      description: "Task no. 1",
      user: "User1",
    };
    const newStatus = "Completed";
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    axios.patch.mockRejectedValue(new Error("API PUT Error"));

    await updateStatusOnCardDrag(card, newStatus);

    expect(axios.patch).toHaveBeenCalledWith(
      "https://projecttracker-pac8.onrender.com/tasks/1",
      expect.anything()
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error Sending tasks:", expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});