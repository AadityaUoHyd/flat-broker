import React, { useEffect, useState } from "react";
import { getSoldFlats } from "../../api/admin";
import { motion } from "framer-motion";
import { BadgeCheck, Loader2, HomeIcon, User } from "lucide-react";

const SoldFlats = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadingSoldFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getSoldFlats();
      setResponse(data.flat);
    } catch (err) {
      setErr("Error fetching Sold flats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingSoldFlats();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center mt-10 text-blue-600 font-medium">
        <Loader2 className="animate-spin mr-2" />
        Loading sold flats...
      </div>
    );

  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length) return <p className="text-gray-500 mt-4">No Sold Flats.</p>;

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 min-h-screen p-6 rounded-xl">
        <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-blue-800 dark:text-blue-300">
          <BadgeCheck className="w-7 h-7 text-green-500" />
          Sold Flats
        </h2>

        <div className="space-y-8">
          {response.map((f) => {
            const buyer = f.soldTo;
            return (
              <motion.div
                key={f.id}
                className="border border-gray-200 shadow-md hover:shadow-xl transition-all bg-white dark:bg-gray-800 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="text-blue-500 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {f.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-medium ${
                      f.status === "Sold"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-yellow-100 text-yellow-700 border-yellow-300"
                    }`}
                  >
                    {f.status}
                  </span>
                </div>

                {/* Address & Price */}
                <p className="text-gray-600 dark:text-gray-300">{f.address}</p>
                <p className="text-blue-700 dark:text-blue-400 font-semibold mt-1">
                  Price: <span className="text-xl font-bold text-blue-800 dark:text-blue-300">₹ {f.price}</span>
                </p>

                {/* Sold Date */}
                <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Sold on:</span>{" "}
                  {new Date(f.sold_date).toLocaleString()}
                </p>

                {/* Owner & Buyer Info */}
                <div className="grid md:grid-cols-2 gap-6 mt-5 text-sm bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl">
                  {/* Owner */}
                  <div>
                    <p className="font-semibold mb-1 flex items-center gap-2 text-blue-600 dark:text-blue-300">
                      <User className="w-4 h-4 text-indigo-500" />
                      Owner
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      {f.owner.name} ({f.owner.email})
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">Phone: {f.owner.phoneNo}</p>
                    <p className="text-gray-600 dark:text-gray-400">Address: {f.owner.address}</p>
                  </div>

                  {/* Buyer */}
                  <div>
                    <p className="font-semibold mb-1 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <User className="w-4 h-4 text-green-500" />
                      Buyer
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      {buyer.name} ({buyer.email})
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">Phone: {buyer.phoneNo}</p>
                    <p className="text-gray-600 dark:text-gray-400">Address: {buyer.address}</p>
                  </div>
                </div>

                {/* Images */}
                {Array.isArray(f.images) && f.images.length ? (
                  <div className="mt-5 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-gray-600">
                    {f.images.map((src, i) => (
                      <img
                        key={`${f.id}-${i}`}
                        src={src}
                        loading="lazy"
                        className="w-36 h-28 object-cover rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0 hover:scale-[1.03] transition-transform"
                        alt={`Flat ${f.title} - image ${i + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 w-40 h-24 bg-gray-100 dark:bg-gray-700 rounded grid place-items-center text-xs text-gray-500">
                    No image
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SoldFlats;
