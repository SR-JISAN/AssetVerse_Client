import { useQuery } from '@tanstack/react-query';
import React, {  useContext, useState } from 'react';
import useAxiosUrl from '../../hooks/useAxiosUrl';
import { AuthContext } from '../../Context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';

const MyAssets = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosUrl()

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    const {
      data: assets = [],
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["my-assets", user?.email, search, type],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/my-assets/${user.email}?search=${search}&type=${type}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });
    if(isLoading){
        return<Loading></Loading>
    }

const handleReturn = async (id) => {
  await axiosSecure.patch(`/return-asset/${id}`);
  Swal.fire("Success", "Asset returned successfully", "success");

  refetch(); 
};
   const containerVariants = {
     hidden: { opacity: 0 },
     show: {
       opacity: 1,
       transition: { staggerChildren: 0.08 },
     },
   };

   const rowVariants = {
     hidden: { opacity: 0, y: 10 },
     show: { opacity: 1, y: 0 },
     exit: { opacity: 0, y: -10 },
   };

   const controlVariants = {
     hidden: { opacity: 0, y: -10 },
     show: { opacity: 1, y: 0 },
   };

    return (
      <div>
        <motion.div
          className="flex gap-4 mb-4"
          variants={controlVariants}
          initial="hidden"
          animate="show"
        >
          <input
            type="text"
            placeholder="Search asset name"
            className="input input-bordered"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="btn btn-outline"
          >
            Print
          </motion.button>
        </motion.div>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {assets.map((asset) => (
                <motion.tr
                  key={asset._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                >
                  <td>
                    <img src={asset.assetImage} className="w-12 h-12 rounded" />
                  </td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.companyName}</td>
                  <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                  <td>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`badge ${
                        asset.status === "returned"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {asset.status}
                    </motion.span>
                  </td>
                  <td>
                    {asset.status === "assigned" &&
                      asset.assetType === "Returnable" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReturn(asset._id)}
                          className="btn btn-sm btn-warning"
                        >
                          Return
                        </motion.button>
                      )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    );
};

export default MyAssets;