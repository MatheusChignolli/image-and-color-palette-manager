/* COMPONENT DESCRIPTION
 *
 * Application header with some features:
 * - Navigation menu on left side with links to Image and Color Pallette modules.
 * - Logo with link to home page at middle.
 * - Search button to find data between Image and Color Pallette modules.
 *
 */

import paths from '@/constants/paths'
import { Box, Settings2 } from 'lucide-react'
import Link from 'next/link'
import OpenModalButton from './open-modal-button'

function Header() {
  return (
    <header className="navbar bg-base-300 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div className="dropdown-content bg-base-200 border border-white/30 rounded-box z-1 mt-3 w-52 shadow-md">
            <div className="flex flex-col p-2">
              <p className="text-lg flex gap-1 items-center">
                <Box size={20} />
                Modules
              </p>
              <ul tabIndex={0} className="menu menu-sm w-full">
                <li>
                  <Link className="text-sm" href={paths.images} prefetch={false}>
                    Images
                  </Link>
                </li>
                <li>
                  <Link className="text-sm" href={paths.colorPalette} prefetch={false}>
                    Color palette
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full border border-white/30" />
            <div className="flex flex-col p-2">
              <p className="text-lg flex gap-1 items-center">
                <Settings2 size={20} />
                Settings
              </p>
              <ul tabIndex={0} className="menu menu-sm w-full">
                <li>
                  <OpenModalButton id="tag-modal">Tags</OpenModalButton>
                </li>
                <li>
                  <OpenModalButton id="group-modal">Groups</OpenModalButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={paths.home} prefetch={false} className="btn btn-ghost text-xl">
          Brand Zone
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
