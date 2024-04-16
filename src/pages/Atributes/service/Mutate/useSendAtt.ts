import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

import { Payload } from "../../components/AttributeCreate";

export const usePostAtt = () => {
    return useMutation({
        mutationFn: (data: Payload) =>
            request
                .post("/attribute/", data)
                .then((res) => res.data),
    });
};
