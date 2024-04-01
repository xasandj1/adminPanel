import { useMutation } from "@tanstack/react-query";
import { FormTypes } from "../../../Create/Create";
import { request } from "../../../../config/request";

export const useMutateBrands = () => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .post<FormTypes>("/brand/", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};

