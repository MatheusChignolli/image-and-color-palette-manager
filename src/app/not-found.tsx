import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

import paths from '@/constants/paths'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-222px)] text-center px-4">
      <AlertTriangle className="w-16 h-16 text-red-500" />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">This page does not exist.</p>
      <Link href={paths.home}>
        <button className="btn btn-primary mt-6">Go Home</button>
      </Link>
    </div>
  )
}

export default NotFoundPage
