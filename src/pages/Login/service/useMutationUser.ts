import { useMutation } from "@tanstack/react-query"
import { request } from "../../../config/request"

export const useMutationUser = () => {
    return useMutation({
        mutationKey: ["user"],
        mutationFn: (data) => request.post("/api/admin-login", data)
    })

}
