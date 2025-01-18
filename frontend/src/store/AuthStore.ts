import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
    email?: string;
    staffId?: string;
    hospitalName?: string;
    notifications?: string[];
    accessToken?: string;
};

interface UserState {
    user?: User;
    isLoggedIn: boolean;
    login: (userData: User) => void;
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
                login: (userData: User) =>
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
                            notifications: [],
                        },
                        isLoggedIn: false,
                    }),

                // Action to add a notification
                addNotification: (notification: string) =>
                    set((state) => ({
                        user: {
                            ...state.user,
                            notifications: [
                                ...(state.user?.notifications || []),
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
