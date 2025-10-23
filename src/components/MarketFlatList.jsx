import React from "react";

function StatusTag({ status }) {
  const s = status.toLowerCase();
  const base = "text-xs px-2 py-1 rounded-full border";
  const cls =
    s === "approved"
      ? `${base} border-blue-600 text-blue-700`
      : s === "pending"
      ? `${base} border-amber-100 text-amber-700 border-amber-200`
      : s === "sold"
      ? `${base} border-green-600 text-green-700`
      : s === "rejected"
      ? `${base} border-red-600 text-red-700`
      : `${base} bg-gray-100 text-gray-700 border-gray-200`;
  return <span className={cls}>{s}</span>;
}
const MarketFlatList = ({ flats, onEnquiry }) => {
  const list = Array.isArray(flats) ? flats : [];
  if (!list.length) return <p>No flats Found</p>;
  return (
    <>
      <div className="space-y-4">
        {list.map((f) => {
          return (
            <div key={f.id} className="border p-3 rounded">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-amber-400 ">{f.title}</h3>
                <StatusTag status={f.status}/>
              </div>

              {<p>{f.address}</p>}
              {<p>Price : ₹ {Number(f.price)}</p>}
              {<p className="text-sm mt-1">{f.description}</p>}

              <button className="mt-2 px-3 py-1 border rounded bg-blue-600 hover:bg-blue-900 cursor-pointer" onClick={()=> onEnquiry(f)}>
                Send Enquiry
              </button>
              {/* images */}

              {Array.isArray(f.images) && f.images.length ? (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {f.images.map((src, i) => (
                    <img
                      key={`${f.id}-${i}`}
                      src={src}
                      loading="lazy"
                      className="w-32 h-24 object-cover rounded border flex-shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-3 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs">
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

export default MarketFlatList;
