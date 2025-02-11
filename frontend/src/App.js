// import { useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.scss'
import Logo from './components/Logo/Logo'
import Status from './components/Status/Status'
import CardsNav from './components/CardsNav/CardsNav'
import CardForm from './components/CardForm/CardForm'
import CardsList from './components/CardsList/CardsList'
import { addBtnNavHover } from './redux/layout/actionCreators'

function App() {
  const [nameNav, setNameNav] = useState({ source: null, name: '' })
  const appRef = useRef()
  const dispatch = useDispatch()

  const [btnNavHover, setBtnNavHover] = useState('')
  const [toolbarColor, setToolbarColor] = useState(false)
  const [toolbarColorActive, setToolbarColorActive] = useState(false)

  const handleMouseEnter = (e) => {
    setBtnNavHover(e.target.textContent)
    dispatch(addBtnNavHover(e.target.textContent.toLowerCase()))
  }
  const handleMouseLeave = () => {
    setBtnNavHover('')
    dispatch(addBtnNavHover(null))
  }

  const useSize = (target) => {
    const [size, setSize] = useState()

    useLayoutEffect(() => {
      setSize(target.current.getBoundingClientRect())
    }, [target])

    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
  }

  useEffect(() => {
    if (toolbarColorActive) {
      setToolbarColor(true)
    }
  }, [toolbarColorActive])

  const handleAppClick = (evt) => {
    if (toolbarColor) {
      if (
        !evt.target.classList.contains('toolbar-color') &&
        !evt.target.classList.contains('toolbar-more')
      ) {
        setToolbarColor(false)
        setToolbarColorActive(false)
      }
    }
  }

  const target = useRef(null)
  const size = useSize(target)

  return (
    <div ref={appRef} className="app" onClick={handleAppClick}>
      <header className="app-header">
        <Logo />
        <Status />
      </header>
      <main className="app-main">
        <CardsNav
          handleClick={setNameNav}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <div className="form" ref={target}>
          {size && (
            <CardsList
              name={nameNav}
              handleClick={setNameNav}
              hover={btnNavHover}
              dimensionHeight={size.height}
              dimensionWidth={size.width}
            />
          )}
          {size && (
            <CardForm
              name={nameNav}
              hover={btnNavHover}
              dimensionHeight={size.height}
              dimensionWidth={size.width}
              toolbarColor={toolbarColor}
              setToolbarColorActive={setToolbarColorActive}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
