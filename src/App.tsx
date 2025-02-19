import React, { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <section className={`h-screen flex flex-col justify-center relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full grid grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className={darkMode ? "border-gray-100" : "border-gray-900"}></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl font-light mb-6 tracking-tight">Discover stories that resonate.</h1>
            <p className={`text-lg mb-10 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A digital library for the modern reader. 
              Access thousands of books from any device, anytime.
            </p>
            
            <button className={`px-8 py-3 ${darkMode ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-900'} transition-colors`}>
              Start reading
            </button>
          </div>
        </div>
        
        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 mr-12">
          <div className="relative h-96 w-72">
            <div className={`absolute left-0 top-0 h-full w-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-800'}`}></div>
            <div className={`absolute left-12 top-0 h-full w-60 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border-t border-r border-b`}>
              <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 w-24 h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-32 h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 w-20 h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className={`absolute bottom-12 right-8 w-16 h-16 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className={`text-xs mb-2 uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Scroll</span>
          <div className={`w-px h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
        </div>
      </section>
      
      <nav className={`fixed top-0 left-0 w-full py-6 px-6 flex justify-between items-center z-50 ${darkMode ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="text-xl tracking-tight">ai pages.</div>
        <div className="flex items-center space-x-8">
          <a href="#" className={`text-sm ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'} transition-colors`}>Library</a>
          <a href="#" className={`text-sm ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'} transition-colors`}>Features</a>
          <a href="#" className={`text-sm ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'} transition-colors`}>Sign In</a>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      
      <section className={`py-24 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <h2 className="text-2xl font-light mb-16 text-center">Currently trending</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "The Quiet Hours", author: "Elizabeth Strout", category: "Fiction" },
              { title: "Structural Design", author: "Peter Zumthor", category: "Architecture" },
              { title: "The Essential Essays", author: "Susan Sontag", category: "Essays" }
            ].map((book, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`aspect-[3/4] mb-6 transition-colors flex items-center justify-center ${darkMode ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                  <span className={`${darkMode ? 'text-gray-500' : 'text-gray-300'} text-xl font-light`}>Cover</span>
                </div>
                <h3 className="font-light mb-1">{book.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{book.author}</p>
                <span className={`inline-block mt-3 text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{book.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className={`py-24 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <h2 className="text-2xl font-light mb-16 text-center">Read your way</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-light mb-2">Any device</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                Read on your phone, tablet, or computer with perfect syncing across all your devices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-lg font-light mb-2">Unlimited library</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                Access thousands of titles across every genre, from classics to the latest releases.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-lg font-light mb-2">Reading preferences</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                Customize font, size, and theme including dark mode for comfortable reading day or night.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={`py-24 px-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border-t border-b`}>
        <div className="container mx-auto max-w-2xl text-center">
          <blockquote className="text-2xl leading-relaxed font-light italic">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </blockquote>
          <cite className={`inline-block mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} before:content-['—_'] before:mr-1`}>George R.R. Martin</cite>
        </div>
      </section>
      

      
      <footer className={`py-12 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl mb-6">ai pages.</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} max-w-xs`}>
              Your digital reading companion. Access thousands of books from anywhere, on any device.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Platform</h3>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>Library</a></li>
                <li><a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>New Releases</a></li>
                <li><a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>Genres</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Developer</h3>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>About</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        
      </footer>
    </div>
  );
};

export default App;