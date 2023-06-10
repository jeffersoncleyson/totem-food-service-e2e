import request from "supertest";
require("dotenv").config();
import HeaderUtils from '~/models/utils/header-utils';

const baseURL = process.env.BASE_URL;
const administrativePathName = process.env.ADMINISTRATIVE_PATH_NAME;

export default class CategoryService {

  /**
 * Function to create a category
 * @param {string} name
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createCategory = async (name: string, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    return request(`${baseURL}`)
      .post(`/${administrativePathName}/category`)
      .set(requestHeaders)
      .send({ name });
  };
};
