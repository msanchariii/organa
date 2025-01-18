import { create } from "zustand";

type user = {
    email: string | "";
    staffId: string | "";
    hospitalName: string | "";
    notifications: [];
};

const useAuth = create((set) => ({
    user: {
        email: "",
        staffId: "",
        hospitalName: "",
        accessToken: "",
        notification: [],
    },
    isLoggedIn: false, // Authentication status

    // Action to log in a user
    login: (userData: user) =>
        set({
            user: userData,
            isLoggedIn: true,
        }),

    // Action to log out a user
    logout: () =>
        set({
            user: {
                email: "",
                staffId: "",
                hospitalName: "",
                accessToken: "",
            },
            isLoggedIn: false,
        }),

    addNotification: (notification: any) =>
        set((state) => ({
            user: {
                ...state.user,
                notifications: [...state.user.notifications, notification],
            },
        })),
}));

export default useAuth;
