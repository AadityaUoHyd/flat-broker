import React, { useEffect, useState } from 'react'
import { getSellerSoldEnquiries, markFlatSold } from '../../api/user';
import EnquiriesReceived from '../../components/EnquiriesReceived';

const EnquiriesForMyFlat = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [flatId, setFlatId] = useState(null);

    const loadingAllUserFlatsEnquiries = async () => {
        setErr(null);
        setLoading(true);
        try {
            const { data } = await getSellerSoldEnquiries();
            setResponse(data.enquiries);
        } catch (err) {
            setErr("Error to fetch enquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingAllUserFlatsEnquiries();
    }, []);

    const onSold = async (enq) => {
        const buyerId = enq.buyer_id;
        const flatId = enq.flat_id;

        const ok = window.confirm(
            `Sell flat #${flatId} to ${enq.buyer.name} ${enq.buyer.email}`
        );

        if (!ok) return;

        try {
            setFlatId(enq.id);
            await markFlatSold(flatId, buyerId);
            setResponse((list) => list.filter((x) => x.id !== enq.id));
            alert("Marked as Sold");
        } catch (err) {
            alert("Failed to mark as sold");
        } finally {
            setFlatId(null);
        }
    };

    if (loading)
        return (
            <p className="text-center text-gray-600 mt-10 font-medium">Loading enquiries...</p>
        );
    if (err)
        return (
            <p className="text-center text-red-600 mt-10 font-semibold">{err}</p>
        );

    return (
        <>
            <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-3xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Enquiries for My Flats</h2>
                <EnquiriesReceived items={response} onSold={onSold} flatId={flatId} />
            </div>
        </>
    );
};

export default EnquiriesForMyFlat;
