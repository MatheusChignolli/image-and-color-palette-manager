/* COMPONENT DESCRIPTION
 *
 * Application footer with Copyright text.
 *
 */

function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-300 text-primary-content p-10">
      <aside>
        <p className="font-bold">
          Brand Zone
          <br />
          Providing content facilities to help people
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  )
}

export default Footer
