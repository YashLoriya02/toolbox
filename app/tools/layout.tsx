import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative p-3 bg-gray-900">
            <Link href={'/'}>
                <ArrowLeft className="h-8 w-8 " />
            </Link>
            {children}
        </div>
    );
}