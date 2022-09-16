import React, { useRef, useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { AiFillCloseCircle } from "react-icons/ai"
import { SiGoldenline } from "react-icons/si"
import { VscThreeBars } from "react-icons/vsc"

function Nav() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const ul = useRef(null)
  const [show, setShow] = useState(true)

  function showBurger() {
    setShow(prevState => !prevState)
  }

  // build bug
  if (typeof window !== `undefined`) {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
      function watchWidth() {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener("resize", watchWidth)

      return function () {
        window.removeEventListener("resize", watchWidth)
      }
    }, [])

    useEffect(() => {
      if (windowWidth > 639) {
        setShow(true)
      } else {
        setShow(false)
      }
    }, [windowWidth])
  }

  return (
    <div className="fixed h-16 text-gray-400 navbar bg-base-100 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl normal-case btn btn-ghost gap-1 px-3 text-violet-300"
        >
          <SiGoldenline size={37} className="pr-2" />
          {data.site.siteMetadata.title}
        </Link>
      </div>
      <div className="flex-none">
        <button
          aria-label="burger"
          className="block sm:hidden btn btn-square btn-ghost"
          onClick={showBurger}
        >
          <VscThreeBars size={35} className="m-auto" />
        </button>
        <ul
          className={`absolute flex flex-col items-center justify-center h-52 gap-3 p-5 rounded-lg sm:flex-row top-2 right-2 sm:static menu menu-horizontal sm:p-0 bg-slate-800 sm:bg-inherit w-40 sm:w-auto sm:h-auto z-50 ${
            show ? "flex" : "hidden"
          }`}
          ref={ul}
        >
          <AiFillCloseCircle
            size={30}
            className="absolute top-2 right-2 sm:hidden text-white"
            color="rgb(167 139 250)"
            onClick={showBurger}
          />
          <li>
            <Link
              to="/"
              className="btn btn-ghost"
              activeClassName="bg-violet-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="btn btn-ghost"
              activeClassName="bg-violet-700"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="btn btn-ghost"
              activeClassName="bg-violet-700"
            >
              Projekty
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav
