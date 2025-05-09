import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../header";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

afterEach(() => {
  cleanup();
  mockNavigate.mockClear();
});

it("Header renders links and navigates on click", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // verify links are present
  const timeline = screen.getByText(/Timeline/i);
  const kanban   = screen.getByText(/Kanban/i);
  const groups   = screen.getByText(/Groups/i);
  expect(timeline).toBeInTheDocument();
  expect(kanban).toBeInTheDocument();
  expect(groups).toBeInTheDocument();

  // simulate clicks and verify navigation
  fireEvent.click(timeline);
  expect(mockNavigate).toHaveBeenCalledWith("/");

  fireEvent.click(kanban);
  expect(mockNavigate).toHaveBeenCalledWith("/kanban");

  fireEvent.click(groups);
  expect(mockNavigate).toHaveBeenCalledWith("/groups");
});

