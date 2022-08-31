import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import uberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useMe();
  const logoutClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <>
      {!data?.me.emailVerified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>{`Please verify your email(${data?.me.email})`}</span>
        </div>
      )}
      <header className="bg-white py-4">
        <div className="w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src={uberLogo}
              alt="ubereats-logo"
              className="w-24 hover:animate-waving-img"
            />
          </Link>
          <div>
            <span className="text-xs">
              <Link to="/edit-profile">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-xl hover:animate-waving-img"
                />
              </Link>
            </span>
            <span className="text-xs ml-6">
              <span onClick={logoutClick} className="cursor-pointer">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-xl hover:animate-waving-img"
                />
              </span>
            </span>
          </div>
        </div>
      </header>
    </>
  );
};
