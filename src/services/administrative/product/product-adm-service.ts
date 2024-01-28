import request from "supertest";
import HeaderUtils from '~/models/utils/header-utils';
import UtilsEnv from "~/support/utils-env";

export default class ProductAdmService {

  /**
 * Function to create a product
 * @param {string} name
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createProduct = async (body: object, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/product`)
      .set(requestHeaders)
      .send(body);
  };

  static removeProduct = async (id: string, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .delete(`/${apiVersion}/${administrativePathName}/product/${id}`)
      .set(requestHeaders)
      .send();
  };

  static updateProduct = async (id: string, body: object, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${administrativePathName}/product/${id}`)
      .set(requestHeaders)
      .send(body);
  };

  static listProduct = async (requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .get(`/${apiVersion}/${administrativePathName}/product`)
      .set(requestHeaders)
      .send();
  };
};
