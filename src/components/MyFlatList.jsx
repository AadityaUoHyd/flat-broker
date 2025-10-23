import React from "react";

function StatusTag({ status }) {
  const s = status.toLowerCase();
  const base = "text-xs px-2 py-1 rounded-full border font-semibold";
  const cls =
    s === "approved"
      ? `${base} border-blue-600 text-blue-700 bg-blue-50`
      : s === "pending"
      ? `${base} border-amber-300 text-amber-700 bg-amber-100`
      : s === "sold"
      ? `${base} border-green-600 text-green-700 bg-green-50`
      : s === "rejected"
      ? `${base} border-red-600 text-red-700 bg-red-50`
      : `${base} bg-gray-800 text-gray-600 border-gray-400`;
  return <span className={cls}>{s}</span>;
}

const MyFlatList = ({ flats }) => {
  const list = Array.isArray(flats) ? flats : [];
  if (!list.length) return <p className="text-center text-gray-500 py-8">No flats found</p>;
  return (
    <>
      <div className="space-y-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        {list.map((f) => {
          return (
            <div
              key={f.id}
              className="border border-gray-300 p-5 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">{f.title}</h3>
                <StatusTag status={f.status} />
              </div>

              <p className="text-gray-700 dark:text-gray-100">{f.address}</p>
              <p className="text-indigo-500 font-semibold mt-1">Price: ₹ {Number(f.price).toLocaleString()}</p>
              <p className="text-gray-300 dark:text-gray-100 text-sm mt-2">{f.description}</p>
              <p className="text-gray-400 text-xs mt-2 italic">Created on: {new Date(f.created_at).toLocaleString()}</p>

              {Array.isArray(f.images) && f.images.length ? (
                <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {f.images.map((src, i) => (
                    <img
                      key={`${f.id}-${i}`}
                      src={src}
                      loading="lazy"
                      alt={`Flat ${f.title} image ${i + 1}`}
                      className="w-32 h-24 object-cover rounded-md border border-gray-200 text-gray-300 dark:text-gray-100 flex-shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 w-40 h-24 bg-gray-100 rounded-md grid place-items-center text-xs text-gray-500">
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

export default MyFlatList;
