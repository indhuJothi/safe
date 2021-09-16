import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import {userEvent} from '@testing-library/user-event'
import Login from './Login'

test('renders learn react link', () => {
  render(
  <MemoryRouter>
  <Login/>
  </MemoryRouter>
  );
  const loginElement = screen.getByTestId('test-login');
  const mobile = screen.getByPlaceholderText('MobileNo');
  const password = screen.getByPlaceholderText('password');
  expect(loginElement).toBeInTheDocument();
  expect(mobile).toBeInTheDocument();
  expect(mobile).toHaveAttribute('type',"text");
  expect(mobile).toHaveValue('')
  expect(password).toBeInTheDocument();
  expect(password).toHaveAttribute('type',"password");
  expect(password).toHaveValue('')

  
});



test('renders learn react link', () => {
    render(
    <MemoryRouter>
    <Login/>
    </MemoryRouter>
    );
    const submit = screen.getByTestId('test-submit')
    expect(submit).toBeInTheDocument()
 
    // userEvent.type(screen.getByTestId('test-submit'))
  
})
    