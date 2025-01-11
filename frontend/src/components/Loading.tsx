import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center dark:bg-black">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
    );
};
export default Loading;
