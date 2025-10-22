import React, { useEffect, useState } from "react";
import { approveFlat, getPendingFlats, rejectFlat } from "../../api/admin";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { CheckCircle, XCircle, HomeIcon, Loader2 } from "lucide-react";

const PendingFlats = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [flatId, setFlatId] = useState(null);

  const loadingPendingFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getPendingFlats();
      setResponse(data.flats);
    } catch (err) {
      setErr("Error fetching flats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingPendingFlats();
  }, []);

  const onApprove = async (id) => {
    if (!window.confirm("Sure, Approve this flat?")) return;
    try {
      setFlatId(id);
      await approveFlat(id);
      await loadingPendingFlats();
    } catch (err) {
      alert("Failed to approved flats", err);
    } finally {
      setFlatId(null);
    }
  };

  const onReject = async (id) => {
    if (!window.confirm("Sure, Reject this flat?")) return;
    try {
      setFlatId(id);
      await rejectFlat(id);
      await loadingPendingFlats();
    } catch (err) {
      alert("Failed to reject flats", err);
    } finally {
      setFlatId(null);
    }
  };

  if (loading)
    return (
        <div className="flex items-center justify-center mt-10 text-gray-600">
          <Loader2 className="animate-spin mr-2" />
          Loading pending flats...
        </div>
    );

  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length) return <p className="text-gray-500 mt-4">No Pending Flats.</p>;

  return (
      <>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HomeIcon className="w-6 h-6 text-blue-500" />
          Pending Flats
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
                {/* Images */}
                {Array.isArray(f.images) && f.images.length ? (
                    <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
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
                    <div className="mt-3 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs text-gray-500">
                      No image
                    </div>
                )}

                {/* Info */}
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{f.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                    {f.status}
                  </span>
                    </div>
                    <p className="text-gray-600">{f.address}</p>
                    <p className="text-blue-700 font-medium">Price: ₹ {f.price}</p>

                    <div className="text-sm text-gray-700 mt-2 space-y-1">
                      <p>
                        <span className="font-medium">Owner:</span> {f.owner.name} ({f.owner.email})
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {f.owner.phoneNo}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span> {f.owner.address}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="shrink-0 flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <button
                        onClick={() => onApprove(f.id)}
                        className="px-4 py-2 flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded transition disabled:opacity-50"
                        disabled={flatId === f.id}
                    >
                      {flatId === f.id ? (
                          <>
                            <Loader2 className="animate-spin w-4 h-4" /> Approving...
                          </>
                      ) : (
                          <>
                            <CheckCircle className="w-4 h-4" /> Approve
                          </>
                      )}
                    </button>

                    <button
                        onClick={() => onReject(f.id)}
                        className="px-4 py-2 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded transition disabled:opacity-50"
                        disabled={flatId === f.id}
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              </motion.div>
          ))}
        </div>
      </>
  );
};

export default PendingFlats;
