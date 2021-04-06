import { useQuery } from "react-query"
import { CategoriesType } from "../types"
export type CategoryResponse = CategoriesType[];

const getQuizCategories = async (): Promise<CategoryResponse> => {
  const response = await fetch(`https://opentdb.com/api_category.php`)
  if (!response.ok) {
    throw new Error("Problem fetching categories data")
  }
  const result = await response.json();

  return result.trivia_categories.map((category: CategoriesType[]) => ({
    ...category
  }));
}

export function useQuizCategories() {
  return useQuery("categories", getQuizCategories, { refetchOnMount: false })
}
