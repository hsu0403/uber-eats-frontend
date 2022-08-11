import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  FrontSearchRestaurant,
  FrontSearchRestaurantVariables,
} from "../../mytypes";

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
  const [queryReadyToStart, { loading, data }] = useLazyQuery<
    FrontSearchRestaurant,
    FrontSearchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      navigate("/", { replace: true });
    }
    queryReadyToStart({
      variables: {
        input: {
          query,
          page: 1,
        },
      },
    });
  }, [navigate, location, queryReadyToStart]);
  console.log(data);
  return (
    <h1>
      <Helmet>
        <title>Search | Uber-Eats</title>
      </Helmet>
      Search Page
    </h1>
  );
};
