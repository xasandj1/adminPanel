import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"

export const useGetBrand = (id: number) => {
    return (
        useQuery({
            queryKey: ["brandid", id],
            queryFn: () => (
                request.get(`/brand/${id}/`).then((res) => res.data)
            )
        })
    )
}
