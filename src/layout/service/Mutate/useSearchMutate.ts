import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useSearch = (text: string | undefined) => {
    return useQuery({
        queryKey: ["get-search", text],
        queryFn: () => request.get(`/category/?search=${text}`).then((res) => res.data)

    });
};