import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import {
  FrontCookedOrders,
  FrontTakeOrder,
  FrontTakeOrderVariables,
} from "../../mytypes";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription FrontCookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

export const TAKE_ORDER_MUTATION = gql`
  mutation FrontTakeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚘</div>;

export const DashBoard = () => {
  const navigate = useNavigate();
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
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
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      //   const geocoder = new google.maps.Geocoder();
      //   geocoder.geocode(
      //     {
      //       location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
      //     },
      //     (results, status) => {
      //       console.log(status, results);
      //     }
      //   );
    }
  }, [driverCoords, map, maps]);
  const onApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  const makeRoute = (lat: number, lng: number) => {
    const directionssService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    if (map) {
      directionsRenderer.setMap(map);
      directionssService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(lat, lng),
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };
  const { data: cookedOrdersData } = useSubscription<FrontCookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute(
        cookedOrdersData.cookedOrders.destination.lat,
        cookedOrdersData.cookedOrders.destination.lng
      );
    }
  }, [cookedOrdersData]);

  const onCompleted = (data: FrontTakeOrder) => {
    if (!data.takeOrder.ok) {
      window.alert(data.takeOrder.error);
    }
    if (data.takeOrder.ok) {
      navigate(`/orders/${cookedOrdersData?.cookedOrders.id}`, {
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
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          onGoogleApiLoaded={onApiLoaded}
          yesIWantToUseGoogleMapApiInternals
          center={driverCoords}
          defaultZoom={15}
          bootstrapURLKeys={{ key: "AIzaSyCq0tpyCumuRnrcSIHwnD5-FSmymV3TSzs" }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-7 px-5">
        {cookedOrdersData?.cookedOrders ? (
          <>
            <h1 className="text-center text-3xl font-medium">
              New Cooked Order
            </h1>
            <h4 className="text-center text-2xl my-3 font-medium">
              Pick it up soon! @{" "}
              {cookedOrdersData.cookedOrders.restaurant?.name}
            </h4>
            <button
              onClick={() => triggerMutation(cookedOrdersData.cookedOrders.id)}
              className="block text-center mt-5 w-full rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors bg-red-500 hover:bg-red-600"
            >
              Accept
            </button>
          </>
        ) : (
          <h1 className="text-center text-3xl font-medium">No Orders yet.</h1>
        )}
      </div>
      <div className="max-w-screen-sm mx-auto mt-10 flex justify-center items-center">
        <Link
          to="/orders"
          className="py-3 px-12 text-white rounded-xl transition-all bg-red-500 hover:bg-red-600"
        >
          Go Orders <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};
