// src/components/Header.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Company Logo" width={80} height={80} />
      </div>
      <nav className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
        <Link href="/profile" className="text-gray-700 hover:text-black">Profile</Link>
      </nav>
    </header>
  )
}
