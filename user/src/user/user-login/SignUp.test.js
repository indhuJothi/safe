import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import SignUp from './SignUp'

test('renders learn react link', () => {
  render(
  <MemoryRouter>
  <SignUp/>
  </MemoryRouter>
  );
  const signUpElement = screen.getByTestId('test-signUp');
  expect(signUpElement).toBeInTheDocument();
});