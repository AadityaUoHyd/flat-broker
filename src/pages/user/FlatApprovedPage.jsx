import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createEnquiry, getApprovedFlats } from '../../api/user';
import MarketFlatList from '../../components/MarketFlatList';

const FlatApprovedPage = () => {
    const [flats, setFlats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const loadingAllApprovedFlats = async () => {
        setErr(null);
        setLoading(true);
        try {
            const { data } = await getApprovedFlats();
            setFlats(data.flats);
            console.log(data.flats);
        } catch (err) {
            setErr("Error fetching all Approved flats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingAllApprovedFlats();
    }, []);

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

    if (loading)
        return (
            <p className="text-center text-gray-600 mt-10 font-medium">Loading approved flats...</p>
        );

    if (err)
        return (
            <p className="text-center text-red-600 mt-10 font-semibold">{err}</p>
        );

    return (
        <>
            <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-3xl shadow-md">
                <div className="flex items-center justify-between mb-6 px-3 py-1">
                    <h2 className="text-2xl font-bold text-gray-900">Available Flats</h2>
                    <Link
                        className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition"
                        to="/user-dash/myflats/add"
                    >
                        + Add Flat
                    </Link>
                </div>

                <MarketFlatList flats={flats} onEnquiry={handleEnquiry} />
            </div>
        </>
    );
};

export default FlatApprovedPage;
