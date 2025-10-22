import React, { useState } from "react";
import { createFlat } from "../../api/user.js";
import { useNavigate } from "react-router-dom";

const MAX_FILES = 5;
const MAX_MB = 5;
const AddFlatPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        address: "",
        price: "",
        description: "",
        amenities: "",
    });

    const [files, setFiles] = useState([]);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState(null);

    const onChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const onFiles = (e) => {
        setErr(null);
        const chosen = Array.from(e.target.files || []);
        const next = [];
        for (const f of chosen) {
            if (files.length + next.length >= MAX_FILES) break;
            if (f.size > MAX_MB * 1024 * 1024) {
                setErr(`"${f.name}" is larger than ${MAX_MB} MB`);
                continue;
            }
            next.push(f);
        }
        setFiles((prev) => [...prev, ...next]);
        e.target.value = "";
    };

    const removeFile = (i) => setFiles((arr) => arr.filter((_, idx) => idx !== i));

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);

        if (!files.length) {
            setErr("Please upload at least one image");
            return;
        }

        try {
            setSaving(true);

            const fd = new FormData();
            fd.append("title", form.title.trim());
            fd.append("address", form.address.trim());
            fd.append("price", form.price.trim());
            fd.append("description", form.description.trim());

            const amenities = form.amenities
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

            fd.append("amenities", JSON.stringify(amenities));

            files.forEach((file) => fd.append("images", file));

            await createFlat(fd);
            alert("Flat Submitted ! Awaited approval");
            navigate("/user-dash/myflats");
        } catch (error) {
            setErr(error.message || "Failed to create flat");
        } finally {
            setSaving(false);
        }
    };
    return (
        <>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl shadow-lg mt-8">
                <h2 className="text-2xl font-bold mb-5 text-gray-900">Add Flat</h2>

                {err && <p className="text-red-600 mb-4 font-medium">{err}</p>}

                <form className="space-y-5" onSubmit={onSubmit}>
                    <input
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        placeholder="Title"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        placeholder="Address"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        name="price"
                        value={form.price}
                        onChange={onChange}
                        placeholder="Price"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        placeholder="Description"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        name="amenities"
                        value={form.amenities}
                        onChange={onChange}
                        placeholder="Amenities (comma separated)"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFiles}
                            className="block"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Up to {MAX_FILES} files, {MAX_MB} MB each
                        </p>

                        {files.length > 0 && (
                            <ul className="mt-3 text-sm space-y-2">
                                {files.map((f, i) => (
                                    <li
                                        key={`${f.name}-${i}`}
                                        className="flex items-center justify-between gap-3 bg-gray-100 p-2 rounded"
                                    >
                                        <span className="truncate max-w-xs">{f.name}</span>
                                        <button
                                            type="button"
                                            className="text-xs border border-red-500 text-red-600 px-2 rounded hover:bg-red-100 transition"
                                            onClick={() => removeFile(i)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        disabled={saving}
                        className={`w-full py-3 rounded-2xl font-semibold transition ${
                            saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        type="submit"
                    >
                        {saving ? "Saving..." : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddFlatPage;
