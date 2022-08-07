import { gql, useQuery } from "@apollo/client";
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
        id
        name
        iconImg
        slug
        restaurantCount
      }
    }
    findRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        address
        isPromoted
        category {
          name
        }
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<
    FrontRestaurantsPageQuery,
    FrontRestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="search"
          className="w-5/12 py-3 px-5 rounded-md shadow-sm focus:outline-none border-2 focus:border-red-400 focus:border-opacity-70 transition-colors"
          placeholder="Search Restaurant.."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-5">
          <div className="flex justify-around max-w-xs mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="items-center flex flex-col cursor-pointer group">
                <div className="group-hover:bg-gray-100 w-16 h-16 rounded-full bg-[url('https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Asian_CuisineCarousel@2x.png')] bg-no-repeat bg-cover" />
                <span className="mt-1 text-sm text-center font-semibold">
                  {category.slug}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-7 mt-10">
            {data?.findRestaurants.restaurants?.map((restaurnat) => (
              <div>
                <div className="py-24 bg-[url('https://i.ibb.co/3zpFcJZ/pizza.jpg')] bg-cover bg-no-repeat bg-center mb-2"></div>
                <h3 className="text-xl font-medium">{restaurnat.name}</h3>
                <h5 className="text-xs font-light mb-5">
                  {restaurnat.address}
                </h5>
                <span className="border-t-2 border-gray-300 text-sm">
                  {restaurnat.category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};
