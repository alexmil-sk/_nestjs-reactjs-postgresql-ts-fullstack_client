import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../services/auth.service";
import { setTokenToLocalStorage } from "../helpers/localStorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({
        username,
        email,
        password,
      });

      if (data) {
        setTokenToLocalStorage("token", data.user.token);
        dispatch(login(data.user));

        toast.success("You have been logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      const errorsTipical = err.response?.data;
      const errorsMine = err.response?.data.errors;

      if (errorsTipical.message || errorsTipical.statusCode) {
        toast.error(
          `Some fields are empty: ${errorsTipical.message}, ${errorsTipical.statusCode}`,
        );
      } else if (errorsMine) {
        toast.error(
          `	
        EMAIL:
					${errorsMine.email ? `( ${errorsMine.email}  )` : "( ok )"},
			
        PASSWORD: 
					${errorsMine.password ? `( ${errorsMine.password}  )` : "( ok )"}`,
        );
      }
    }
  };

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({
        username,
        email,
        password,
      });

      if (data) {
        toast.success("Account has been created successfully");
        setIsLogin(!isLogin);
      }
    } catch (err: any) {
      const errors = err.response?.data.errors;

      toast.error(
        `
				USERNAME: 
					${errors.username ? `( ${errors.username} )` : "( ok )"},
				
        EMAIL:
					${errors.email ? `( ${errors.email}  )` : "( ok )"},
			
        PASSWORD: 
					${
            errors.password
              ? errors.password.map(
                  (item: string) => ` ( ${item.toLowerCase()} ) `,
                )
              : "( ok )"
          }`,
      );
    }
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10 tracking-[1px]">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className="flex w-1/3 flex-col mx-auto gap-5 "
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
          className="input"
          style={{ display: isLogin ? "none" : "block" }}
          placeholder={isLogin ? "" : "Username"}
          disabled={isLogin}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          className="input"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          className="input"
          placeholder="Password"
        />
        <button type="submit" className={`btn mx-auto ${isLogin ? 'btn-green' : 'btn-sky' }`}>
          Submit
        </button>
      </form>
      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Don`t you have account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
