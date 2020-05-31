import axios from 'axios';
export default {
  getAllItems: async function getItems(token, base_url) {
    try {
      const url = `${base_url}/api/v1/items`;
      const results = await axios.get(url, {
        headers: {
          authorization: token
        }
      });

      if (results && results.status == 200 && results.data.success == true) {
        return {
          status: 'success',
          items: results.data.items.data,
          nextPage: results.data.items.next_page_url,
          previous: results.data.items.last_page_url,
          nextpageCount: results.data.items.last_page,
          totalItems: results.data.items.total
        }
      }

    } catch (error) {
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }
  },

  postItem: async function postItem(payload, token, base_url){
    try {
      const url = `${base_url}/api/v1/items`;
      const options = {
        headers: {
          authorization: token
        }
      };
      const results = await axios.post(url,
        payload,
        options
      );

      if (results && results.status == 201 && results.data.success == true) {
        return {
          status: 'success',
          data: results.data.data
        }
      }

    } catch (error) {
      console.log({error})
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }

  },

   editItem: async function edit(payload, token, base_url) {
    try {
      const url = `${base_url}/api/v1/items/${payload.itemId}`;
      const options = {
        headers: {
          authorization: token
        }
      };
      const results = await axios.put(url,
        payload,
        options
      );


      if (results && results.status == 200 && results.data.success == true) {
        return {
          status: 'success',
          data: results.data.data
        }
      }

    } catch (error) {
      console.log({ error })
      return { status: 'error', errorPayload: error.response ? error.response.data : null };
    }

  }
}
