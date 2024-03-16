import axios, { AxiosRequestConfig } from 'axios';
import BaseError from '../helpers/BaseError';
import { HttpStatusCode } from '../config/constants';

/**
 * Common function to make Axios calls
 * @param {string} url - The URL to make the request to
 * @param {string} method - The HTTP method (e.g., 'get', 'post', 'put', 'delete')
 * @param {object} data - The data to send in the request body (for 'post' and 'put' methods)
 * @param {object} headers - Additional headers for the request
 * @returns {Promise} - A promise that resolves with the response data or rejects with an error
 */

async function makeAxiosCall<T>(
  url: string,
  method: AxiosRequestConfig['method'] = 'get',
  data: any = null,
  headers: AxiosRequestConfig['headers'] = {},
): Promise<T> {
  try {
    console.log(data);
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data as T;
  } catch (error) {
    // Handle the error or rethrow it
    throw new BaseError(
      'internal_server_error',
      HttpStatusCode.INTERNAL_SERVER,
      'axios internal server error',
    );
  }
}

export default makeAxiosCall;
