import request from "supertest";
require("dotenv").config();
import HeaderUtils from '~/models/utils/header-utils';

const baseURL = process.env.BASE_URL;
const apiVersion = process.env.VERSION_1;
const totemPathName = process.env.TOTEM_PATH_NAME;

export default class CustomerService {

  /**
 * Function to create a customer account
 * @param {object} body
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createCustomer = async (body: object, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${totemPathName}/customer`)
      .set(requestHeaders)
      .send(body);
  };
};
