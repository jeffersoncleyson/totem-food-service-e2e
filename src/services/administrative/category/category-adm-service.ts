import request from "supertest";
import HeaderUtils from '~/models/utils/header-utils';
import UtilsEnv from "~/support/utils-env";

export default class CategoryAdmService {

  /**
 * Function to create a category
 * @param {string} name
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createCategory = async (body: object, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/category`)
      .set(requestHeaders)
      .send(body);
  };

  static removeCategory = async (id: string, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .delete(`/${apiVersion}/${administrativePathName}/category/${id}`)
      .set(requestHeaders)
      .send();
  };

  static updateCategory = async (id: string, body: object, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${administrativePathName}/category/${id}`)
      .set(requestHeaders)
      .send(body);
  };

  static listCategory = async (requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .get(`/${apiVersion}/${administrativePathName}/category`)
      .set(requestHeaders)
      .send();
  };

};
