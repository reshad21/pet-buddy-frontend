/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUserProfile } from "@/app/(withCommonLayout)/(user)/profile/settings/page";
import { updateProfile } from "@/services/UpdateProfile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Define a type for the mutation variables
type ProfileUpdateVariables = {
    profileUpdateData: TUserProfile;
    postId: string;
};

export const useUpdateProfileDetails = () => {
    return useMutation<any, Error, ProfileUpdateVariables>({
        mutationKey: ["UPDATE_PROFILE"],
        mutationFn: async ({ profileUpdateData, postId }) =>
            await updateProfile(profileUpdateData, postId), // Ensure postId is passed correctly
        onSuccess: () => {
            toast.success("Profile details updated successfully."); // Updated message for clarity
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
