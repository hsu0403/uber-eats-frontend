import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import {
  RESTAURANT_FRAGMENT,
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  FULL_ORDER_FRAGMENT,
} from "../../fragments";
import {
  FrontCreatePayment,
  FrontCreatePaymentVariables,
  FrontMyRestaurant,
  FrontMyRestaurantVariables,
  FrontPendingOrders,
} from "../../mytypes";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
} from "victory";
import { useMe } from "../../hooks/useMe";

export const MY_RESTAURANT_QUERY = gql`
  query FrontMyRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation FrontCreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription FrontPendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

type IParams = {
  id: string;
};

interface IData {
  day: any;
  total: number;
}

export const MyRestaurant = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [chartData, setChartData] = useState<IData[]>();
  const { id } = useParams<IParams>();
  const [num, setNum] = useState("");
  const { data } = useQuery<FrontMyRestaurant, FrontMyRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    { variables: { input: { id: +num } } }
  );

  useEffect(() => {
    if (id) {
      setNum(id);
    }
  }, [id]);

  // useEffect(() => {
  //   if (data) {
  //     const newData:
  //       | {
  //           day: any;
  //           total: number | null;
  //         }[]
  //       | undefined = data.myRestaurant.restaurant?.orders.map((order) => ({
  //       total: order.total,
  //       day: order.createdAt.slice(5, 10),
  //     }));
  //     newData?.sort((a, b): any => {
  //       if (a.day > b.day) return 1;
  //       if (a.day === b.day) return 0;
  //       if (a.day < b.day) return -1;
  //     });
  //     let arr: IData[] = [];
  //     newData?.forEach((i) => {
  //       if (!arr.find((current) => current.day === i.day)) {
  //         arr.push({ day: i.day, total: 0 });
  //       }
  //     });
  //     arr.forEach((i) => {
  //       newData?.forEach((j) => {
  //         if (i.day === j.day) {
  //           if (j.total) {
  //             i.total += j.total;
  //           }
  //         }
  //       });
  //     });
  //     setChartData(arr);
  //   }
  // }, [data]);

  const onCompleted = (data: FrontCreatePayment) => {
    if (data.createPayment.ok) {
      alert("Your restaurant is being promoted!!");
    }
  };
  const [createPaymentMutation, { loading }] = useMutation<
    FrontCreatePayment,
    FrontCreatePaymentVariables
  >(CREATE_PAYMENT_MUTATION, { onCompleted });
  const { data: userData } = useMe();
  const triggerPaddle = () => {
    if (userData?.me.email) {
      // @ts-ignore
      window.Paddle.Setup({ vendor: 154670 });
      // @ts-ignore
      window.Paddle.Checkout.open({
        vendor: 785179,
        email: userData.me.email,
        successCallback: (data: any) => {
          createPaymentMutation({
            variables: {
              input: { restaurantId: +num, transactionId: data.checkout.id },
            },
          });
        },
      });
    }
  };

  const { data: pendingOrdersData } = useSubscription<FrontPendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (pendingOrdersData?.pendingOrders.id) {
      navigate(`/orders/${pendingOrdersData.pendingOrders.id}`, {
        replace: true,
      });
    }
  }, [pendingOrdersData, navigate]);
  console.log(data?.myRestaurant.restaurant);
  return (
    <div>
      <Helmet>
        <title>{`${data?.myRestaurant.restaurant?.name} | Uber-Eats`}</title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <div className="w-full justify-between flex">
          <Link
            to={`/restaurant/${id}/add-dish`}
            className="mr-8 text-white bg-gray-600 hover:bg-gray-700 py-3 px-10 rounded-r-md transition-colors"
          >
            Add Dish &rarr;
          </Link>
          {!data?.myRestaurant.restaurant?.isPromoted && (
            <span
              onClick={triggerPaddle}
              className="text-white cursor-pointer bg-red-500 hover:bg-red-600 py-3 px-10 rounded-r-md transition-colors"
            >
              Buy Promotion &rarr;
            </span>
          )}
        </div>

        {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
          <div className="mt-5 flex flex-col absolute">
            <div className="relative left-[70px]">
              <FontAwesomeIcon
                icon={faCircleArrowUp}
                className="text-red-500 text-2xl animate-bounce"
              />
            </div>
            <h4 className="text-xl mb-5 animate-color-change transition-colors ">
              Please upload a dsih!
            </h4>
          </div>
        ) : (
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myRestaurant.restaurant?.menu?.map((dish) => (
              <Dish
                key={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                photo={dish?.photo ? dish.photo : ""}
              />
            ))}
          </div>
        )}
      </div>
      {/* <div className="mt-20 mb-10">
        <h4 className="text-center text-2xl font-medium mb-5">{`${
          today.getMonth() + 1
        } Month Sales`}</h4>
        <div
          style={{ boxShadow: `rgb(188 82 64) -15px 15px` }}
          className="max-w-lg w-full mx-auto shadow-2xl border-l-4 border-b-4 border-gray-700 p-2"
        >
          <VictoryChart domainPadding={1} theme={VictoryTheme.grayscale}>
            <VictoryLine
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryLabel
                  style={{ fontSize: 10 }}
                  renderInPortal
                  dy={-20}
                />
              }
              interpolation="monotoneX"
              data={chartData?.map((order) => ({
                x: order.day,
                y: order.total,
              }))}
            />

            <VictoryAxis
              tickFormat={(tick) =>
                new Date(tick).toLocaleDateString("ko").slice(9, 11)
              }
            />
          </VictoryChart>
        </div>
      </div> */}
    </div>
  );
};
