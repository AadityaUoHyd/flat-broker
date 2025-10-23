import React, { useEffect, useState } from "react";
import MyFlatList from "../../components/MyFlatList";
import { getMyFlats } from "../../api/user";

const MyFlatsPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadAllUserFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getMyFlats();
      setFlats(data.flats);
      console.log(data);
    } catch (err) {
      setErr("Failed to fetch your flats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUserFlats();
  }, []);

  if (loading)
    return (
        <p className="text-center text-gray-600 mt-10 font-medium">Loading your flats...</p>
    );

  if (err)
    return (
        <p className="text-center text-red-600 mt-10 font-semibold">{err}</p>
    );

  return (
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Flats</h2>
        <MyFlatList flats={flats} />
      </div>
  );
};

export default MyFlatsPage;
