import { create } from "zustand";

type user = {
    email: string | "";
    staffId: string | "";
    hospitalName: string | "";
};

const useAuth = create((set) => ({
    user: {
        email: "",
        staffId: "",
        hospitalName: "",
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
            },
            isLoggedIn: false,
        }),
}));

export default useAuth;
