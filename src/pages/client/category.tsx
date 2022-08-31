import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
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
  const [page, setPage] = useState(1);
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
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>{`Category '${slug}' | Uber-Eats`}</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-20">
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10 mx-2">
            {data?.findCategory.restaurants?.map((restaurnat) => (
              <Restaurant
                key={restaurnat.id}
                address={restaurnat.address}
                coverImg={restaurnat.coverImg}
                restaurantName={restaurnat.name}
                categoryName={restaurnat.category?.name}
                id={restaurnat.id + ""}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md mt-20 items-center mx-auto">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="font-medium text-2xl focus:outline-none"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              Page {page} of {data?.findCategory.totalPages}
            </span>
            {page !== data?.findCategory.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="font-medium text-2xl focus:outline-none"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
