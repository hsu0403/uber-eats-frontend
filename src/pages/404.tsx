import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <Helmet>
      <title>Not Found | Uber-Eats</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-5">Page Not Found</h2>
    <h4>The page you're looking for does not exist or has moved.</h4>
    <Link to="/" className="hover:underline text-red-500">
      Go back home &rarr;
    </Link>
  </div>
);
