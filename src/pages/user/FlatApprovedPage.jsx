import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createEnquiry, getApprovedFlats } from "../../api/user";
import MarketFlatList from "../../components/MarketFlatList";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

const FlatApprovedPage = () => {
    const [flats, setFlats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const loadingAllApprovedFlats = async (page = 1) => {
        setErr(null);
        setLoading(true);
        try {
            const { data } = await getApprovedFlats({ page, limit: itemsPerPage });
            setFlats(data.flats);
        } catch (err) {
            setErr("Error fetching all Approved flats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingAllApprovedFlats(currentPage);
    }, [currentPage]);

    const handleEnquiry = async (flat) => {
        const flatId = flat.id;
        const message = window.prompt("Enter your enquiry message:");
        if (!message?.trim()) return;
        try {
            await createEnquiry(flatId, message.trim());
            alert("Enquiry Sent Successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to send enquiry");
        }
    };

    const totalPages = Math.ceil(flats.length / itemsPerPage);

    if (loading) return <Loading />;

    if (err)
        return (
            <p className="text-center text-red-600 mt-10 font-semibold">
                {err}
            </p>
        );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Available Flats</h2>
                <Link
                    to="/user-dash/myflats/add"
                    className="border border-green-600 text-green-600 px-5 py-2 rounded-md hover:bg-green-600 hover:text-white transition"
                >
                    + Add Flat
                </Link>
            </div>

            <MarketFlatList flats={flats} onEnquiry={handleEnquiry} />
            <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default FlatApprovedPage;
