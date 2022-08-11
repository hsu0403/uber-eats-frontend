import { Link } from "react-router-dom";

interface IRestaurantProps {
  restaurantName: string;
  address: string;
  coverImg: string;
  categoryName?: string;
  id: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  address,
  coverImg,
  restaurantName,
  categoryName,
  id,
}) => (
  <Link to={`restaurant/${id}`}>
    <div className="py-24 bg-[url('https://i.ibb.co/3zpFcJZ/pizza.jpg')] bg-cover bg-no-repeat bg-center mb-2"></div>
    <h3 className="text-xl font-medium">{restaurantName}</h3>
    <h5 className="text-xs font-light mb-5">{address}</h5>
    <span className="border-t-2 border-gray-300 text-sm opacity-50">
      {categoryName}
    </span>
  </Link>
);
