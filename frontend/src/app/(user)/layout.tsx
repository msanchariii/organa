import Sidebar from "@/components/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            <Sidebar></Sidebar>
            {children}
        </div>
    );
}
