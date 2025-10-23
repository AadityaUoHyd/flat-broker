import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth"; // Assume auth hook for user data

const linkBase = "block px-4 py-2 rounded-md transition-colors duration-200";
const linkActive = "bg-blue-600 text-white hover:bg-blue-700";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from context/hook

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
        {/* Header */}
        <Header role="Admin" user={user} />

        {/* Main content area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-gray-300 p-6 space-y-6 shadow-md">
            <nav>
              <ul className="space-y-3">
                {[
                  { to: "/admin-dash", label: "Dashboard" },
                  { to: "/admin-dash/pending", label: "Pending Flats" },
                  { to: "/admin-dash/approved", label: "Approved Flats" },
                  { to: "/admin-dash/sold", label: "Sold Flats" },
                  { to: "/admin-dash/enquiriesAll", label: "All Enquiries" },
                ].map((link) => (
                    <li key={link.to}>
                      <NavLink
                          to={link.to}
                          end
                          className={({ isActive }) =>
                              `${linkBase} ${
                                  isActive
                                      ? linkActive
                                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                              }`
                          }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main outlet area */}
          <main className="flex-1 p-8 bg-white dark:bg-gray-900 shadow-inner min-h-[calc(100vh-200px)]">
            {/* Added bottom padding to prevent footer from sticking */}
            <div className="pb-16">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  );
};

export default AdminDashboard;
