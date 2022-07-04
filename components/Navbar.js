import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
export function Navbar() {
  return (
    <div className="w-full flex justify-center fixed z-50 bg-base-100 shadow-md shadow-gray-900/5">
      <div className="max-w-7xl w-11/12 lg:w-full">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost btn-circle">
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
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={"/"}>
                    <a>Homepage</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/app"}>
                    <a>Application</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl">FlaRank</a>
          </div>
          <div className="navbar-end">
            <Link href="https://github.com/yopiangga/ahp-next">
              <a className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <FaGithub size={20} />
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
