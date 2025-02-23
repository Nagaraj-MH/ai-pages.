import { useTheme } from "../Contexts/ThemeProvider";
import {Link} from "react-router-dom"
const Footer=()=>{
    const {darkMode}=useTheme()
    return(
        <footer className={`py-12 px-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl mb-6">ai pages.</h2>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } max-w-xs`}
            >
              Your digital reading companion. Access thousands of books from
              anywhere, on any device.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3
                className={`text-sm uppercase tracking-wider mb-4 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Platform
              </h3>
              <ul
                className={`text-sm space-y-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <Link
                    to="/library"
                    className={`${
                      darkMode ? "hover:text-white" : "hover:text-black"
                    } transition-colors`}
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`${
                      darkMode ? "hover:text-white" : "hover:text-black"
                    } transition-colors`}
                  >
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`${
                      darkMode ? "hover:text-white" : "hover:text-black"
                    } transition-colors`}
                  >
                    Genres
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className={`text-sm uppercase tracking-wider mb-4 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Developer
              </h3>
              <ul
                className={`text-sm space-y-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <Link
                    to="#"
                    className={`${
                      darkMode ? "hover:text-white" : "hover:text-black"
                    } transition-colors`}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    )
}


export default Footer;