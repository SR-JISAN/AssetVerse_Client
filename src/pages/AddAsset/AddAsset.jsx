import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import useUserByEmail from "../../hooks/useUserByEmail";
import Loading from "../Loading/Loading";
import useAxiosUrl from "../../hooks/useAxiosUrl";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const AddAsset = () => {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosUrl = useAxiosUrl();
  const { data: users, isLoading } = useUserByEmail(user?.email) || "";
  if (isLoading) {
    return <Loading></Loading>;
  }

  const imgbbApiKey = import.meta.env.VITE_IMAGE_KEY; 

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const compressedFile = await imageCompression(data.image[0], {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("image", compressedFile);

     const res = await axios.post(`https://api.imgbb.com/1/upload`, formData, {
       params: { key: imgbbApiKey },
       headers: { "Content-Type": "multipart/form-data" },
       onUploadProgress: (progressEvent) => {
         const percentCompleted = Math.round(
           (progressEvent.loaded * 100) / progressEvent.total
         );
         setProgress(percentCompleted);
        
         },
     });
      

      const newAsset = {
        productName: data.name,
        productType: data.type,
        availableQuantity: data.quantity,
        productImage: res.data.data.url,
        dateAdded: new Date().toISOString().split("T")[0],
        hrEmail: user?.email,
        companyName: users?.companyName,
      };

      if (users?.role !== "HR-Manager") {
        Swal.fire("Access Denied", "Only HR can add assets", "error");
        return;
      }

      const addAssets = await axiosUrl.post("/assets", newAsset);

      if (addAssets.data.acknowledged) {
        Swal.fire("Success", "Asset added successfully!", "success");
        reset();
        setProgress(0)
      } else {
        Swal.fire("Error", "Asset not added", "error");
      }
    } catch (err) {
      if(err){

        Swal.fire("Error", "Something went wrong", "error");
      }
      
    } finally {
      setLoading(false); // 🔥 ALWAYS runs
    }
  };

  return (
    <div className="mw">
      <motion.div
        className=" my-16  inset-0 w-full bg-opacity-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className=" bg-linear-to-r from-blue-950 to-blue-600 text-white rounded-2xl p-6 w-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-3xl text-center font-semibold mb-4">Add Asset</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block mb-1 font-medium">Product Image</label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full"
                accept="image/*"
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block mb-1 font-medium">Product Type</label>
              <select
                {...register("type", { required: true })}
                className="w-full border  rounded px-3 py-2"
              >
                <option className="text-blue-950" value="">
                  Select type
                </option>
                <option className="text-blue-950" value="Returnable">
                  Returnable
                </option>
                <option className="text-blue-950" value="Non-returnable">
                  Non-returnable
                </option>
              </select>
            </div>

            {/* Product Quantity */}
            <div>
              <label className="block mb-1 font-medium">Product Quantity</label>
              <input
                type="number"
                {...register("quantity", { required: true, min: 1 })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            {loading && (
              <div className="w-full bg-white rounded h-4 mt-2">
                <div
                  className="bg-green-500 h-4 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            {loading && <p className="text-center mt-1">{progress}%</p>}
            <button
              type="submit"
              className="w-full bg-white text-blue-600 py-2 rounded-lg 
              hover:bg-linear-to-r from-black to-blue-950 font-bold shadow-lg hover:text-white transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Asset"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddAsset;
