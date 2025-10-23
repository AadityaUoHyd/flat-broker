import React, { useEffect, useState } from 'react';
import { getAllEnquiries, getApprovedFlatsAdmin, getPendingFlats, getSoldFlats } from '../../api/admin.js';

const Card = ({ title, value }) => {
  return (
    <div className="border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-extrabold text-gray-900 mt-2">{value}</p>
    </div>
  );
};

const AdminDashPage = () => {
  const [counts, setCounts] = useState({ pending: 0, approved: 0, sold: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      setLoading(true);
      try {
        const [p, s, a, q] = await Promise.all([
          getPendingFlats(),
          getSoldFlats(),
          getApprovedFlatsAdmin(),
          getAllEnquiries()
        ]);
        setCounts({
          pending: p.data.flats.length,
          approved: a.data.flats.length,
          sold: s.data.flat.length,
          enquiries: q.data.enquiries.length
        });
      } catch (err) {
        setErr("Error fetching Count", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 bg-gray-50 dark:bg-gray-800 py-8">
      <h2 className="text-3xl font-bold mb-8 text-blue-300">Admin Dashboard</h2>

      {loading && (
        <p className="text-center text-gray-600 my-10">Loading dashboard data...</p>
      )}

      {err && (
        <p className="text-center text-red-600 my-10">{err}</p>
      )}

      {!loading && !err && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card title="Pending Flats" value={counts.pending} />
          <Card title="Approved Flats" value={counts.approved} />
          <Card title="Sold Flats" value={counts.sold} />
          <Card title="Total Enquiries" value={counts.enquiries} />
        </div>
      )}
    </div>
  );
};

export default AdminDashPage;
