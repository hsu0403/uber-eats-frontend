import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  FrontRestaurantsPageQuery,
  FrontRestaurantsPageQueryVariables,
} from "../../mytypes";

const RESTAURANTS_QUERY = gql`
  query FrontRestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    findRestaurants(input: $input) {
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
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    FrontRestaurantsPageQuery,
    FrontRestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const navigate = useNavigate();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    navigate({ pathname: "/search", search: `?term=${searchTerm}` });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Uber-Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register("searchTerm", { required: true })}
          type="search"
          className="w-5/12 py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          placeholder="Search Restaurant.."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-5">
          <div className="flex justify-around max-w-xs mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className="items-center flex flex-col cursor-pointer group">
                  <div className="group-hover:bg-gray-100 w-16 h-16 rounded-full bg-[url('https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Asian_CuisineCarousel@2x.png')] bg-no-repeat bg-cover" />
                  <span className="mt-1 text-sm text-center font-semibold">
                    {category.slug}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10 mx-2">
            {data?.findRestaurants.restaurants?.map((restaurnat) => (
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
          <div className="grid grid-cols-3 text-center max-w-md mt-10 items-center mx-auto">
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
              Page {page} of {data?.findRestaurants.totalPages}
            </span>
            {page !== data?.findRestaurants.totalPages ? (
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
