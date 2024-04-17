import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useMutateBrandsId = (id: number | string) => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .put(`/brand/${id}/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};