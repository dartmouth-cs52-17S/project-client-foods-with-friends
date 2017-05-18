import axios from 'axios';

const ROOT_URL = 'https://munchees.herokuapp.com/api/signup';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};


export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signupUser({ fullname, email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}`, { fullname, email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      dispatch(authError(`Signup Failed: ${error.response.data}`));
    });
  };
}
