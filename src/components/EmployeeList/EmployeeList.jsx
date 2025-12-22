import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const EmployeeList = ({ companyName, maxEmployees }) => {
  const queryClient = useQueryClient();

  // Fetch employees
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees", companyName],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/employees/${companyName}`
      );
      return res.data;
    },
  });

  // Remove employee mutation
  const removeMutation = useMutation({
    mutationFn: async (email) => {
      return await axios.delete(`http://localhost:5000/employees/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", companyName] });
      Swal.fire({
        icon: "success",
        title: "Removed!",
        timer: 1200,
        showConfirmButton: false,
      });
    },
  });

  const handleRemove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This employee will be removed from the team.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(email);
      }
    });
  };

  if (isLoading) return <p>Loading employees...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-base-100 shadow rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">
        Employees ({employees.length}/{maxEmployees})
      </h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Join Date</th>
            <th className="p-2">Assets</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-b">
              <td className="p-2">
                <img
                  src={emp.photo || "https://via.placeholder.com/40"}
                  alt={emp.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">
                {new Date(emp.joinDate).toLocaleDateString()}
              </td>
              <td className="p-2">{emp.assetsCount}</td>
              <td className="p-2">
                <button
                  className="btn btn-sm btn-error flex items-center gap-1"
                  onClick={() => handleRemove(emp.email)}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default EmployeeList;
