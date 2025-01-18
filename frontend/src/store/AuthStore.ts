import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type user = {
    email?: string | "";
    staffId?: string | "";
    hospitalName?: string | "";
    notifications?: [];
    accessToken?: string | "";
};

interface UserState {
    user: user;
    isLoggedIn: boolean;
    login: (userData: user) => void;
    logout: () => void;
    addNotification: (notification: string) => void;
}

const useAuth = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: {
                    email: "",
                    staffId: "",
                    hospitalName: "",
                    accessToken: "",
                    notifications: [],
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

                addNotification: (notification: string) =>
                    set((state) => ({
                        user: {
                            ...state.user,
                            notifications: [
                                ...state.user.notifications,
                                notification,
                            ],
                        },
                    })),
            }),
            {
                name: "user-storage",
            },
        ),
    ),
);

export default useAuth;
