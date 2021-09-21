import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import renderer from 'react-test-renderer';
import Login from '../Login';
import userdata from '../user.json'


afterEach(cleanup)

describe('login component testing',()=>{
  test('renders login component', () => {
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
  
  
  
  test('testing fire events with mock data', () => {
      render(
      <MemoryRouter>
      <Login />
      </MemoryRouter>
      );
      const mobileVal = screen.getByPlaceholderText(/MobileNo/i); 
      const passwordVal = screen.getByPlaceholderText(/password/i);
      expect(mobileVal.value).toBe("")
      fireEvent.change(mobileVal,{target:{value:7339467878}})
      expect(mobileVal.value).toBe(userdata.user.mobile)
      expect(passwordVal.value).toBe('')
      fireEvent.change(passwordVal,{target:{value:"Indhu@99"}})
      expect(passwordVal.value).toBe(userdata.user.password)
  })
     

  test('testing with wrong data', () => {
    render(
    <MemoryRouter>
    <Login />
    </MemoryRouter>
    );

    const mobileVal = screen.getByPlaceholderText(/MobileNo/i); 
    const passwordVal = screen.getByPlaceholderText(/password/i);
    expect(mobileVal.value).toBe("")
    fireEvent.submit(mobileVal,{target:{value:7339467879}})
    expect(mobileVal.value).not.toBe(userdata.user.mobile)
    expect(passwordVal.value).toBe('')
    fireEvent.submit(passwordVal,{target:{value:"Indhu@98"}})
    expect(passwordVal.value).not.toBe(userdata.user.password)
})
   
  
  
  test('get snapshot', () => {
      render(
      <MemoryRouter>
      <Login/>
      </MemoryRouter>
      );
    const tree = renderer.create(
    <MemoryRouter>
      <Login/>
    </MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot()
  })  
})

