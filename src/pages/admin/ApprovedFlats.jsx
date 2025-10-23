import React, { useEffect, useState } from "react";
import { getApprovedFlatsAdmin } from "../../api/admin";
import { motion } from "framer-motion";
import { CheckCircle, HomeIcon, User } from "lucide-react";

const ApprovedFlats = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadingApprovedFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getApprovedFlatsAdmin();
      setResponse(data.flats);
    } catch (err) {
      setErr("Error fetching Approved flats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingApprovedFlats();
  }, []);

  if (loading)
    return (
      <p className="flex items-center justify-center mt-10 text-blue-600 font-medium">
        Loading approved flats...
      </p>
    );
  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length)
    return <p className="text-gray-500 mt-4">No Approved Flats.</p>;

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 min-h-screen p-6 rounded-xl">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-green-800 dark:text-green-300">
        <CheckCircle className="w-7 h-7 text-green-600" />
        Approved Flats
      </h2>
      <div className="space-y-8">
        {response.map((f) => (
          <motion.div
            key={f.id}
            className="border border-gray-200 shadow-md hover:shadow-lg transition-all p-6 rounded-2xl bg-white dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <HomeIcon className="text-blue-500 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {f.title}
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 font-medium">
                {f.status}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300">{f.address}</p>
            <p className="text-blue-700 dark:text-blue-400 font-semibold mt-1">
              Price: ₹ {f.price}
            </p>

            <div className="text-sm text-gray-700 dark:text-gray-300 mt-4 space-y-2 bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <p className="font-semibold flex items-center gap-2 mb-2 text-green-700 dark:text-green-300">
                <User className="w-5 h-5" />
                Owner
              </p>
              <p>
                {f.owner.name} ({f.owner.email})
              </p>
              <p>Phone: {f.owner.phoneNo}</p>
              <p>Address: {f.owner.address}</p>
            </div>

            {Array.isArray(f.images) && f.images.length ? (
              <div className="mt-5 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-green-300 dark:scrollbar-thumb-green-600">
                {f.images.map((src, i) => (
                  <img
                    key={`${f.id}-${i}`}
                    src={src}
                    loading="lazy"
                    alt={`Flat ${f.title} - image ${i + 1}`}
                    className="w-36 h-28 object-cover rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0 hover:scale-[1.05] transition-transform"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-5 w-44 h-28 bg-gray-100 dark:bg-gray-700 rounded grid place-items-center text-xs text-gray-500">
                No image
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedFlats;
