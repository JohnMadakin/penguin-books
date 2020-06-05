import axios from 'axios';
export default {
  addAuthor: async function post(token, name, base_url = process.env.base_url) {

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

      if (results && results.status == 201 && results.data.success == true) {
        return {
          status: 'success',
          data: results.data.data
        }
      }

    } catch (error) {
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }
  },
  getAllAuthors: async function getAll(token, url, source){
    try {

      const results = await axios.get(url, {
        headers: {
          authorization: token
        },
        cancelToken: source.token
      });

      if (results && results.status == 200 && results.data.success == true) {
        return {
          status: 'success',
          authors: results.data.authors,
        }
      }

    } catch (error) {
      if (axios.isCancel(error)) {
        // console.log("cancelled");
      } else {
        return { status: 'error', errorPayload: error.response ? error.response.data : null };
      }
    }

  },
}
