import { Navbar } from "@/components/ui/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <main className="pt-24 px-4 pb-12">
                {children}
            </main>
        </div>
    );
}
