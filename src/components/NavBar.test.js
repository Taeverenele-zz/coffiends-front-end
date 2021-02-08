// __tests__/fetch.test.js
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import NavBar from './NavBar'
import StateContext from '../utils/store';

const server = setupServer()

server.use(
  // This is not being hit by logout handler
  rest.get(`${process.env.REACT_APP_BACK_END_URL}/users/logout`, (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('NavBar', () => {
  let mockDispatchFunc
  let context;
  beforeEach(() => {
    mockDispatchFunc = jest.fn()
    context = { store: { loggedInUser: true }, dispatch: mockDispatchFunc };
    render(<StateContext.Provider value={context}><Router><NavBar /></Router></StateContext.Provider>)
  })
  
  test('does load', async () => {
    expect(screen).toBeTruthy()
  })
  
  test('calls dispatcher after log out', async () => {  
    fireEvent.click(screen.getByText('LOG OUT'))
    expect(mockDispatchFunc).toHaveBeenCalledTimes(1)
    expect(mockDispatchFunc).toHaveBeenCalledWith({ type: "setButtonToggle", data: "login" })
  })
})
