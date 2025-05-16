import SideBar from '@/components/SideBar'
import TopBar from '@/components/TopBar'
import type { Metadata } from 'next'

import '../globals.css'


export const metadata: Metadata = {
  title: 'Clush Sports Dashboard',
  description: 'Created by Websouls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="poppins">
        <div className="wrapper w-full relative">
          <SideBar />
          <div className="w-[85%] ml-[15%] relative">
            <TopBar />
            <main className="grid grid-cols-1 lg:grid-cols-2 p-5 mt-[82px]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
