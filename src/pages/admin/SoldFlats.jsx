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
        <div className="flex items-center justify-center mt-10 text-gray-600">
          <Loader2 className="animate-spin mr-2" />
          Loading sold flats...
        </div>
    );

  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length) return <p className="text-gray-500 mt-4">No Sold Flats.</p>;

  return (
      <>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BadgeCheck className="w-6 h-6 text-green-600" />
          Sold Flats
        </h2>
        <div className="space-y-6">
          {response.map((f) => {
            const buyer = f.soldTo;
            return (
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

                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">Sold on:</span>{" "}
                    {new Date(f.sold_date).toLocaleString()}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-4 text-sm bg-gray-50 p-4 rounded-md">
                    {/* Owner */}
                    <div>
                      <p className="font-semibold mb-1 flex items-center gap-1">
                        <User className="w-4 h-4 text-indigo-500" />
                        Owner
                      </p>
                      <p>{f.owner.name} ({f.owner.email})</p>
                      <p>Phone: {f.owner.phoneNo}</p>
                      <p>Address: {f.owner.address}</p>
                    </div>

                    {/* Buyer */}
                    <div>
                      <p className="font-semibold mb-1 flex items-center gap-1">
                        <User className="w-4 h-4 text-green-500" />
                        Buyer
                      </p>
                      <p>{buyer.name} ({buyer.email})</p>
                      <p>Phone: {buyer.phoneNo}</p>
                      <p>Address: {buyer.address}</p>
                    </div>
                  </div>

                  {/* Images */}
                  {Array.isArray(f.images) && f.images.length ? (
                      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                        {f.images.map((src, i) => (
                            <img
                                key={`${f.id}-${i}`}
                                src={src}
                                loading="lazy"
                                className="w-32 h-24 object-cover rounded border flex-shrink-0"
                                alt={`Flat ${f.title} - image ${i + 1}`}
                            />
                        ))}
                      </div>
                  ) : (
                      <div className="mt-4 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs text-gray-500">
                        No image
                      </div>
                  )}
                </motion.div>
            );
          })}
        </div>
      </>
  );
};

export default SoldFlats;
