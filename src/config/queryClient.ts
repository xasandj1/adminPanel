import { QueryClient } from "@tanstack/react-query";


export const ClientQuery = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
})