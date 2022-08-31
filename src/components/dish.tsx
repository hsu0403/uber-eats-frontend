import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FrontRestaurant_restaurant_restaurant_menu_options } from "../mytypes";

interface IDishProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  photo: string;
  isCustomer?: boolean;
  options?: FrontRestaurant_restaurant_restaurant_menu_options[] | null;
  orderStarted?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
  children?: React.ReactNode;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  photo,
  isCustomer = false,
  options,
  orderStarted = false,
  addItemToOrder,
  removeFromOrder,
  isSelected = false,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      className={`group px-8 pt-4 pb-8 border items-center transition-all ${
        isSelected ? "border-gray-700" : "hover:border-gray-700"
      }`}
    >
      <div
        className="bg-gray-700 outline-none bg-center bg-cover scale-90 group-hover:scale-100 transition-all bg-no-repeat py-28"
        style={{
          backgroundImage: `url(${photo})`,
        }}
      ></div>
      <hr className="w-0 h-0.5 mb-1 group-hover:w-full group-hover:bg-red-400 transition-all" />
      <div className="flex flex-col mr-2">
        <div className="mb-8">
          <h3 className="font-medium relative">
            {name}
            {orderStarted && (
              <button className="absolute right-0 text-3xl" onClick={onClick}>
                {isSelected ? (
                  <FontAwesomeIcon icon={faMinusCircle} />
                ) : (
                  <FontAwesomeIcon icon={faPlusCircle} />
                )}
              </button>
            )}
          </h3>
          <h4 className="text-lg font-medium opacity-60">{description}</h4>
        </div>
        <span>&#8361;{price}</span>
        {isCustomer && options?.length !== 0 && (
          <div>
            <h5 className="mt-3 mb-1 font-medium text-sm">Dish Options:</h5>
            {dishOptions}
          </div>
        )}
      </div>
    </div>
  );
};
