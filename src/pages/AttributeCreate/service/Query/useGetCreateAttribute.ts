import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

interface Category {
    id: number;
    name: string;
}

export const useGetCreateAttribute = () => {
    return useQuery<Category[], Error>({
        queryKey: ["attribute"],
        queryFn: () => request.get("/attribute/").then((res) => res.data),
    });
};