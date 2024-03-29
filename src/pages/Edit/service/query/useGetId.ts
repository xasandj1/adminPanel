import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"

export const useGetId = (id: number) => {
    return (
        useQuery({
            queryKey: ["id", id],
            queryFn: () => request.get(`/category/${id}/`).then((res) => res.data)
        })
    )
}
