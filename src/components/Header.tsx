import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBtc, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { toast } from "react-toastify";

const Header: FC = () => {
	const isAuth = useAuth();
	const dispatch = useAppDispatch();

  const logoutHandler = () => {
		dispatch(logout());
		removeTokenFromLocalStorage("token");
		toast.info('You have been logged out successfuly');
  };

  return (
    <header className="flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>

      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  [isActive ? "text-white" : "text-white/60"].join(" ")
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  [isActive ? "text-white" : "text-white/60"].join(" ")
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  [isActive ? "text-white" : "text-white/60"].join(" ")
                }
              >
                Transactions
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <Link to="/" replace>
          <button onClick={logoutHandler} className="btn btn-red">
            Log Out
            <FaSignOutAlt />
          </button>
        </Link>
      ) : (
        <Link
          to="/auth"
          className="flex justify-between w-[60px] py-2 text-white/50 hover:text-green-300 ml-auto"
        >
          Log In
          <FaSignInAlt />
        </Link>
      )}
    </header>
  );
};

export default Header;
