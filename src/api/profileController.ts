import { type profileForm } from "../schemas/profileSchema";
import { type ApiResponse } from "../schemas/apiResponse";
import {store }from "../stateStore/store"
let userdata : profileForm | null = null

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

 const profileController = {
    
        getInfo: async (): Promise<ApiResponse<profileForm>> => {
            await delay();
            if(userdata) {
                return Promise.resolve({
                    status: "success",
                    message: "Profile fetched successfully",
                    data: userdata,
                })
            }
            else {
                return {
                    status: "error",
                    message: "Error fetching Profile",
                    data: null,
                }
            }

        },

        createProfile: async (profileData: profileForm): Promise<ApiResponse<profileForm>> => {
            await delay();
            const cachedData = localStorage.getItem("profileData");
            let parsedData: profileForm | null = null;
            parsedData = cachedData ? JSON.parse(cachedData) as profileForm : null;
            const check1 = (JSON.stringify(parsedData) === JSON.stringify(profileData));
            const check2 = JSON.stringify(store.getState().profile) === JSON.stringify(profileData);
            if(check1 || check2) {
                return {
                    status: "error",
                    message: "Profile already exists.",
                    data: null
                };
            }
            else {
                userdata = profileData;
                return Promise.resolve({
                status: "success",
                message: "Profile created successfully.",
                data: profileData,
            });
            }
            
        },
        

        updateProfile: async(profileData: profileForm): Promise<ApiResponse<profileForm>> => {
            await delay();
            if(!profileData) {
                return {
                    status: "error",
                    message: "Profile to update not found.",
                    data: null
                };
            }
            userdata = { ...userdata, ...profileData};
            return Promise.resolve({
                status: "success",
                message: "Profile updated successfully.",
                data: userdata,
            });
        },

        deleteProfile: async (profileData: profileForm): Promise<ApiResponse<profileForm>> => {
            await delay();

            if(!profileData) {
                return {
                    status: "error",
                    message: "Profile not found",
                    data: null
                }
            }
            userdata = null;
            return Promise.resolve({
                status: "success",
                "message": "Profile deleted successfully",
                data: null
            });
        },
};

export default profileController;