import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"

export const useGetBannerId = (id: number | string) => {
    return (
        useQuery({
            queryKey: ["id", id],
            queryFn: () => request.get(`/banner/${id}/`).then((res) => res.data)
        })
    )
}
