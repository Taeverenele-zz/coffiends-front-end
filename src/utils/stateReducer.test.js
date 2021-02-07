import stateReducer from './stateReducer';

describe('stateReducer', () => {
  it(`should update flashMessage prop, when action type is 'setFlashMessage'`, () => {
    const action = { type: "setFlashMessage", data: 'Flash message' }
    const res = stateReducer({}, action);
    expect(res).toEqual({ flashMessage: action.data })
  })
})