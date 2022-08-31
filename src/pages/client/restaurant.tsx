import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DishOption } from "../../components/dish-option";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  CreateOrderItemInput,
  DestinationInputType,
  FrontCreateOrder,
  FrontCreateOrderVariables,
  FrontRestaurant,
  FrontRestaurantVariables,
} from "../../mytypes";

const RESTAURANT_QUERY = gql`
  query FrontRestaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation FrontCreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

type IParams = {
  id: string;
};

export const Restaurant = () => {
  const [coords, setCoords] = useState<DestinationInputType>({
    lat: 0,
    lng: 0,
  });
  const { data: userData } = useMe();
  const navigate = useNavigate();
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

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    });
  }, []);

  const onCompleted = (data: FrontCreateOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      navigate(`/orders/${orderId}`, { replace: true });
    }
  };
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    FrontCreateOrder,
    FrontCreateOrderVariables
  >(CREATE_ORDER_MUTATION, { onCompleted });
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) =>
    orderItems.find((order) => order.dishId === dishId);
  const isSelected = (dishId: number) => Boolean(getItem(dishId));
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((prev) => [{ dishId, options: [] }, ...prev]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((prev) => prev.filter((dish) => dish.dishId !== dishId));
  };
  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name === optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((prev) => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...prev,
        ]);
      }
    }
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((prev) => [
        {
          dishId,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...prev,
      ]);
      return;
    }
  };
  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) =>
    item.options?.find((option) => option.name === optionName);
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };

  const isChoiceSelected = (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(
        item.options?.find(
          (option) => option.name === optionName && option.choice === choiceName
        )
      );
    }
    return false;
  };

  const addChoiceFromItem = (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => {
    if (!isOptionSelected(dishId, optionName)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      const options = oldItem.options?.filter(
        (option) => option.name !== optionName
      );
      options?.push({ name: optionName, choice: choiceName });
      setOrderItems((prev) => [
        {
          dishId,
          options,
        },
        ...prev,
      ]);
    }
  };
  const removeChoiceFromItem = (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => {
    if (!isOptionSelected(dishId, optionName)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      if (isChoiceSelected(dishId, optionName, choiceName)) {
        removeFromOrder(dishId);
        const options = oldItem.options?.filter(
          (option) => option.name !== optionName
        );
        options?.push({ name: optionName });
        setOrderItems((prev) => [
          {
            dishId,
            options,
          },
          ...prev,
        ]);
      }
    }
  };

  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };

  const triggerConfirmOrder = () => {
    if (placingOrder) {
      return;
    }
    if (orderItems.length === 0) {
      alert("Can't place empty order!");
      return;
    }
    const ok = window.confirm(`You are about to place an order?`);
    if (ok) {
      createOrderMutation({
        variables: {
          input: { restaurantId: +id!, items: orderItems, destination: coords },
        },
      });
    }
  };
  console.log(orderItems);
  return (
    <div className="relative max-w-screen-xl mx-auto px-5 2xl:px-0">
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""} | Uber-Eats</title>
      </Helmet>
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
      {!orderStarted && (
        <div className="flex items-center justify-end">
          <button
            onClick={
              userData?.me.emailVerified
                ? triggerStartOrder
                : () => {
                    alert("Please, Email Verify!!");
                  }
            }
            className="w-1/4 bg-red-500 hover:bg-red-600 rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors mt-5"
          >
            Start Order
          </button>
        </div>
      )}
      {orderStarted && (
        <div className="flex items-center justify-end">
          <button
            onClick={triggerConfirmOrder}
            className="w-1/4 bg-red-500 hover:bg-red-600 rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors mt-5 mr-2"
          >
            Confirm Order
          </button>
          <button
            onClick={triggerCancelOrder}
            className="w-1/4 bg-yellow-500 hover:bg-yellow-600 rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors mt-5"
          >
            Cancel Order
          </button>
        </div>
      )}
      <hr className="mt-6 w-full h-0.5 bg-gray-300" />
      <div className="grid mt-10 md:grid-cols-3 gap-x-5 gap-y-10">
        {data?.restaurant.restaurant?.menu?.map((dish, index) => (
          <Dish
            key={index}
            id={dish.id}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            photo={dish?.photo ? dish.photo : ""}
            isCustomer={true}
            options={dish.options}
            orderStarted={orderStarted}
            addItemToOrder={addItemToOrder}
            isSelected={isSelected(dish.id)}
            removeFromOrder={removeFromOrder}
          >
            {dish.options?.map((option, index) => (
              <DishOption
                key={index}
                extra={option.extra!}
                name={option.name}
                choices={option.choices}
                isOptionSelected={isOptionSelected(dish.id, option.name)}
                isSelected={isSelected(dish.id)}
                addOptionToItem={addOptionToItem}
                removeOptionFromItem={removeOptionFromItem}
                dishId={dish.id}
                addChoiceFromItem={addChoiceFromItem}
                isChoiceSelected={isChoiceSelected}
                removeChoiceFromItem={removeChoiceFromItem}
              />
            ))}
          </Dish>
        ))}
      </div>
    </div>
  );
};
