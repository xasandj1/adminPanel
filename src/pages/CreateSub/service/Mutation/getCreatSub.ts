import { useMutation } from "@tanstack/react-query";
import { FormTypes } from "../../CreateSub";
import { request } from "../../../../config/request";
export const useMutateSub = () => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .post<FormTypes>(`/category/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};