import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const getUseSub = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: () => request.get("/category/").then((res) => res.data),
    });
};