// src/components/Footer.tsx
'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t px-6 py-4 text-center text-sm text-gray-600 mt-auto">
      Developed by{" "}
      <a
        href="https://theahmedportfolio.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Ahmed
      </a>
    </footer>
  );
}
