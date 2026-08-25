import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-slate-600 bg-gradient-to-r from-orange-100 via-orange-200/80 to-orange-100 mt-10">

        {/* Left Section */}
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">

          {/* Logo */}
          <a href="#" className="text-orange-600">
            <img src="/logo.png" alt="logo" className='h-13 w-auto' />
          </a>

          {/* Product */}
          <div>
            <p className="text-slate-800 font-semibold">Product</p>

            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Home
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Support
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Pricing
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-slate-800 font-semibold">Resources</p>

            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Company
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Blogs
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Community
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Careers
                  <span className="text-xs text-white bg-orange-600 rounded-md ml-2 px-2 py-1">
                    We're hiring!
                  </span>
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-slate-800 font-semibold">Legal</p>

            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Privacy
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-700 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">

          <p className="max-w-60 text-slate-600">
            Making every customer feel valued—no matter the size of your audience.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-3">

            {/* Dribbble */}
            <a
              href="https://dribbble.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:text-orange-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:text-orange-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:text-orange-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:text-orange-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>

          </div>

          {/* Copyright */}
          <p className="mt-3 text-center text-slate-600">
            © 2025{' '}
            <a
              href="/"
              className="font-medium text-slate-700 hover:text-orange-700 transition-colors"
            >
              Resume Builder
            </a>
          </p>

        </div>

      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  )
}

export default Footer


 
