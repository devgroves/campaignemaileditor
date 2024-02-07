/* eslint-disable @next/next/no-html-link-for-pages */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <header className="header-bg flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm  dark:bg-gray-800 ">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
            <a className="flex-none text-xl font-bold dark:text-white" href="/">Campaign Email Editor</a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
              <a className="font-medium nav-color" href="/" aria-current="page">Home</a>
              <a className="font-medium nav-color" href="/add-new" aria-current="page">Create New Template</a>
            </div>
          </nav>
        </header>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
