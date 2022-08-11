import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { FrontFindCategory, FrontFindCategoryVariables } from "../../mytypes";

const FIND_CATEGORY = gql`
  query FrontFindCategory($input: CategoryInput!) {
    findCategory(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

type IParams = {
  slug: string;
};

export const Category = () => {
  const { slug } = useParams<IParams>();
  const { data, loading } = useQuery<
    FrontFindCategory,
    FrontFindCategoryVariables
  >(FIND_CATEGORY, {
    variables: {
      input: {
        slug: slug!,
        page: 1,
      },
    },
  });
  console.log(data);
  return <h1>Category</h1>;
};
