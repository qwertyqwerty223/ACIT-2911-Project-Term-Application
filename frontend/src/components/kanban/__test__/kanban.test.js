import { fetchTasks, deleteTask } from "../kanban"; // Adjust path if needed
import axios from "axios"; // Axios import
import { waitFor } from "@testing-library/react"; // React testing utilities

// Mock axios
jest.mock("axios");
jest.mock("../../../assets/delete-icon.svg", () => "delete-icon.svg");

describe("fetchTasks", () => {
  it("should fetch tasks and update data correctly", async () => {
    // Mocking axios GET request
    const mockData = [
      { _id: "1", description: "Test Task", status: "planned", user: ["John"] },
    ];
    axios.get.mockResolvedValue({ data: mockData });

    const setData = jest.fn(); // Mocking the setData function to verify the update

    // Calling fetchTasks
    await fetchTasks(setData);

    // Check if setData was called with the correct updated data
    await waitFor(() =>
      expect(setData).toHaveBeenCalledWith({
        lanes: expect.arrayContaining([
          expect.objectContaining({
            id: "lane1",
            title: "Planned",
            cards: expect.arrayContaining([
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

  it("should handle error when fetching tasks fails", async () => {
    // Mocking axios GET request to simulate error
    axios.get.mockRejectedValue(new Error("Failed to fetch tasks"));

    const setData = jest.fn();

    // Calling fetchTasks
    await fetchTasks(setData);

    // Verifying that setData is not called when the API call fails
    await waitFor(() => expect(setData).not.toHaveBeenCalled());
  });
});

describe("deleteTasks", () => {
  it("should delete task successfully", async () => {
    // STEP 1: mock the axios DELETE request
    axios.delete.mockResolvedValue({});

    // STEP 2: mock the callback function 'onTaskDeleted'
    const onTaskDeleted = jest.fn();

    // STEP 3: call the deleteTask for success scenario
    await deleteTask("1", onTaskDeleted);

    // STEP 4: test for if the correct API URL is being called
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/tasks/1");

    // STEP 5: verify that the onTaskDeleted was called
    expect(onTaskDeleted).toHaveBeenCalledTimes(1);
  });

  // STEP 6: Test case for deletion failure
  it("Should handle error if deletion fails", async () => {
    // STEP 7: mock the axios.delete for failure
    axios.delete.mockRejectedValue(new Error("failed to delete task"));

    // STEP 8: mock the callback function 'onTaskDeleted'
    const onTaskDeleted = jest.fn();

    // STEP 9: call the deleteTask method for failure scenario
    await deleteTask("1", onTaskDeleted);

    // STEP 10: test for correct API URL calling
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/tasks/1");

    // STEP 11: verify that the onTaskDeleted in NOT called upon error
    expect(onTaskDeleted).not.toHaveBeenCalled();
  });
});
