import axios from 'axios';
export default {
  addAuthor: async function post(token, name, base_url = process.env.base_url) {
    console.log('name ---- ', name)

    try {
      const url = `${base_url}/api/v1/authors`;
      const options = {
        headers: {
          authorization: token
        }
      };
      const results = await axios.post(url,
       {
         name: name,
       },
        options
      );
      console.log('🔥', results)

      if (results && results.status == 200 && results.data.success == true) {
        return {
          status: 'success',
          data: results.data
        }
      }

    } catch (error) {
      console.log('🔥🍑', error)
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }
  },
}
