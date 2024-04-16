import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface ProductType {
    id: number;
    title: string;
    image: string;
}

interface ProductListType {
    count: number;
    next: number | null;
    previous: number | null;
    results: ProductType[];
}

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => request.get<ProductListType>("/product/").then((res) => {
            const { results } = res.data;
            const dataSource = results.map((product) => ({
                key: product.id.toString(),
                id: product.id,
                title: product.title,
                image: product.image,
            }));
            return dataSource;
        })
    });
};