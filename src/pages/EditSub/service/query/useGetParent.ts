import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetParent = (id: number | string) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () =>
            request.get(`/category/${id}/`).then((res) => res.data),
    });
};
