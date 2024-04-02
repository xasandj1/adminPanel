import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FormTypes } from "../../../Create";

export const useMutateBrandsId = (id: number) => {
    return useMutation({
        mutationFn: (data: FormTypes) =>
            request
                .put<FormTypes>(`/brand/${id}/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};