import axios from 'axios';
import localStorageAPI from '../utilities/localstorage';
import decodeToken from '../utilities/decodeJWT';
export default {
  loginService: async function login(email, password, base_url) {
    try {
      const url = `${base_url}/api/v1/login`;
      const results = await axios.post(url, {
        email: email,
        password: password,
      });
      if (results.data && results.status == 200 && results.data.token) {
        return { status: 'success', token: results.data.token }
      }

    } catch (error) {
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }
  },

  CheckAuthenticationStatus: function(){
    const token = localStorage.getItem('penguinAppToken');
    const decodedToken = decodeToken(token);

    if(!decodedToken){
      return { isAuthenticated: false, tokenTimedOut: false };
    }
    if (decodedToken.exp < new Date().getTime() / 1000) {
      return { isAuthenticated: false, tokenTimedOut: true };
    } 
    return { isAuthenticated: true, tokenTimedOut: false }
  }

}
