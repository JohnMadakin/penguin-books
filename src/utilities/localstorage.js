const localStorageAPI = {
  save: function(payload) {
    var self = this;
    if (payload != null && typeof payload == 'object' && !Array.isArray(payload)){
      Object.keys(payload).map(key => {
          let value;
          if (typeof payload[key] != 'string') {
            value = JSON.stringify(payload[key]);
          } else {
            value = payload[key];
          }
          setTimeout(self.store(key, value), 100);
      });
    }
  },

  store: function (key, value) {
    window.localStorage.setItem(key, value);
  },

  fetch: function(key) {
    return setTimeout(this.get(key), 100);
  },

  get: function(key) {
    window.localStorage.getItem(key)
  },

  remove: function (key) {
    return setTimeout(this.delete(key), 100);
  },

  delete: function (key) {
    window.localStorage.removeItem(key)
  }
}

export default localStorageAPI;
