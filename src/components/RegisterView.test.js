import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import RegisterView from './RegisterView'
import StateContext from '../utils/store';

const server = setupServer(
  rest.post(`${process.env.REACT_APP_BACK_END_URL}/users/register`, (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('RegisterView', () => {
  let mockDispatchFunc
  let context;
  beforeEach(() => {
    mockDispatchFunc = jest.fn()
    context = { dispatch: mockDispatchFunc };
    render(<StateContext.Provider value={context}><RegisterView /></StateContext.Provider>)
  })
  test('does load', async () => {
    expect(screen).toBeTruthy()
  })
  test('calls dispatcher after page load', async () => {  
    fireEvent.click(screen.getByTestId('register-btn'))
    expect(mockDispatchFunc).toHaveBeenCalledTimes(1)
    expect(mockDispatchFunc).toHaveBeenCalledWith({ type: "setButtonToggle", data: 'signup' })
  })
})