import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../header";
import React from "react";

// Create a mock function to replace useNavigate hook from react-router-dom
const mockNavigate = jest.fn();

// replaces the react-router-dom with a custom jest implementation
jest.mock("react-router-dom", () => {
  // import the actual module
  const actual = jest.requireActual("react-router-dom");
  // return the actual exports from the module
  return {
    ...actual,
    // switch useNavigate with the custom "mockNavigate" jest function
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/projectName/sectionName/token123"
    })
  };
});


// this runs after each test case in the file
afterEach(() => {

  // unmounts "render" components to keep a clean state for next test 
  cleanup();

  // clears stored info. from mockNavigate
  mockNavigate.mockClear();
});

// test case
it("Header renders links and navigates on click", () => {

  // renders the Header components
  render(

    // MemoryRouter provides router context to useNavigate
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // verify links are present by finding the element containing the link text
  const timeline = screen.getByText(/Timeline/i);
  const kanban   = screen.getByText(/Kanban/i);

  // assertions for checking if the found element is part of the rendered document
  expect(timeline).toBeInTheDocument();
  expect(kanban).toBeInTheDocument();

  // simulates a user clicking "timeline" link or going to this link
  fireEvent.click(timeline);
  // checks if mockNavigate is called with "/" arguement upon click
  expect(mockNavigate).toHaveBeenCalledWith("/projectName/timeline/token123");

  fireEvent.click(kanban);
  expect(mockNavigate).toHaveBeenCalledWith("/projectName/kanban/token123");

});

