import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientRoot from "./client-root";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title:
    "Dynamic SVG Funnel Visualization | Gradient Configurable & Responsive",
  description:
    "A highly customizable SVG-based funnel chart with dynamic Bézier shaping, responsive layout, and pastel gradient configuration. Built with Next.js, Tailwind CSS, and optimized for demo use.",
  keywords: [
    "Funnel Chart",
    "SVG Funnel",
    "Gradient Funnel",
    "React Chart",
    "Next.js Visualization",
    "Bézier Chart",
    "Responsive Funnel Design",
    "Vaibhav Somani",
    "Vaibhav Somani Portfolio",
    "Vaibhav Somani Projects",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title:
      "Dynamic SVG Funnel Visualization | Gradient Configurable & Responsive",
    description:
      "An SVG funnel component with pastel gradients, Bézier curves, and flexible configuration — built using Next.js and Tailwind CSS.",
    url: "https://stage-flow-funnel.vercel.app/",
    siteName: "Vaibhav Somani Projects | Stage Flow Funnel",
    type: "website",
    images: [
      {
        url: "/stage-flow-funnel.jpg",
        width: 1200,
        height: 630,
        alt: "SVG Funnel Chart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dynamic SVG Funnel Visualization | Gradient Configurable & Responsive",
    description:
      "Explore a beautiful SVG funnel chart with gradient configs and responsive layout, built by Vaibhav Somani.",
    images: ["/stage-flow-funnel.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${plusJakarta.className} antialiased`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
