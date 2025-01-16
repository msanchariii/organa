import { Button } from "@/components/ui/button";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <>
            <div>register page</div>
            <Button asChild>
                <Link href="/register/hospital">Create New Hospital</Link>
            </Button>
            <Button asChild>
                <Link href="/register/staff">Create New Staff</Link>
            </Button>
        </>
    );
};
export default RegisterPage;
