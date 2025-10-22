import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const linkBase = "block px-4 py-2 rounded-md transition-colors duration-200";
const linkActive = "bg-blue-600 text-white hover:bg-blue-700";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-6 space-y-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
            <button
                onClick={logout}
                className="text-sm px-3 py-1 border border-gray-400 rounded-md hover:bg-red-400 transition"
            >
              Logout
            </button>
          </div>

          <nav>
            <ul className="space-y-3">
              <li>
                <NavLink
                    to="/admin-dash"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700 hover:bg-gray-200"}`
                    }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/admin-dash/pending"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700 hover:bg-gray-200"}`
                    }
                >
                  Pending Flats
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/admin-dash/approved"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700 hover:bg-gray-200"}`
                    }
                >
                  Approved Flats
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/admin-dash/sold"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700 hover:bg-gray-200"}`
                    }
                >
                  Sold Flats
                </NavLink>
              </li>
              <li>
                <NavLink
                    to="/admin-dash/enquiriesAll"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : "text-gray-700 hover:bg-gray-200"}`
                    }
                >
                  All Enquiries
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-white shadow-inner">
          <Outlet />
        </main>
      </div>
  );
};

export default AdminDashboard;
