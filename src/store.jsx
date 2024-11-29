import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdrawal':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

/* store.dispatch({ type: 'account/deposit', payload: 500 });
console.log('current state', store.getState());

store.dispatch({ type: 'account/withdrawal', payload: 200 });
console.log('current state', store.getState());

store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: 'buy a house' } });
console.log('current state', store.getState());

store.dispatch({ type: 'account/payLoan' });
console.log('current state', store.getState()); */

// Action creators
function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
  return { type: 'account/withdrawal', payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

function payLoan() {
  return { type: 'account/payLoan' };
}

store.dispatch(deposit(700));
console.log(store.getState());

store.dispatch(withdraw(400));
console.log(store.getState());

store.dispatch(requestLoan(50000, 'start a business'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
