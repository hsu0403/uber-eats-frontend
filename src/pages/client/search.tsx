import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  FrontSearchRestaurant,
  FrontSearchRestaurantVariables,
} from "../../mytypes";
import { Restaurant } from "../../components/restaurant";

const SEARCH_RESTAURANT = gql`
  query FrontSearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [queryReadyToStart, { loading, data }] = useLazyQuery<
    FrontSearchRestaurant,
    FrontSearchRestaurantVariables
  >(SEARCH_RESTAURANT);
  const [_, query] = location.search.split("?term=");
  useEffect(() => {
    if (!query) {
      navigate("/", { replace: true });
    }
    queryReadyToStart({
      variables: {
        input: {
          query,
          page,
        },
      },
    });
  }, [navigate, location, queryReadyToStart, page, query]);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>{`Search '${query}' | Uber-Eats`}</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-20">
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10 mx-2">
            {data?.searchRestaurant.restaurants?.map((restaurnat) => (
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
              Page {page} of {data?.searchRestaurant.totalPages}
            </span>
            {page !== data?.searchRestaurant.totalPages ? (
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
