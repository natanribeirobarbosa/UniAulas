export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import "@/app/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
