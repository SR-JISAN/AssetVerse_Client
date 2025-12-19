import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosUrl from "../hooks/useAxiosUrl";

const useUserByEmail = (email) => {
    const axiosUrl = useAxiosUrl();
    return useQuery({
      queryKey: ["user", email],
      enabled: !!email,
      queryFn: async () => {
        const res = await axiosUrl.get(`/users/${email}`);
        return res.data;
      },
    });
};

export default useUserByEmail;