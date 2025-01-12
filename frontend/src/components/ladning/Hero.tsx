import { Terminal } from "lucide-react";
import ShinyButton from "./shiny-button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const Hero = () => {
    return (
        <div className="mb-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-black sm:px-6 lg:px-8">
            <div className="mx-4 mb-20 transition-all duration-300 ease-in-out hover:shadow-md">
                <Alert
                    className="overflow-hidden font-mono hover:shadow-md"
                    variant="destructive"
                >
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        Your blood donation can save a life and help others
                    </AlertDescription>
                </Alert>
            </div>

            <ShinyButton text="Log In" className="font-bold shadow-md" />

            <h1 className="mb-4 mt-3 max-w-4xl text-center text-5xl font-bold sm:mb-5 md:text-6xl lg:text-6xl">
                Save Life
                <span className="block text-red-800 sm:ml-3 sm:inline">
                    Donate Organ
                </span>
            </h1>
            <p className="mb-6 max-w-2xl text-center text-sm font-normal sm:text-base lg:text-lg">
                Donate blood to save lives. Your blood donation can save a life
                and help others to live a better life and make a better future
                for their families.
            </p>
        </div>
    );
};
export default Hero;
