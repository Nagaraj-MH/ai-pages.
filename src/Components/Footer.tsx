import { useTheme } from "../Contexts/ThemeProvider";
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

        <div className="mt-6 text-sm">
        Made with ❤️ by  &nbsp;
        <a href="https://github.com/Nagaraj-mh" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          Nagaraj-mh
        </a>
      </div>
        </div>
      </footer>

    )
}


export default Footer;