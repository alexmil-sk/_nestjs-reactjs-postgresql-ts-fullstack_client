import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({ children }: any) => {
  const isAuth = useAuth();

  return <>{isAuth ? children : <Navigate to="/" replace />}</>;
};

export { ProtectedRoute };
