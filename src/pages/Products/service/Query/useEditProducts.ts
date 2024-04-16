import { request } from "../../../../config/request"; 
import { useQuery } from "@tanstack/react-query";

export const useEditProducts = (id: number | string) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () =>
            request.get(`/product/${id}/`).then((res) => res.data),
    });
};