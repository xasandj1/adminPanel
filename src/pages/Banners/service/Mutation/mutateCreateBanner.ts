import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
export const mutateCreateBanner = () => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .post("/banner/", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};
