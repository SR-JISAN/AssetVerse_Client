
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosUrl from '../../hooks/useAxiosUrl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AssetsRequest = ({ selectedAsset }) => {
    const {dbUser}=useContext(AuthContext)
    const axiosUrl = useAxiosUrl();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        requesterName: dbUser?.name || "",
        requesterEmail: dbUser?.email || "",
        note: "",
      },
    });
  
    const requestMutation = useMutation({
      mutationFn: async (requestData) => {
        const res = await axiosUrl.post("/assets-request", requestData);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["assets-requests"] });
        Swal.fire({
          icon: "success",
          title: "Requested!",
          text: "Your asset request has been sent.",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      },
      onError: (err) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err.response?.data?.message || "Request failed",
        });
      },
    });

    const onSubmit = (data) => {
      if (!selectedAsset?._id) {
        Swal.fire({
          icon: "error",
          title: "No Asset Selected",
          text: "Please select an asset to request.",
        });
        return;
      }

      const requestAssets = {
        assetId: selectedAsset._id,
        assetName: selectedAsset.productName,
        assetType: selectedAsset.productType,
        requesterName: data.requesterName,
        requesterEmail: data.requesterEmail,

        hrEmail: selectedAsset.hrEmail,
        companyName: selectedAsset.companyName,
        requestDate: new Date(),
        approvalDate: null,
        requestStatus: "pending",
        note: data.note || "",
        processedBy: "", // filled when HR processes
      };

      requestMutation.mutate(requestAssets);
    };
  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Request Asset</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              {...register("requesterName", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Email</label>
            <input
              {...register("requesterEmail", { required: true })}
              type="email"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Note (optional)</label>
            <textarea
              {...register("note")}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={requestMutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {requestMutation.isPending ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AssetsRequest;