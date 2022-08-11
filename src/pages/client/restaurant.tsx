import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { FrontRestaurant, FrontRestaurantVariables } from "../../mytypes";

const RESTAURANT_QUERY = gql`
  query FrontRestaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

type IParams = {
  id: string;
};

export const Restaurant = () => {
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<FrontRestaurant, FrontRestaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id!,
        },
      },
    }
  );
  console.log(data);
  return (
    <div className="relative max-w-screen-xl mx-auto px-5 2xl:px-0">
      <div className="bg-gray-800 bg-cover bg-no-repeat bg-center py-48 bg-[url('https://i.ibb.co/3zpFcJZ/pizza.jpg')]"></div>
      <div className="bg-white md:w-2/5 w-1/2 pl-40 py-4 absolute top-52 rounded-r-lg">
        <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
        <h5 className="text-sm font-light mb-2">
          {data?.restaurant.restaurant?.category?.name}
        </h5>
        <h6 className="text-sm font-light">
          {data?.restaurant.restaurant?.address}
        </h6>
      </div>
    </div>
  );
};
