import request from "supertest";
import HeaderUtils from "~/models/utils/header-utils";
require("dotenv").config();

const baseURL = process.env.BASE_URL;
const apiVersion = process.env.VERSION_1;
const administrativePathName = process.env.ADMINISTRATIVE_PATH_NAME;

export default class ProductService {
  /**
   * Function to create a Product
   * @param {string} name
   * @param {string} description
   * @param {number} price
   * @param {string} image
   * @param {string} category
   * @param {object} requestHeaders
   * @returns 201 OK
   */
  static createProduct = async (
    body: object,
    requestHeaders: object = HeaderUtils.defaultHeader()
  ) => {
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/product`)
      .set(requestHeaders)
      .send(body);
  };

  static removeProduct = async (
    id: string,
    requestHeaders: object = HeaderUtils.defaultHeader()
  ) => {
    return request(`${baseURL}`)
      .delete(`/${apiVersion}/${administrativePathName}/product/${id}`)
      .set(requestHeaders)
      .send();
  };

  static updateProduct = async (
    id: string,
    body: object,
    requestHeaders: object = HeaderUtils.defaultHeader()
  ) => {
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${administrativePathName}/product/${id}`)
      .set(requestHeaders)
      .send(body);
  };
}
