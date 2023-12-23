import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localStorage.helper";
import { login, logout } from "./store/user/userSlice";
import { AuthService } from "./services/auth.service";
import { toast } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
		const token = getTokenFromLocalStorage();
    try {
      if (token) {
				const data = await AuthService.getProfile();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    checkAuth();
  });

  return <RouterProvider router={router} />;
}
export default App;
