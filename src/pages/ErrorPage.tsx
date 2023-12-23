import { FC } from "react";
import errorImage from "/images/404.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-slate-900 font-roboto-black text-[50px] text-white flex justify-center items-center flex-col gap-10">
        <span>ErrorPage</span>
        <img src={errorImage} alt="404" className="border-4 rounded-md" />
        <div className="flex w-[120px] justify-between">
          <Link to="">
            <button onClick={() => navigate(-1)} className="btn btn-sky">
              <TiArrowBack size={24} />
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-sky">
              <FaHome size={24} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
