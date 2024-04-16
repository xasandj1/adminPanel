import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FormTypes } from "../../../Create";

export const mutateEditBanner = (id: number | string) => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .put<FormTypes>(`/banner/${id}/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};
