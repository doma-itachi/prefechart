import type { Metadata } from "next";
import { Geist, Geist_Mono, M_PLUS_2 } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

const MPlus2 = M_PLUS_2({
    subsets: ["latin"]
});
export const metadata: Metadata = {
    title: "Prefchart",
    description: "都道府県の人口構成のチャート",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${MPlus2.className} antialiased`}>
                <header>
                    <div className="text-3xl m-4">
                        <span className="font-bold">Pref</span>
                        chart
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}
