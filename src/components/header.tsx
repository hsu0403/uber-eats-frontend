import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import uberLogo from "../images/logo.svg";

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => (
  <header className="bg-white py-4">
    <div className="w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
      <img src={uberLogo} alt="ubereats-logo" className="w-24" />
      <span className="text-xs">
        <Link to="/my-profile">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </Link>
      </span>
    </div>
  </header>
);
