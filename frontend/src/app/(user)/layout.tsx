import Sidebar from "@/components/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen gap-4">
            <Sidebar></Sidebar>
            <div className="bg-background flex-grow p-4">{children}</div>
        </div>
    );
}
