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

  if (loading) return <p className="flex items-center justify-center mt-10 text-gray-600">Loading approved flats...</p>;
  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length) return <p className="text-gray-500 mt-4">No Approved Flats.</p>;

  return (
      <>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Approved Flats
        </h2>
        <div className="space-y-6">
          {response.map((f) => (
              <motion.div
                  key={f.id}
                  className="border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 rounded-md bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <HomeIcon className="text-blue-500 w-5 h-5" />
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                {f.status}
              </span>
                </div>

                <p className="text-gray-600">{f.address}</p>
                <p className="text-blue-700 font-medium">Price: ₹ {f.price}</p>

                <div className="text-sm text-gray-700 mt-3 space-y-1 bg-gray-50 p-3 rounded-md">
                  <p className="font-semibold flex items-center gap-1 mb-1">
                    <User className="w-4 h-4 text-indigo-500" />
                    Owner
                  </p>
                  <p>
                    {f.owner.name} ({f.owner.email})
                  </p>
                  <p>Phone: {f.owner.phoneNo}</p>
                  <p>Address: {f.owner.address}</p>
                </div>

                {Array.isArray(f.images) && f.images.length ? (
                    <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                      {f.images.map((src, i) => (
                          <img
                              key={`${f.id}-${i}`}
                              src={src}
                              loading="lazy"
                              alt={`Flat ${f.title} - image ${i + 1}`}
                              className="w-32 h-24 object-cover rounded border flex-shrink-0"
                          />
                      ))}
                    </div>
                ) : (
                    <div className="mt-4 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs text-gray-500">
                      No image
                    </div>
                )}
              </motion.div>
          ))}
        </div>
      </>
  );
};

export default ApprovedFlats;
