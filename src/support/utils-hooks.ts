import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import CategoryAdmService from "~/services/administrative/category/category-adm-service";
import ProductAdmService from "~/services/administrative/product/product-adm-service";

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

}