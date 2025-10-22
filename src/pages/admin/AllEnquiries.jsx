import React, { useEffect, useState } from "react";
import { getAllEnquiries } from "../../api/admin";

const AllEnquiries = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadingAllEnquiries = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getAllEnquiries();
      setResponse(data.enquiries);
    } catch (err) {
      setErr("Error fetching all enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingAllEnquiries();
  }, []);

  if (loading)
    return <p className="flex justify-center mt-10 text-gray-600">Loading enquiries...</p>;
  if (err) return <p className="text-red-600 mt-4">{err}</p>;
  if (!response.length)
    return <p className="text-gray-500 mt-4">No enquiries found.</p>;

  return (
      <>
        <h2 className="text-2xl font-bold mb-6">All Enquiries</h2>
        <div className="space-y-6">
          {response.map((f) => {
            const buyer = f.buyer;
            const owner = f.seller;
            const status = f.flat.status;

            // Compose status classes
            const statusClass =
                status === "sold"
                    ? "border border-green-600 text-green-700 bg-green-50"
                    : status === "approved"
                        ? "border border-blue-600 text-blue-700 bg-blue-50"
                        : "border border-amber-200 bg-amber-100 text-amber-700";

            return (
                <div
                    key={f.id}
                    className="border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{f.flat.title}</h3>
                    <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${statusClass}`}
                    >
                  {status}
                </span>
                  </div>

                  <p className="text-gray-700">{f.flat.address}</p>
                  <p className="text-sm mt-1 text-gray-600">
                    <span className="font-semibold">Message: </span>
                    {f.message}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-4 text-sm text-gray-700">
                    {/* Owner */}
                    <div>
                      <p className="font-semibold mb-1 text-gray-800">Owner :</p>
                      <p>{owner.name} ({owner.email})</p>
                      <p>Phone: {owner.phoneNo}</p>
                      <p>Address: {owner.address}</p>
                    </div>
                    {/* Buyer */}
                    <div>
                      <p className="font-semibold mb-1 text-gray-800">Enquiry From :</p>
                      <p>{buyer.name} ({buyer.email})</p>
                      <p>Phone: {buyer.phoneNo}</p>
                      <p>Address: {buyer.address}</p>
                    </div>
                  </div>

                  {Array.isArray(f.flat.images) && f.flat.images.length ? (
                      <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                        {f.flat.images.map((src, i) => (
                            <img
                                key={`${f.id}-${i}`}
                                src={src}
                                loading="lazy"
                                alt={`Flat ${f.flat.title} - image ${i + 1}`}
                                className="w-32 h-24 object-cover rounded border flex-shrink-0"
                            />
                        ))}
                      </div>
                  ) : (
                      <div className="mt-4 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs text-gray-500">
                        No image
                      </div>
                  )}
                </div>
            );
          })}
        </div>
      </>
  );
};

export default AllEnquiries;
