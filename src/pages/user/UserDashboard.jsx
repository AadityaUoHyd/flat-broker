import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const linkBase = "block px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200";
const linkActive = "bg-blue-600 text-white hover:bg-blue-700";

const UserDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-200 min-h-screen p-6 space-y-6 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-extrabold text-lg text-gray-800">User Panel</h2>
            <button
                onClick={logout}
                className="text-xs px-3 py-1 border border-red-500 rounded-md text-red-600 hover:bg-red-500 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>

          <nav>
            <ul className="space-y-3">
              <li>
                <NavLink
                    to="/user-dash"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700"}`
                    }
                >
                  Approved Flats
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/user-dash/myflats"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700"}`
                    }
                >
                  My Flats
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/user-dash/enquiries"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700"}`
                    }
                >
                  My Enquiries
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/user-dash/enquiries/received"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700"}`
                    }
                >
                  Enquiries Received
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-white shadow-inner rounded-tr-3xl rounded-br-3xl">
          <Outlet />
        </main>
      </div>
  );
};

export default UserDashboard;
