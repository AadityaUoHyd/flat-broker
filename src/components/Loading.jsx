import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="animate-spin">
                <img src="/logo.png" alt="Loading" className="w-12 h-12" />
            </div>
        </div>
    );
};

export default Loading;