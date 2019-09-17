import Api from '..';
import axios from 'axios';

jest.mock('axios');
jest.mock('utils/system/setup-url', () => ({ setupURL: jest.fn() }));

const BASE_URL = 'http://www.baseurl.com';
const ENDPOINT = 'v1/users';
const FULL_URL = `${BASE_URL}/${ENDPOINT}`;

beforeEach(() => {
  Api.jwt = null;
  Api.headers = null;
  Api.baseUrl = BASE_URL;
});

describe('Api service', () => {
  it('Should handle "convertToAxiosParams" when exist params', () => {
    const axiosParams = Api.convertToAxiosParams({ id: 1 });
    expect(axiosParams).toEqual({ id: 1 });
  });

  it('Should handle "convertToAxiosParams" when exist params with array', () => {
    const axiosParams = Api.convertToAxiosParams({ list: ['a', 'b'] });
    expect(axiosParams).toEqual({ list: 'a,b' });
  });

  it('Should handle "convertToAxiosParams" when does not exist params', () => {
    const axiosParams = Api.convertToAxiosParams(null);
    expect(axiosParams).toEqual(null);
  });

  it('Should handle "makeUrl" when use base url', () => {
    const url = Api.makeUrl(ENDPOINT, true);
    expect(url).toEqual(FULL_URL);
  });

  it('Should handle "makeUrl" when do not use base url', () => {
    const url = Api.makeUrl('fullPath', false);
    expect(url).toEqual('fullPath');
  });

  it('Should handle "makeApiAttributes"', () => {
    const attributes = Api.makeApiAttributes(null);
    expect(attributes).toEqual({
      headers: null,
      params: null,
    });
  });


  it('Should handle "setCustomHeaders"', () => {
    Api.setCustomHeaders({ key: 'value' });
    expect(Api.headers).toEqual({ key: 'value' });
  });

  it('Should handle "get"', () => {
    Api.get(ENDPOINT);
    expect(axios.get).toHaveBeenCalledWith(FULL_URL, { headers: null, params: null });
  });

  it('Should handle "post"', () => {
    Api.post(ENDPOINT);
    expect(axios.post).toHaveBeenCalledWith(FULL_URL, null, { headers: null, params: null });
  });

  it('Should handle "put"', () => {
    Api.put(ENDPOINT);
    expect(axios.put).toHaveBeenCalledWith(FULL_URL, null, { headers: null, params: null });
  });

  it('Should handle "delete"', () => {
    Api.delete(ENDPOINT);
    expect(axios.delete).toHaveBeenCalledWith(FULL_URL, { headers: null, params: null });
  });
});
