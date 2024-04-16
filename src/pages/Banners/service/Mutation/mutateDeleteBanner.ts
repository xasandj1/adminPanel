import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const mutateDeleteBanner = () => {
    return useMutation({
        mutationFn: (id: number) =>
            request.delete(`/banner/${id}/`).then((res) => res.data),
    });
};