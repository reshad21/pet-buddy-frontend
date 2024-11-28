import { getAllPost } from "@/services/Post";
import { IPost } from "@/types"; // Import the IPost type for better type safety
import { useQuery } from "@tanstack/react-query";

// Define the response type for the query
interface IPostResponse {
    data: IPost[]; // Assuming that the response contains an array of posts
    totalCount: number; // Assuming there is a total count (for pagination)
}

export const useGetAllPost = (page: number = 1) => {
    return useQuery<IPostResponse, Error>({
        queryKey: ["POST_TAG", page], // Use page as part of the queryKey for pagination
        queryFn: async () => await getAllPost(page), // Make sure this function returns data of type IPostResponse
    });
};
