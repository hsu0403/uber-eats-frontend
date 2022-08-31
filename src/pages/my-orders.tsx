import { gql } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Orders } from "../components/orders";
import { useMe } from "../hooks/useMe";
import { OrderStatus, UserRole } from "../mytypes";

export const GET_ORDERS_QUERY = gql`
  query FrontGetOrders($input: GetOrdersInput!) {
    getOrders(input: $input) {
      totalPages
      totalResults
      ok
      error
      orders {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;
//id, status, total, restaurantName

export const MyOrders = () => {
  const { data } = useMe();

  const [status, setStatus] = useState<OrderStatus>();
  const pendingClick = () => {
    setStatus(OrderStatus.Pending);
  };
  const cookingClick = () => {
    setStatus(OrderStatus.Cooking);
  };
  const cookedClick = () => {
    setStatus(OrderStatus.Cooked);
  };
  const pickedUpClick = () => {
    setStatus(OrderStatus.PickedUp);
  };
  const deliveredClick = () => {
    setStatus(OrderStatus.Delivered);
  };
  return (
    <div>
      <Helmet>
        <title>My Orders | Uber-Eats</title>
      </Helmet>
      <div className="max-w-screen-xl mx-auto">
        <div className="w-full bg-gray-700 rounded-md h-24 flex items-center justify-around">
          {data?.me.role !== UserRole.Delivery && (
            <>
              <div
                onClick={pendingClick}
                className="cursor-pointer py-3 px-5 text-white rounded-xl transition-all duration-500 bg-gradient-to-br from-amber-400 via-slate-600 to-red-400 bg-size-200 hover:bg-right-bottom"
              >
                Pending
              </div>
              <div
                onClick={cookingClick}
                className="cursor-pointer py-3 px-5 text-white rounded-xl transition-all duration-500 bg-gradient-to-br from-amber-400 via-slate-600 to-red-400 bg-size-200 hover:bg-right-bottom"
              >
                Cooking
              </div>
            </>
          )}
          <div
            onClick={cookedClick}
            className="cursor-pointer py-3 px-5 text-white rounded-xl transition-all duration-500 bg-gradient-to-br from-amber-400 via-slate-600 to-red-400 bg-size-200 hover:bg-right-bottom"
          >
            Cooked
          </div>
          <div
            onClick={pickedUpClick}
            className="cursor-pointer py-3 px-5 text-white rounded-xl transition-all duration-500 bg-gradient-to-br from-amber-400 via-slate-600 to-red-400 bg-size-200 hover:bg-right-bottom"
          >
            PickedUp
          </div>
          <div
            onClick={deliveredClick}
            className="cursor-pointer py-3 px-5 text-white rounded-xl transition-all duration-500 bg-gradient-to-br from-amber-400 via-slate-600 to-red-400 bg-size-200 hover:bg-right-bottom"
          >
            Delivered
          </div>
        </div>
        <div className="mt-20 mb-5 mx-auto w-3/5 h-0.5 bg-gray-500"></div>
        <Orders status={status && status} />
      </div>
    </div>
  );
};
