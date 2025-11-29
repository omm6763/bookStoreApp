import React from "react";

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 items-center min-h-[80vh] relative overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob dark:opacity-20 pointer-events-none"></div>
        <div className="absolute top-20 right-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 dark:opacity-20 pointer-events-none"></div>

        {/* Text Section */}
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-0 z-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
              Unlock a universe of stories <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                to read everyday!
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Discover your next favorite book. From timeless classics to modern sci-fi adventures, your cozy digital library awaits.
            </p>
            
            {/* Input & Button */}
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-lg mt-6">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  
                  className="input input-bordered w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" 
                />
                <button className="btn bg-pink-500 hover:bg-pink-600 text-white border-none px-8 text-lg rounded-lg transition-colors">
                  Subscribe
                </button>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
             <a href="/course" className="btn btn-outline border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-pink-500 transition-all">Explore Books</a>
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 w-full md:w-1/2 flex justify-center md:justify-end relative z-10 mt-10 md:mt-0">
          <img
            src="/new-banner.png" 
            className="w-full max-w-[650px] object-contain drop-shadow-2xl rounded-xl hover:scale-[1.02] transition-transform duration-500"
            alt="Cozy reading nook with books and tea"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;