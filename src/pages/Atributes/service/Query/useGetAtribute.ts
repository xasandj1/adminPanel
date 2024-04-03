import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"

export const useGetAtribute = () => {
    return (
        useQuery({
            queryKey: ["attribute"],
            queryFn: () => request.get("/attribute/").then((res) => res.data)
        })
    )
}
