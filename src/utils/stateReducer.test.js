import stateReducer from './stateReducer';

describe('stateReducer', () => {
  it(`should update flashMessage prop, when action type is 'setFlashMessage'`, () => {
    const action = { type: "setFlashMessage", data: 'Flash message' }
    const res = stateReducer({}, action);
    expect(res).toEqual({ flashMessage: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update loggedInUser prop, when action type is 'setLoggedInUser'`, () => {
    const action = { type: "setLoggedInUser", data: {} }
    const res = stateReducer({}, action);
    expect(res).toEqual({ loggedInUser: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update allCafes prop, when action type is 'getAllCafes'`, () => {
    const action = { type: "getAllCafes", data: [] }
    const res = stateReducer({}, action);
    expect(res).toEqual({ allCafes: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update allCoffees prop, when action type is 'getAllCoffees'`, () => {
    const action = { type: "getAllCoffees", data: [] }
    const res = stateReducer({}, action);
    expect(res).toEqual({ allCoffees: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update userCoffee prop, when action type is 'setUserCoffee'`, () => {
    const action = { type: "setUserCoffee", data: {_id: "", name: "", price:""} }
    const res = stateReducer({}, action);
    expect(res).toEqual({ userCoffee: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update orderCafe prop, when action type is 'setOrderCafe'`, () => {
    const action = { type: "setOrderCafe", data: "" }
    const res = stateReducer({}, action);
    expect(res).toEqual({ orderCafe: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update cafeData prop, when action type is 'setCafeData'`, () => {
    const action = { type: "setCafeData", data: null }
    const res = stateReducer({}, action);
    expect(res).toEqual({ cafeData: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update coffeeData prop, when action type is 'setCoffeeData'`, () => {
    const action = { type: "setCoffeeData", data: null }
    const res = stateReducer({}, action);
    expect(res).toEqual({ coffeeData: action.data })
  })
})
describe('stateReducer', () => {
  it(`should update buttonToggle prop, when action type is 'setButtonToggle'`, () => {
    const action = { type: "setButtonToggle", data: "" }
    const res = stateReducer({}, action);
    expect(res).toEqual({ buttonToggle: action.data })
  })
})
