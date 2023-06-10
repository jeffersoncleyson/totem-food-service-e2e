export class CategoryModels {


  /**
 * Function to create a category
 * @param {string} name
 * @returns {object} json categoryCreateDto
 */
  static categoryCreateDto = (name: string): object => {
    return {
      name: name,
    };
  };
};