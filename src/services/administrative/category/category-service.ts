import request from "supertest";
require("dotenv").config();
import HeaderUtils from '~/models/utils/header-utils';

const baseURL = process.env.BASE_URL;
const apiVersion = process.env.VERSION_1;
const administrativePathName = process.env.ADMINISTRATIVE_PATH_NAME;

export default class CategoryService {

  /**
 * Function to create a category
 * @param {string} name
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createCategory = async (body: object, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/category`)
      .set(requestHeaders)
      .send(body);
  };

  static removeCategory = async (id: string, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    return request(`${baseURL}`)
      .delete(`/${apiVersion}/${administrativePathName}/category/${id}`)
      .set(requestHeaders)
      .send();
  };

  static updateCategory = async (id: string, body: object, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${administrativePathName}/category/${id}`)
      .set(requestHeaders)
      .send(body);
  };
};
