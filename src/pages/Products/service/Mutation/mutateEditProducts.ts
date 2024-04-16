import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const mutateEditProducts = (id: string | undefined) => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .put(`/product/${id}/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};
