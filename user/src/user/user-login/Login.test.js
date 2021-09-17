import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import { fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Login from './Login';

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
    <Login />
    </MemoryRouter>
    );
    const mobileVal = screen.getByPlaceholderText(/MobileNo/i); 
    const passwordVal = screen.getByPlaceholderText(/password/i);
    expect(mobileVal.value).toBe("")
    fireEvent.change(mobileVal,{target:{value:'7339467878'}})
    expect(mobileVal.value).toBe('7339467878')
    expect(passwordVal.value).toBe('')
    fireEvent.change(passwordVal,{target:{value:"password@123"}})
    expect(passwordVal.value).toBe('password@123')
})
   


test('get snapshot', () => {
    render(
    <MemoryRouter>
    <Login/>
    </MemoryRouter>
    );
  const val ='one'
  const tree = renderer.create(<MemoryRouter><Login/></MemoryRouter>).toJSON();
  expect(tree).toMatchSnapshot()
  console.log(tree);
})
