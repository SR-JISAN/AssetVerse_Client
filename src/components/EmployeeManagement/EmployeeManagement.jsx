import React from 'react';
// import { useEffect, useState } from "react";
// import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
const EmployeeManagement = ( ) => {
//   const [requests, setRequests] = useState([]);{ hrId}
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

  // Fetch pending requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(`/api/hr/${hrId}/pending-requests`);
//         setRequests(res.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch requests");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [hrId]);

  // Approve request
//   const handleApprove = async (requestId) => {
//     try {
//       await axios.post("/api/approve-request", { requestId });
//       setRequests(requests.filter((r) => r.id !== requestId));
//     } catch (err) {
//       alert(err.response?.data?.error || "Cannot approve request");
//     }
//   };

  // Reject request
//   const handleReject = async (requestId) => {
//     try {
//       await axios.post("/api/reject-request", { requestId });
//       setRequests(requests.filter((r) => r.id !== requestId));
//     } catch (err) {
//       alert(err.response?.data?.error || "Cannot reject request");
//     }
//   };

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
  return (
    <>
      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4 text-center">Pending Requests</h2>
        <AnimatePresence>
          {/* {requests.map((r) => ( */}
            <motion.div
            //   key={r.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
              className="flex items-center justify-between p-4 border rounded shadow bg-white"
            >
              <div>
                <p>
                  {/* <strong>Employee:</strong> {r.employeeName} */}
                </p>
                <p>
                  {/* <strong>Asset:</strong> {r.assetName} */}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                //   onClick={() => handleApprove(r.id)}
                  className="text-green-600 hover:text-green-800 transition"
                >
                  <CheckCircle size={24} />
                </button>
                <button
                //   onClick={() => }
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </motion.div>
          {/* ))} handleReject(r.id)*/}
        </AnimatePresence>
        {/* {requests.length === 0 && ( */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            No pending requests
          </motion.p>
        {/* )} */}
      </div>
    </>
  );
};

export default EmployeeManagement;