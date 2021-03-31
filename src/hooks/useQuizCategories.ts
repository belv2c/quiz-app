import { CategoriesType } from "../types"

export type CategoryResponse = CategoriesType[];

export const useQuizCategories = async (): Promise<CategoryResponse> => {
    const response = await fetch(`https://opentdb.com/api_category.php`);
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    const data = await response.json();
  
    return data.trivia_categories.map((category: CategoriesType) => ({
        ...category
    }));
  };