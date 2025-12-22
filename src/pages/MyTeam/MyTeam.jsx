import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';

import { AuthContext } from '../../Context/AuthContext';
import Loading from '../Loading/Loading';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import useAxiosUrl from '../../hooks/useAxiosUrl';

const MyTeam = () => {
    const {dbUser}=useContext(AuthContext)
   const axiosUrl =useAxiosUrl()
    const { data: companies = [] } = useQuery({
      queryKey: ["my-companies", dbUser?.email],
      queryFn: async () => {
        const res = await axiosUrl.get(`/my-companies/${dbUser?.email}`);
        return res.data;
      },
      enabled: !!dbUser?.email,
    });
    
    const [selectedCompany, setSelectedCompany] = useState("");
    const { data: team = [], isLoading } = useQuery({
      queryKey: ["team", selectedCompany],
      queryFn: async () => {
        const res = await axiosUrl.get(`/team/${selectedCompany}`);
        return res.data;
      },
      enabled: !!selectedCompany,
    });
   console.log(team)
    const { data: birthdays = [] } = useQuery({
      queryKey: ["birthdays", selectedCompany],
      queryFn: async () => {
        const res = await axiosUrl.get(
          `/upcoming-birthdays/${selectedCompany}`
        );
        return res.data;
      },
      enabled: !!selectedCompany,
    });
    if(isLoading){
        return<Loading></Loading>
    }
   const fadeUp = {
     hidden: { opacity: 0, y: 20 },
     show: { opacity: 1, y: 0 },
   };

   const staggerContainer = {
     hidden: { opacity: 0 },
     show: {
       opacity: 1,
       transition: { staggerChildren: 0.1 },
     },
   };
   if (!dbUser?.email) return <Loading />;
console.log(team);
    return (
      <>
        {/* Company Select */}
        <motion.select
          className="select select-bordered mb-6"
          onChange={(e) => setSelectedCompany(e.target.value)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <option value="">Select Company</option>
          {companies.map((c, i) => (
            <option key={i} value={c.companyName}>
              {c.companyName}
            </option>
          ))}
        </motion.select>

        {/* Team Members */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {team.map((member) => (
              <motion.div
                key={member.email}
                variants={fadeUp}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-100 shadow-md"
              >
                <div className="card-body items-center text-center">
                  <img
                    src={member.companyLogo}
                    className="w-20 h-20 rounded-full"
                  />
                  <h2 className="font-semibold">{member.employeeName}</h2>
                  <p className="text-sm">{member.position}</p>
                  <p className="text-xs text-gray-500">
                    {member.employeeEmail}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Upcoming Birthdays */}
        <motion.h3
          className="text-xl font-semibold mt-10 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          🎉 Upcoming Birthdays
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {birthdays.map((user) => (
              <motion.div
                key={user.email}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-base-200 rounded text-center"
              >
                <img
                  src={user.photo}
                  className="w-14 h-14 rounded-full mx-auto"
                />
                <p className="font-medium">{user.name}</p>
                <p className="text-sm">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </>
    );
};

export default MyTeam;