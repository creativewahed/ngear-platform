export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>NGEAR Platform</title>
        <meta name="description" content="Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}