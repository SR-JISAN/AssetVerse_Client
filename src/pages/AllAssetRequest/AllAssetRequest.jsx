import React from 'react';
import useAxiosUrl from '../../hooks/useAxiosUrl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';
import { ChessKing } from 'lucide-react';


const AllAssetRequest = () => {
     const axiosUrl = useAxiosUrl();
      const queryClient = useQueryClient();
       const deleteMutation = useMutation({
         mutationFn: async (id) => {
           await axiosUrl.delete(`/assets-request/${id}`);
         },
         onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ["assets-requests"] });
           Swal.fire({
             icon: "success",
             title: "Deleted!",
             text: "Asset has been Rejected.",
             timer: 1500,
             showConfirmButton: false,
           });
         },
         onError: () => {
           Swal.fire({
             icon: "error",
             title: "Oops...",
             text: "Failed to delete asset!",
           });
         },
       });

    const assignedAssetsMutation = useMutation({
            mutationFn: async (assetsData) => {
             const res = await axiosUrl.post("/assignedAssets", assetsData);
              return res.data;
            },
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["assets"] });
              Swal.fire({
                icon: "success",
                title: "Assigned!",
                text: "Asset has been Assigned.",
                timer: 1500,
                showConfirmButton: false,
              });
            },
            onError: () => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to Assign asset!",
              });
            },
          });
      const updateRequestMutation = useMutation({
         mutationFn: async ({ id, status }) => {
              return axiosUrl.patch(`/assets-request/${id}`, {
                status,
                processedBy: "hr.admin@techwave.com", // later replace with logged-in HR
              });
           },
            onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ["assets-requests"] });
           },
        });
 

      const {
       data: requests = [],
       isLoading,
       isError,
     } = useQuery({
       queryKey: ["assets-requests"],
       queryFn: async () => {
         const res = await axiosUrl.get("/assets-request");
         return res.data;
       },
     });
     
     if (isLoading) return <Loading />;

     if (isError)
       return (
         <p className="text-red-500 text-center my-4">
           Failed to load asset requests.
         </p>
       );

      
       const handleApprove = async (req) => {
         const result = await Swal.fire({
           title: "Approve this request?",
           icon: "warning",
           showCancelButton: true,
           confirmButtonText: "Yes, Approve!",
         });

         if (!result.isConfirmed) return;

         if (!req.assetId) {
           Swal.fire({
             icon: "error",
             title: "Error",
             text: "Asset ID missing in request!",
           });
           return;
         }

         const assignedAssetData = {
           assetId: req.assetId,
           employeeEmail: req.requesterEmail,
           employeeName: req.requesterName,
           hrEmail: req.hrEmail,
           companyName: req.companyName,
         };

         try {
           // 1️⃣ Assign asset
           await assignedAssetsMutation.mutateAsync(assignedAssetData);

           // 2️⃣ Update request status
           await updateRequestMutation.mutateAsync({
             id: req._id,
             status: "approved",
           });

           Swal.fire({
             icon: "success",
             title: "Approved!",
             text: "Asset assigned & request approved.",
             timer: 1500,
             showConfirmButton: false,
           });
         } catch (error) {
           console.error("Approve failed:", error);
           Swal.fire({
             icon: "error",
             title: "Error",
             text: "Failed to approve request",
           });
         }
       };


       const handleDelete = async (id) => {
              const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              });
       
              if (result.isConfirmed) {
                try {
                  await deleteMutation.mutateAsync(id); 
                } catch (err) {
                  console.error(err);
                }
              }
            };
       const rowVariants = {
         hidden: { opacity: 0, y: 10 },
         visible: { opacity: 1, y: 0 },
       };

    return (
      <div className="overflow-x-auto mw py-10">
        <h1 className="text-center text-2xl font bold my-3">All Assets Requests</h1>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Asset</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No requests found
                </td>
              </tr>
            )}

            {requests.map((req, index) => (
              <motion.tr
                key={req._id}
                className="text-center border border-gray-200"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <td className="p-2">{req.requesterName}</td>
                <td className="p-2">{req.assetName}</td>
                <td className="p-2">
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>

                {req.requestStatus === "approved" && (
                  <td className="bg-green-500 px-2 py-1 rounded text-white">
                    {req.requestStatus}
                  </td>
                )}
                {req.requestStatus === "pending" && (
                  <td className="bg-amber-500 px-2 py-1 rounded text-white">
                    {req.requestStatus}
                  </td>
                )}

                
                <td className="p-2">
                  {req.requestStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(req)}
                        className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {req.requestStatus === "approved" && (
                    <span className="bg-green-500 px-2 py-1 rounded text-white">
                      Assigned
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default AllAssetRequest;