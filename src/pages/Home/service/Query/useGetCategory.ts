import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CategoryType {
    id: number;
    title: string;
    image: string;
}

interface CategoryListType {
    count: number;
    next: number | null;
    previous: number | null;
    results: CategoryType[];
}

export const useGetCategory = () => {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => request.get<CategoryListType>("/category/").then((res) => {
            const { results } = res.data;
            const dataSource = results.map((category) => ({
                key: category.id.toString(),
                id: category.id,
                title: category.title,
                image: category.image,
            }));
            return dataSource;
        })
    });
};