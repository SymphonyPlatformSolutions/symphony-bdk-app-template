export default class MockApiGenerator {
  constructor(config) {
    this.endpoints = config;
  }

  setJwt() {}

  setJwt(jwt) {
    this.jwt = jwt;
  }

  get(endpoint, params) {
    const foundEndpoint = this.endpoints.find((el) => {
      if (el.address === endpoint && el.request.toUpperCase() === 'GET') {
        if (!el.params && !params) {
          return true;
        }
        if (params && el.params) {
          return Object.keys(params).reduce(
            (acc, key) => acc && params[key] === el.params[key],
            true,
          );
        }
      }
      return false;
    });

    if (foundEndpoint) {
      if (foundEndpoint.codes) {
        const thisCode = foundEndpoint.codes.shift();
        const thisValue = foundEndpoint.returnValue.shift();
        if (thisCode === 200) {
          return new Promise(r => r(
            thisValue ? { data: thisValue } : null,
          ));
        }
        return new Promise((r, reject) => reject({
          response: {
            status: thisCode,
            data: thisValue,
          },
        }));
      }
      return new Promise(r => r(
        foundEndpoint.returnValue ? { data: foundEndpoint.returnValue } : null,
      ));
    }
    return new Promise((r, reject) => reject());
  }

  post(endpoint, body) {
    const foundEndpoint = this.endpoints.find(
      el => el.address === endpoint && el.request.toUpperCase() === 'POST',
    );

    if (foundEndpoint) {
      if (foundEndpoint.codes) {
        const thisCode = foundEndpoint.codes.shift();
        const thisValue = foundEndpoint.returnValue.shift();
        if (thisCode === 200) {
          return new Promise(r => r(
            thisValue ? { data: thisValue } : null,
          ));
        }
        return new Promise((r, reject) => reject({
          response: {
            status: thisCode,
            data: thisValue,
          },
        }));
      }
      return new Promise(r => r(
        foundEndpoint.returnValue ? { data: foundEndpoint.returnValue } : null,
      ));
    }
    return new Promise((r, reject) => reject());
  }

  put(endpoint, body) {
    const foundEndpoint = this.endpoints.find(
      el => el.address === endpoint && el.request.toUpperCase() === 'PUT',
    );

    if (foundEndpoint) {
      return new Promise(r => r(
        foundEndpoint.returnValue ? { data: foundEndpoint.returnValue } : null,
      ));
    }

    return new Promise((r, reject) => reject(new Error({
      response: {
        status: this.code,
      },
    })));
  }

  delete(endpoint, body) {
    const foundEndpoint = this.endpoints.find(
      el => el.address === endpoint && el.request.toUpperCase() === 'DELETE',
    );

    if (foundEndpoint) {
      return new Promise(r => r(
        foundEndpoint.returnValue ? { data: foundEndpoint.returnValue } : null,
      ));
    }

    return new Promise((r, reject) => reject(new Error({
      response: {
        status: this.code,
      },
    })));
  }
}
