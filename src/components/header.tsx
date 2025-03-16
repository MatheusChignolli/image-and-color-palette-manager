/* COMPONENT DESCRIPTION
 *
 * Application header with some features:
 * - Navigation menu on left side with links to Image and Color Pallette modules.
 * - Logo with link to home page at middle.
 * - Search button to find data between Image and Color Pallette modules.
 *
 */

import paths from '@/constants/paths'
import Link from 'next/link'

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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={paths.image} prefetch={false}>
                Image
              </Link>
            </li>
            <li>
              <Link href={paths.colorPalette} prefetch={false}>
                Color palette
              </Link>
            </li>
          </ul>
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
