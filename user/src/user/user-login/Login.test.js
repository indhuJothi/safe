import { act, findByPlaceholderText, fireEvent,render, screen } from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import renderer from 'react-test-renderer';
import Login from './Login';
import AxiosMock from 'axios'
import {server} from './mocks/server'

beforeAll(()=> server.listen({
  onUnhandledRequest:'error'
}))

afterEach(()=>server.resetHandlers())

afterAll(()=> server.close())






describe('login',()=>{
  test('check user', async()=>{
    const {findAllByTestId} = render(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>
    )
      expect(await findByPlaceholderText('MobileNo')).toBeInTheDocument()
  })

})

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


test('testing fire events', () => {
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

  const tree = renderer.create(<MemoryRouter><Login/></MemoryRouter>).toJSON();
  expect(tree).toMatchSnapshot()
  console.log(tree);
})



test('login with mock data', async ()=>{


  const wrapper =    render(
  <MemoryRouter>
    <Login/>
    </MemoryRouter>

  )

  await wrapper.findAllByTestId('test-login');
  const result = wrapper.getByTestId('submit')

  result.act(()=>{
    result.fireEvent.click()

  })

  


})