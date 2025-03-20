'use client'

import { AlertOctagon } from 'lucide-react'
import Link from 'next/link'

import paths from '@/constants/paths'

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-222px)] text-center px-4">
      <AlertOctagon className="w-16 h-16 text-red-500" />
      <h1 className="text-4xl font-bold mt-4">Something went wrong</h1>
      <p className="text-gray-500 mt-2">
        An unexpected error has occurred. Please try again later.
      </p>
      <Link href={paths.home}>
        <button className="btn btn-primary mt-6">Go Home</button>
      </Link>
    </div>
  )
}

export default ErrorPage
