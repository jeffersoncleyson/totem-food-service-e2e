import request from "supertest";
import HeaderUtils from "~/models/utils/header-utils";
require("dotenv").config();

const baseURL = process.env.BASE_URL;
const apiVersion = process.env.VERSION_1;
const administrativePathName = process.env.ADMINISTRATIVE_PATH_NAME;

export default class ComboService {
  /**
   * Function to create a combo
   * @param {string} name
   * @param {number} price
   * @param {Array} products
   * @param {object} requestHeaders
   * @returns 201 OK
   */
  static createCombo = async (
    body: object,
    requestHeaders: object = HeaderUtils.defaultHeader()
  ) => {
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/combo`)
      .set(requestHeaders)
      .send(body);
  };
}
