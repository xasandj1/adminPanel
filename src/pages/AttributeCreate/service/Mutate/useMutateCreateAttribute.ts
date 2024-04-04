import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface AttributeType {
    attribute_id: number | null;
    attributes: {
        title: string[];
        value: {
            value: string;
            value_id: null
        }[];
    }[];
    category_id: number | null
}

export const useMutateCreateAttribute = () => {
    return useMutation({
        mutationFn: (data: AttributeType) =>
            request
                .post<AttributeType>("/attribute/", data)
                .then((res) => res.data),
    });
};
