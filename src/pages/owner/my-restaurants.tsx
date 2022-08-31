import { gql, useQuery } from "@apollo/client";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { FrontMyRestaurants } from "../../mytypes";

export const MY_RESTAURANTS_QUERY = gql`
  query FrontMyRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<FrontMyRestaurants>(MY_RESTAURANTS_QUERY);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Uber-Eats</title>
      </Helmet>
      <div className="container mt-32">
        <div className="relative">
          <Link
            to="/orders"
            className="absolute right-5 py-3 px-12 transition-colors bg-red-500 hover:bg-red-600 rounded-md text-white hover:animate-bounce"
          >
            Go Orders
          </Link>
        </div>
        <span className="flex items-center mb-10">
          <h2 className="text-4xl font-medium">My Restaurants</h2>
          <Link to="/add-restaurant" className="ml-2 mb-2 text-2xl">
            <FontAwesomeIcon
              className="hover:text-red-500 transition-colors"
              icon={faPlusCircle}
            />
          </Link>
        </span>
        {data?.myRestaurants.ok &&
        data?.myRestaurants.restaurants?.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link className="text-red-500 hover:underline" to="/add-restaurant">
              Create One &rarr;
            </Link>
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10 mx-2">
            {data?.myRestaurants.restaurants?.map((restaurnat) => (
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
        )}
      </div>
    </div>
  );
};
