import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"
export const getSubCategoryProduct = () => {
    return (
        useQuery({
            queryKey: ["subCategory"],
            queryFn: async () => {
                try {
                    const res = await request.get("/api/subcategory/");
                    if (!res.data || !Array.isArray(res.data.results)) {
                        throw new Error("Invalide res data")
                    }
                    const SubCategori = res.data.results.map((subcategory: any) => ({
                        id: subcategory.id,
                        image: subcategory.image,
                        title: subcategory.title
                    }))
                    return SubCategori
                } catch (error) {
                    console.error("Error fetching subcategories", error);
                    throw new Error("Error fetching subcategories")
                }
            }

        })
    )
}
