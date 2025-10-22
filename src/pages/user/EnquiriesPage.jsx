import React, { useEffect, useState } from 'react'
import { getMyEnquiries } from '../../api/user';
import EnquiriesUser from '../../components/EnquiriesUser';

const EnquiriesPage = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const loadingAllUserEnquiries = async () => {
        setErr(null);
        setLoading(true);
        try {
            const { data } = await getMyEnquiries();
            setResponse(data.enquiries);
        } catch (err) {
            setErr("Error to fetch enquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingAllUserEnquiries();
    }, []);

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
                <h2 className="text-2xl font-bold mb-6 text-gray-900 px-3 py-1">My Enquiries</h2>
                <EnquiriesUser items={response} />
            </div>
        </>
    );
};

export default EnquiriesPage;
