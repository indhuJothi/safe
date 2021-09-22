import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import SignUp from "../SignUp";
import userdata from "../user.json";

afterEach(cleanup);

describe("testing signup component", () => {
  test("rendering signup", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const signUpComponent = screen.getByTestId("signUp");
    expect(signUpComponent).toBeInTheDocument();
  });

  test("checking the given fields in the document", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const nameField = screen.getByPlaceholderText("User Name");
    const emailField = screen.getByPlaceholderText("xyz@domain.com");
    const mobileField = screen.getByPlaceholderText("MobileNo");
    const passwordField = screen.getByPlaceholderText("Password");
    const confirmPasswordField =
      screen.getByPlaceholderText("Confirm Password");

    expect(nameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(mobileField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();
  });

  test("checking field value matchin the condtion", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const nameValue = screen.getByPlaceholderText("User Name");
    const emailValue = screen.getByPlaceholderText("xyz@domain.com");
    const mobileValue = screen.getByPlaceholderText("MobileNo");
    const passwordValue = screen.getByPlaceholderText("Password");
    const confirmPasswordValue =
      screen.getByPlaceholderText("Confirm Password");

    fireEvent.submit(nameValue, { target: { value: "Indhu" } });
    fireEvent.submit(emailValue, { target: { value: "indhu99.p@gmail.com" } });
    fireEvent.submit(mobileValue, { target: { value: 7339467878 } });
    fireEvent.submit(passwordValue, { target: { value: "Indhu@99" } });
    fireEvent.submit(confirmPasswordValue, { target: { value: "Indhu@99" } });
    expect(nameValue.value).toMatch(/^[a-zA-Z\s]{3,15}$/);
    expect(emailValue.value).toMatch(/^[a-zA-Z0-9+_.-]+@[a-zA-Z.]+$/);
    expect(mobileValue.value).toMatch(/^[6-9]\d{9}$/);
    expect(passwordValue.value).toMatch(/^[A-Za-z0-9@\s]{3,15}$/);
    expect(confirmPasswordValue.value).toMatch(passwordValue.value);
  });

  test("checking field values on fireEvent", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const nameValue = screen.getByPlaceholderText("User Name");
    const emailValue = screen.getByPlaceholderText("xyz@domain.com");
    const mobileValue = screen.getByPlaceholderText("MobileNo");
    const passwordValue = screen.getByPlaceholderText("Password");
    const confirmPasswordValue =
      screen.getByPlaceholderText("Confirm Password");

    expect(nameValue.value).toBe("");
    expect(emailValue.value).toBe("");
    expect(mobileValue.value).toBe("");
    expect(passwordValue.value).toBe("");
    expect(confirmPasswordValue.value).toBe("");
    fireEvent.submit(nameValue, { target: { value: "Indhu" } });
    expect(nameValue.value).toBe(userdata.user.Name);
    fireEvent.submit(emailValue, { target: { value: "indhu@gmail.com" } });
    expect(emailValue.value).toBe(userdata.user.Email);
    fireEvent.submit(mobileValue, { target: { value: 7339467878 } });
    expect(mobileValue.value).toBe(userdata.user.mobile);
    fireEvent.submit(passwordValue, { target: { value: "Indhu@99" } });
    expect(passwordValue.value).toBe(userdata.user.password);
    fireEvent.submit(confirmPasswordValue, { target: { value: "Indhu@99" } });
    expect(confirmPasswordValue.value).toBe(userdata.user.ConfirmPassword);
  });

  test("get snapshot", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const tree = renderer
      .create(
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
