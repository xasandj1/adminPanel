import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"

export const getSubId = (id: number | string) => {
    return (
        useQuery({
            queryKey: ["subid", id],
            queryFn: () => (
                request.get(`/category/${id}/`).then((res) => res.data)
            )
        })
    )
}
