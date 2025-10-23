import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth"; // Assume auth hook

const linkBase = "block px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200";
const linkActive = "bg-blue-600 text-white hover:bg-blue-700";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
        <Header role="User" user={user} />
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-56 bg-gray-900 text-gray-300 min-h-screen p-6 space-y-6 shadow-lg">
            <nav>
              <ul className="space-y-3">
                <li>
                  <NavLink
                      to="/user-dash"
                      end
                      className={({ isActive }) =>
                          `${linkBase} ${isActive ? linkActive : "text-gray-700 dark:text-gray-300"}`
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
                          `${linkBase} ${isActive ? linkActive : "text-gray-700 dark:text-gray-300"}`
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
                          `${linkBase} ${isActive ? linkActive : "text-gray-700 dark:text-gray-300"}`
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
                          `${linkBase} ${isActive ? linkActive : "text-gray-700 dark:text-gray-300"}`
                      }
                  >
                    Enquiries Received
                  </NavLink>
                </li>
                <li>
                  <NavLink
                      to="/user-dash/profile"
                      end
                      className={({ isActive }) =>
                          `${linkBase} ${isActive ? linkActive : "text-gray-700 dark:text-gray-300"}`
                      }
                  >
                    Profile
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-8 bg-white dark:bg-gray-900 shadow-inner rounded-tr-3xl rounded-br-3xl">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
  );
};

export default UserDashboard;