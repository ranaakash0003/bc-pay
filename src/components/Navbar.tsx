import { Link, useNavigate, useLocation } from "react-router";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = localStorage.getItem("authUser");
  const user = authUser ? JSON.parse(authUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <header className="w-full h-16 flex items-center justify-between bg-primary-clr bg-white border-b">
      <h1 className="text-2xl font-bold ml-4">BC Pay</h1>
      <div className="w-[80%] flex items-center justify-evenly px-4">
        <input
          className="w-[400px] border border-black rounded-md px-2 py-1"
          type="text"
          placeholder="Search"
        />
        <span>About</span>
        <span>Contact us</span>
        {authUser ? (
          //   <div className="flex gap-4">
          //     <Link to="/dashboard" className="hover:text-gray-300">
          //       Dashboard
          //     </Link>
          //     <button
          //       onClick={handleLogout}
          //       className="bg-red-500 px-3 py-1 rounded-md"
          //     >
          //       Logout
          //     </button>
          //   </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
