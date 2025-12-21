import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosUrl from '../../hooks/useAxiosUrl';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';


const AssetList = () => {
   const { register, control } = useForm({
      defaultValues: {
        search: "",
      },
    });

     const searchAssets = useWatch({
        control,
        name: "search",
      }).toLowerCase();
      
      const axiosUrl = useAxiosUrl()
     
      const queryClient = useQueryClient();

      const deleteMutation = useMutation({
        mutationFn: async (id) => {
          await axiosUrl.delete(`/assets/${id}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["assets"] });
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Asset has been deleted.",
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


    const { data: assetsData = [], isLoading } = useQuery({
      queryKey: ["assets"],
      queryFn: async () => {
        const res = await axiosUrl.get("/assets");
        return res.data;
      },
    });
  
    if (isLoading) {
      return <Loading></Loading>;
    }

    const filteredAssets = assetsData.filter(
      (asset) =>
        asset.productName.toLowerCase().includes(searchAssets) ||
        asset.productType.toLowerCase().includes(searchAssets)
    );

     

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
  
 const handleAssign = async (asset) => {
   const result = await Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, Assign!",
   });

   if (!result.isConfirmed) return;

   if (!asset._id) {
     Swal.fire({
       icon: "error",
       title: "Error",
       text: "Asset ID missing!",
     });
     return;
   }

   const assignedAssetData = {
     assetId: asset._id,
     employeeEmail: "employee@email.com",
     employeeName: "Employee Name",
     hrEmail: asset.hrEmail,
     companyName: asset.companyName,
   };

   try {
     await assignedAssetsMutation.mutateAsync(assignedAssetData);
   } catch (error) {
     console.error("Assign failed:", error);
   }
   console.log("Assigning asset:", {
     assetId: asset._id,
     employeeEmail: "employee@email.com",
     employeeName: "Employee Name",
     hrEmail: asset.hrEmail,
     companyName: asset.companyName,
   });
 };



    return (
      <div>
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Asset List</h2>

            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                {...register("search")}
                placeholder="Search assets..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="p-3">Asset</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Date Added</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.map((asset) => (
                  <motion.tr
                    key={asset._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <img
                        src={asset?.productImage}
                        alt={asset.productName}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium">{asset.productName}</td>
                    <td className="p-3">{asset.productType}</td>
                    <td className="p-3">{asset.availableQuantity}</td>
                    <td className="p-3">
                      {new Date(asset.dateAdded).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button
                          disabled={
                            asset.availableQuantity === 0 ||
                            assignedAssetsMutation.isPending
                          }
                          onClick={() => handleAssign(asset)}
                          className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                        >
                          {assignedAssetsMutation.isPending
                            ? "Assigning..."
                            : "Assign"}
                        </button>

                        <button className="text-blue-600 hover:text-blue-800">
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(asset._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredAssets.length === 0 && (
              <p className="text-center py-6 text-gray-500">No assets found</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default AssetList;