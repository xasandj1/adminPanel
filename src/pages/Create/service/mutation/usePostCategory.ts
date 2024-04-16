import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FormTypes } from "../../CreateCategory";
export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<FormTypes>("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
