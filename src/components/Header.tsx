'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Company Logo" width={80} height={80} />
      </Link>

      <nav className="space-x-4">
        <Link href="/signup" className="text-gray-700 hover:text-black">Sign up</Link>
        <Link href="/login" className="text-gray-700 hover:text-black">Login</Link>
      </nav>
    </header>
  )
}
