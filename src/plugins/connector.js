/**
 * (C) 2013 Hot-World GmbH & Co. KG
 * Knickelsdorf 42, 47877 Willich, germany
 * User: littwin
 * Date: 03.03.17
 * Time: 11:16
 */

// import Vue from 'vue'
import Axios from 'axios';
import Vue from 'vue';

let instance = null; // make it a singleton

class Connector {
  constructor (baseUrl = 'https://api.husky-dev.de/api') {
    if (!instance) {
      instance = this;
      this.token = undefined;
      this.baseUrl = baseUrl;
    }
    Vue.prototype.$con = instance;
    return instance;
  }

  install (Vue) {
    /* Vue.mixin({
        created: function () {
        this.$com = instance
        Vue.com = instance
      }
    }) */
    //Vue.prototype.$com = instance;
  }

  jsonRequestCsrf() {
    Axios.defaults.withCredentials = true;
    return new Promise((resolve, reject) => {
      Axios.get(`${this.baseUrl}/sanctum/csrf-cookie`).then(res => {
        resolve();
      });
    });
  }

  jsonRequestHTML (call, data) {
    return new Promise((resolve, reject) => {
      Axios.post(`${this.baseUrl}/api/${call}`, data, {withCredentials: true}).then(msg => {
        try {
          resolve(msg.data);
        } catch (err) {
          console.log('Request did not return json, got this instead:', err);
        }
      }, msg => {
        console.log('err', msg);
        switch (msg.status) {
          case 401:
            reject(new Error('401:Authorization required'));
            break;
          case 404:
            reject(new Error('404:File not found'));
            break;
          case 501:
            reject(new Error('501:Internal server error'));
            break;
          default:
            reject(new Error(msg.status + ':Unknown error'));
            break;
        }
      });
    });
  }

  async jsonRequest (call, data) {
    if(!document.cookie.includes('XSRF-TOKEN')) {
      await this.jsonRequestCsrf().then(res => {
        console.log(res);
      });
    }
    /*if (this.forceREST || this.wsDefect || this.socketUrl.length === 0) {
      return this.jsonRequestHTML(call, data);
    }*/
    return new Promise((resolve, reject) => {
      this.jsonRequestHTML(call, data).then((data) => resolve(data), (error) => reject(error));
    });
  }
}

const debug = process.env.NODE_ENV !== 'production';
if (debug) {
  //Vue.use(new AdmediaConnector('https://api-prod-test.ad-media.de', ''));
  Vue.use(new Connector('http://api.husky-scheff.de'));
} else {
  Vue.use(new Connector('https://api.husky-dev.de'));
  //Vue.use(new AdmediaConnector('https://api.ad-media.de', 'wss://api.ad-media.de/socket'));
}
