import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

interface CategoryData {
    id: number;
    name: string;
}

export const getUseSub = () => {
    return useQuery<CategoryData[], Error>({
        queryKey: ["category"],
        queryFn: () => request.get("/category/").then((res) => res.data),
    });
};
