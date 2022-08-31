import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FULL_ORDER_FRAGMENT } from "../fragments";
import { useMe } from "../hooks/useMe";
import {
  FrontEditOrder,
  FrontEditOrderVariables,
  FrontGetOrder,
  FrontGetOrderVariables,
  FrontOrderUpdates,
  OrderStatus,
  UserRole,
} from "../mytypes";
import { GET_ORDERS_QUERY } from "./my-orders";

const GET_ORDER_QUERY = gql`
  query FrontGetOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription FrontOrderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const EDIT_ORDER = gql`
  mutation FrontEditOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

type IParams = {
  id: string;
};

export const Order = () => {
  const { id } = useParams<IParams>();
  const { data: userData } = useMe();
  const [editOrderMutation, { loading }] = useMutation<
    FrontEditOrder,
    FrontEditOrderVariables
  >(EDIT_ORDER);
  const { data, subscribeToMore } = useQuery<
    FrontGetOrder,
    FrontGetOrderVariables
  >(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: +id!,
      },
    },
  });
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +id!,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: FrontOrderUpdates } }
        ) => {
          if (!data) {
            return prev;
          }
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data, id, subscribeToMore]);

  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: { input: { id: +id!, status: newStatus } },
    });
  };
  return (
    <div className="mt-32 container flex justify-center">
      <Helmet>
        <title>Order #{id} | Uber-Eats</title>
      </Helmet>
      <div className="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-1 py-2 px-4">
          {data?.getOrder.order?.items.map((item, index) => (
            <span key={index} className="flex flex-col items-start">
              <span className="flex">
                <h4 className="font-semibold flex">Dish:</h4>
                <h5 className="font-light ml-2">{item.dish?.name}</h5>
              </span>
              {item.options?.map((option, ondex) => (
                <div key={ondex}>
                  <hr className="h-0.5 w-full bg-gray-500 opacity-50" />
                  <span className="flex flex-col items-start">
                    <span className="flex">
                      <h5 className="ml-4 font-medium">Option:</h5>
                      <h6 className="font-light ml-2">{option.name}</h6>
                    </span>
                    {option.choice && (
                      <span className="flex">
                        <h5 className="ml-8 font-medium">Choice:</h5>
                        <h6 className="font-light ml-2">{option.choice}</h6>
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </span>
          ))}
        </div>

        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center">
          Total: {data?.getOrder.order?.total} &#8361;
        </h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700 font-semibold">
            Prepared By:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700 font-semibold">
            Ordered By:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700 font-semibold">
            Driver:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || "Not yet."}
            </span>
          </div>
        </div>
        {userData?.me.role === UserRole.Client && (
          <span className="text-center mt-5 mb-3 text-2xl animate-color-change">
            Status: {data?.getOrder.order?.status}
          </span>
        )}
        {userData?.me.role === UserRole.Owner && (
          <>
            {data?.getOrder.order?.status === OrderStatus.Pending && (
              <button
                onClick={() => onButtonClick(OrderStatus.Cooking)}
                className="mb-2 w-1/2 mx-auto rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors bg-red-500 hover:bg-red-600"
              >
                Accept Order
              </button>
            )}
            {data?.getOrder.order?.status === OrderStatus.Cooking && (
              <button
                onClick={() => onButtonClick(OrderStatus.Cooked)}
                className="mb-2 w-1/2 mx-auto rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors bg-red-500 hover:bg-red-600"
              >
                Order Cooked
              </button>
            )}
            {data?.getOrder.order?.status !== OrderStatus.Cooking &&
              data?.getOrder.order?.status !== OrderStatus.Pending && (
                <span className="text-center mt-5 mb-3 text-2xl animate-color-change">
                  Status: {data?.getOrder.order?.status}
                </span>
              )}
          </>
        )}
        {userData?.me.role === UserRole.Delivery && (
          <>
            {data?.getOrder.order?.status === OrderStatus.Cooked && (
              <button
                onClick={() => onButtonClick(OrderStatus.PickedUp)}
                className="mb-2 w-1/2 mx-auto rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors bg-red-500 hover:bg-red-600"
              >
                Picked Up
              </button>
            )}
            {data?.getOrder.order?.status === OrderStatus.PickedUp && (
              <button
                onClick={() => onButtonClick(OrderStatus.Delivered)}
                className="mb-2 w-1/2 mx-auto rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors bg-red-500 hover:bg-red-600"
              >
                Order Delivered
              </button>
            )}
          </>
        )}
        {data?.getOrder.order?.status === OrderStatus.Delivered && (
          <span className="text-center mt-5 mb-3 text-2xl animate-color-change">
            Thank you for using #{data?.getOrder.order?.restaurant?.name}
          </span>
        )}
      </div>
    </div>
  );
};
