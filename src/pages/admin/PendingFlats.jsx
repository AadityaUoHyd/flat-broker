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
      <div className="flex items-center justify-center mt-10 text-blue-600 font-medium">
        <Loader2 className="animate-spin mr-2" />
        Loading pending flats...
      </div>
    );

  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length)
    return <p className="text-gray-500 mt-4">No Pending Flats.</p>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 min-h-screen p-6 rounded-xl">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-blue-800 dark:text-blue-300">
        <HomeIcon className="w-7 h-7 text-blue-600" />
        Pending Flats
      </h2>

      <div className="space-y-8">
        {response.map((f) => (
          <motion.div
            key={f.id}
            className="border border-gray-200 shadow-md hover:shadow-xl transition-all bg-white dark:bg-gray-800 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Images */}
            {Array.isArray(f.images) && f.images.length ? (
              <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-gray-600">
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
              <div className="mt-3 w-40 h-24 bg-gray-100 dark:bg-gray-700 rounded grid place-items-center text-xs text-gray-500">
                No image
              </div>
            )}

            {/* Info Section */}
            <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {f.title}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full border border-yellow-300 bg-yellow-100 text-yellow-700 font-medium">
                    {f.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300">{f.address}</p>
                <p className="text-blue-700 dark:text-blue-400 font-medium">
                  Price: ₹ {f.price}
                </p>

                <div className="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-3 rounded-lg">
                  <p>
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      Owner:
                    </span>{" "}
                    {f.owner.name} ({f.owner.email})
                  </p>
                  <p>
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      Phone:
                    </span>{" "}
                    {f.owner.phoneNo}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      Address:
                    </span>{" "}
                    {f.owner.address}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="shrink-0 flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => onApprove(f.id)}
                  className="px-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-medium hover:from-green-200 hover:to-green-300 transition-all shadow-sm disabled:opacity-50"
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
                  className="px-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-100 to-red-200 text-red-700 font-medium hover:from-red-200 hover:to-red-300 transition-all shadow-sm disabled:opacity-50"
                  disabled={flatId === f.id}
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PendingFlats;
