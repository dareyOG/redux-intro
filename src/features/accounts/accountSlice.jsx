const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload, isLoading: false };

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

    case 'account/convertingCurrency':
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency !== 'USD')
    return async function (dispatch) {
      dispatch({ type: 'account/convertingCurrency' });

      const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`);
      // const res = await fetch(
      //   `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
      // );
      const data = await res.json();
      // console.log(data);
      // const convertedAmount = data.rates.USD;
      const convertedAmount = Number((amount * data.rates.USD).toFixed(2));
      // console.log(convertedAmount);

      dispatch({ type: 'account/deposit', payload: convertedAmount });
    };

  return { type: 'account/deposit', payload: amount };
}

export function withdraw(amount) {
  return { type: 'account/withdrawal', payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

export function payLoan() {
  return { type: 'account/payLoan' };
}
