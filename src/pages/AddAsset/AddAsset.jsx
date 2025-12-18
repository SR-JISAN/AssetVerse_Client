import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

const AddAsset = ({ onClose, onAdd }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const imgbbApiKey = import.meta.env.VITE_IMAGE_key; // replace with your key

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 1️⃣ Upload Image to ImgBB
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const imageUrl = res.data.data.url;

      // 2️⃣ Create Asset Object
      const newAsset = {
        id: Date.now().toString(),
        name: data.name,
        type: data.type,
        quantity: data.quantity,
        image: imageUrl,
        dateAdded: new Date().toISOString().split("T")[0],
      };

      // 3️⃣ Send to parent (or API)
      onAdd(newAsset);

      reset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image or add asset");
    } finally {
      setLoading(false);
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
          className="bg-blue-950 text-white rounded-2xl p-6 w-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold mb-4">Add Asset</h2>

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
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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