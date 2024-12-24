import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      }
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },

    convertingCurrency(state) {
      state.isLoading = true;
    }
  }
});

// console.log(accountSlice);

export const { _deposit, withdraw, requestLoan, payLoan } = accountSlice.actions; // delete deposit

export function deposit(amount, currency) {
  if (currency !== 'USD')
    return async function (dispatch) {
      dispatch({ type: 'account/convertingCurrency' });

      const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`);

      const data = await res.json();

      const convertedAmount = +(amount * data.rates.USD).toFixed(2);

      dispatch({ type: 'account/deposit', payload: convertedAmount });
    };

  return { type: 'account/deposit', payload: amount };
}

// console.log(requestLoan(500, 'house'));
export default accountSlice.reducer;
