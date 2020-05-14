import axios from 'axios';
import localStorageAPI from '../utilities/localstorage';
import decodeToken from '../utilities/decodeJWT';
export default {
  getAllUsers: async function getUsers(token, base_url) {
    try {
      const url = `${base_url}/api/v1/users`;
      const results = await axios.get(url, {
        headers:{
          authorization: token
        }
      });

      if (results && results.status == 200 && results.data.success == true) {
        return { 
          status: 'success',
          users: results.data.users.data,
          nextPage: results.data.users.next_page_url,
          previous: results.data.users.last_page_url,
          nextpageCount: results.data.users.last_page
        }
      }

    } catch (error) {
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }
  },
}
