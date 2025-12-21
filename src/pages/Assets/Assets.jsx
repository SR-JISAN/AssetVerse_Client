import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosUrl from '../../hooks/useAxiosUrl';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Loading from '../Loading/Loading';
import AssetsRequest from '../AssetsRequest/AssetsRequest';


const Assets = () => {
     const [selectedAsset, setSelectedAsset] = useState(null);
   const axiosUrl = useAxiosUrl()
    const {
      data: assets = [],
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["assets"],
      queryFn: async () => {
        const res = await axiosUrl.get("/assets");
        return res.data;
      },
    });
   
    if (isLoading) return <Loading></Loading>;
    if (isError) return <p>Error loading assets</p>;
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 mw gap-6">
          {assets.map((asset) => (
            <motion.div
              key={asset._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Image */}
              <motion.img
                src={asset.productImage}
                alt={asset.productName}
                className="h-40 w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />

              {/* Content */}
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold text-blue-800">
                  {asset.productName}
                </h2>

                <h2 className="text-lg">Brand: {asset.companyName}</h2>
                <p className="text-sm text-gray-500">
                  Type: {asset.productType}
                </p>

                <p className="text-sm font-medium">
                  Available:{" "}
                  <span className="text-green-600">
                    {asset.availableQuantity === 0 ? (
                      <span className="text-red-600">Out Of Stock</span>
                    ) : (
                      asset.availableQuantity
                    )}
                  </span>
                </p>
                {asset.availableQuantity === 0 ? (
                  ""
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary w-full mt-3"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    Request Asset
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        {selectedAsset && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Request: {selectedAsset.productName}
              </h3>

              <AssetsRequest selectedAsset={selectedAsset}></AssetsRequest>

              <div className="modal-action">
                <button className="btn" onClick={() => setSelectedAsset(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    );
};

export default Assets;