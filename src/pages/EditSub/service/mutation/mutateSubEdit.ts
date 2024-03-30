import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FormTypes } from "../../../Create";

export const mutateSubEdit = (id: number) => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .put<FormTypes>(`/category/${id}/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};