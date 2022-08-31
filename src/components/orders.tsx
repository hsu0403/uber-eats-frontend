import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import {
  FrontGetOrders,
  FrontGetOrdersVariables,
  FrontTakeOrder,
  FrontTakeOrderVariables,
  OrderStatus,
  UserRole,
} from "../mytypes";
import { TAKE_ORDER_MUTATION } from "../pages/driver/dashboard";
import { GET_ORDERS_QUERY } from "../pages/my-orders";

interface IOrdersProps {
  status?: OrderStatus;
}

export const Orders: React.FC<IOrdersProps> = ({
  status = OrderStatus.Pending,
}) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data: userData } = useMe();
  const { data, refetch, loading } = useQuery<
    FrontGetOrders,
    FrontGetOrdersVariables
  >(GET_ORDERS_QUERY, {
    variables: { input: { status, page } },
  });

  useEffect(() => {
    refetch({ input: { status, page } });
  }, [refetch, status, page]);

  const onCompleted = (tkaeOrderData: FrontTakeOrder) => {
    if (!tkaeOrderData.takeOrder.ok) {
      window.alert(tkaeOrderData.takeOrder.error);
    }
    if (tkaeOrderData.takeOrder.ok) {
      navigate(`/orders/${tkaeOrderData.takeOrder.orderId}`, {
        replace: true,
      });
    }
  };

  const [takeOrderMutation] = useMutation<
    FrontTakeOrder,
    FrontTakeOrderVariables
  >(TAKE_ORDER_MUTATION, { onCompleted });
  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };
  console.log(data);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-80">
          <div className="animate-rotate-loading w-24 h-24 rounded-[50%] border-[10px] border-solid border-gray-800 border-t-slate-400 border-b-white">
            <div className="animate-rotate-loading w-full h-full rounded-[50%] border-[10px] border-solid border-gray-800 border-t-white border-b-amber-400">
              <div className="animate-rotate-loading w-full h-full rounded-[50%] border-[10px] border-solid border-gray-800 border-t-rose-400 border-b-white"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2">
          {userData?.me.role !== UserRole.Delivery &&
            data?.getOrders.orders?.map((order) => (
              <Link
                to={`/orders/${order.id}`}
                key={order.id}
                className="py-4 px-2 flex flex-col justify-center items-center hover:border-gray-700 border transition-all"
              >
                <div className="text-xl font-semibold mb-2">{order.status}</div>
                <div>
                  <div>Restaurant: {order.restaurant?.name}</div>
                  <div>Customer: {order.customer?.email}</div>
                  <div>
                    Driver: {order.driver ? order.driver.email : "Not Yet"}
                  </div>
                </div>
                <div className="mt-2 text-lg">&#8361; {order.total}</div>
              </Link>
            ))}
          {userData?.me.role === UserRole.Delivery &&
            data?.getOrders.orders?.map((order) =>
              order.status === OrderStatus.Cooked ? (
                <div
                  key={order.id}
                  className="py-4 px-2 flex flex-col justify-center items-center hover:border-gray-700 border transition-all"
                >
                  <div className="text-xl font-semibold mb-2">
                    {order.status}
                  </div>
                  <div>
                    <div>Restaurant: {order.restaurant?.name}</div>
                    <div>Customer: {order.customer?.email}</div>
                    <div>
                      Driver: {order.driver ? order.driver.email : "Not Yet"}
                    </div>
                  </div>
                  <div className="mt-2 text-lg">&#8361; {order.total}</div>

                  <button
                    onClick={() => triggerMutation(order.id)}
                    className="block text-center mt-5 w-full rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors bg-red-500 hover:bg-red-600"
                  >
                    Accept
                  </button>
                </div>
              ) : (
                <Link
                  to={`/orders/${order.id}`}
                  key={order.id}
                  className="py-4 px-2 flex flex-col justify-center items-center hover:border-gray-700 border transition-all"
                >
                  <div className="text-xl font-semibold mb-2">
                    {order.status}
                  </div>
                  <div>
                    <div>Restaurant: {order.restaurant?.name}</div>
                    <div>Customer: {order.customer?.email}</div>
                    <div>
                      Driver: {order.driver ? order.driver.email : "Not Yet"}
                    </div>
                  </div>
                  <div className="mt-2 text-lg">&#8361; {order.total}</div>
                </Link>
              )
            )}
        </div>
      )}
      {data?.getOrders.totalPages ? (
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
            Page {page} of {data?.getOrders.totalPages}
          </span>
          {page !== data?.getOrders.totalPages ? (
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
      ) : (
        <div></div>
      )}
    </>
  );
};
