import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import CategoryAdmService from "~/services/administrative/category/category-adm-service";
import ProductAdmService from "~/services/administrative/product/product-adm-service";
import OrderService from "~/services/totem/order/order-service";
import UtilsEnv from "./utils-env";
import PaymentService from "~/services/totem/payment/payment-service";

export default class UtilHooks {

  static clearCategoriesE2E  = async () => {

    const response = await CategoryAdmService.listCategory();
    const categories: [] = response.body;
  
    StepDefinitionUtil.expectToInclude(response?.status, [200, 204]);
  
    categories.forEach(async (category) => {
      const name = category['name'] as string;
      if(name.indexOf('e2e') == 0){
        const responseDelete = await CategoryAdmService.removeCategory(category['id']);
        StepDefinitionUtil.expectTobeNotNull(responseDelete);
        StepDefinitionUtil.expectTobeEqual(responseDelete?.status, 204);
      }
    })
  
  }
  
  static clearProductsE2E = async () => {
  
    const response = await ProductAdmService.listProduct();
    const products: [] = response.body;
  
    StepDefinitionUtil.expectToInclude(response?.status, [200, 204]);
  
    products.forEach(async (product) => {
      const name = product['name'] as string;
      if(name.indexOf('e2e') == 0){
        const responseDelete = await ProductAdmService.removeProduct(product['id']);
        StepDefinitionUtil.expectTobeNotNull(responseDelete);
        StepDefinitionUtil.expectTobeEqual(responseDelete?.status, 204);
      }
    })
  
  }

  static clearOrdersE2E = async () => {
  
    const headers = {
      "Content-Type": "application/json",
      "x-user-identifier": UtilsEnv.getEnv(UtilsEnv.USER_IDENTIFIER)
    } as Record<string, string>;

    const response = await OrderService.listOrderByStatus('status=NEW&status=WAITING_PAYMENT&status=RECEIVED&status=IN_PREPARATION&status=READY&status=FINALIZED&status=CANCELED', headers);
    const orders: [] = response.body;
  
    StepDefinitionUtil.expectToInclude(response?.status, [200, 204]);

    if(orders == undefined || !Array.isArray(orders)) return;
  
    orders.forEach(async (order) => {
      
      if(order['products'] == undefined || !Array.isArray(order['products'])) return;

      const products = order['products'] as [];

      const hasProductE2E = products.some((product: any) => {
        return product != undefined && product.hasOwnProperty('name') && product['name'].indexOf('e2e') == 0
      });

      if(hasProductE2E){
        const responseDelete = await OrderService.removeOrder(order['id']);
        StepDefinitionUtil.expectTobeNotNull(responseDelete);
        StepDefinitionUtil.expectTobeEqual(responseDelete?.status, 204);

        const responseCancelPayment = await PaymentService.cancelPayment(order['id'], headers);
        StepDefinitionUtil.expectTobeNotNull(responseCancelPayment);
        StepDefinitionUtil.expectToInclude(responseCancelPayment?.status, [200, 204]);
      }
    })
  
  }

}