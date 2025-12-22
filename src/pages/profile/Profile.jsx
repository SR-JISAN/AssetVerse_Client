import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Mail, Briefcase, Camera, Save } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosUrl from "../../hooks/useAxiosUrl";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const { dbUser } = useContext(AuthContext);
  const axiosUrl = useAxiosUrl();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(""); 
  const [previewPhoto, setPreviewPhoto] = useState(""); 


  const { data: user, isLoading } = useQuery({
    queryKey: ["user", dbUser?.email],
    enabled: !!dbUser?.email,
    queryFn: async () => {
      const res = await axiosUrl.get(`/users/${dbUser.email}`);
      return res.data;
    },
    onSuccess: (data) => {
      setName(data.name || "");
      setPhoto(data.photo || "");
      setPreviewPhoto("");
    },
  });


  const { data: companies = [] } = useQuery({
    queryKey: ["myCompanies", dbUser?.email],
    enabled: !!dbUser?.email,
    queryFn: async () => {
      const res = await axiosUrl.get(`/my-companies/${dbUser.email}`);
      return res.data;
    },
  });


  const updateMutation = useMutation({
    mutationFn: (updatedData) =>
      axiosUrl.patch(`/users/${dbUser.email}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", dbUser.email] });
    },
  });

 
  const imageKey = import.meta.env.VITE_IMAGE_KEY;

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      Swal.fire({
        title: "Uploading image...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error("Image upload failed");

      setPreviewPhoto(data.data.url); // show preview

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {};
    if (name && name.trim() !== "") updatedData.name = name;
    if (previewPhoto) updatedData.photo = previewPhoto;

    if (Object.keys(updatedData).length === 0) {
      Swal.fire({
        icon: "info",
        title: "Nothing to update",
        text: "Please change something before updating",
      });
      return;
    }

    updateMutation.mutate(updatedData, {
      onSuccess: () => {
        if (previewPhoto) setPhoto(previewPhoto); // update current photo
        setPreviewPhoto(""); // clear preview
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          timer: 1500,
          showConfirmButton: false,
        });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Could not update profile",
        });
      },
    });
  };

  if (isLoading) return <p className="text-center">Loading profile...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto p-6 bg-base-100 shadow-lg rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <User /> My Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={previewPhoto || user.photo || photo}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover mb-2"
        />
        <label className="flex items-center gap-2 cursor-pointer text-sm text-primary">
          <Camera size={16} />
          Change Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoUpload}
          />
        </label>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 mb-1">
            <User size={16} /> Name
          </label>
          <input
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-1">
            <Mail size={16} /> Email
          </label>
          <input
            className="input input-bordered w-full bg-gray-100"
            value={user.email}
            readOnly
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-1">
            <Briefcase size={16} /> Position: {dbUser.role}
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full flex gap-2"
          disabled={updateMutation.isPending}
        >
          <Save size={16} />
          {updateMutation.isPending ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Company Affiliations */}
      <h3 className="text-lg font-semibold mt-8 mb-3">Current Affiliations</h3>
      <ul className="space-y-2">
        {companies.map((c, i) => (
          <li key={i} className="flex items-center gap-3">
            <img
              src={c.companyLogo}
              className="w-8 h-8 rounded"
              alt={c.companyName}
            />
            <span>{c.companyName}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Profile;
