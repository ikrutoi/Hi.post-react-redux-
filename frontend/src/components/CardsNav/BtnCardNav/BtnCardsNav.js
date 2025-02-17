import { useDispatch } from 'react-redux'
import './BtnCardsNav.scss'
import { addChoiceSection } from '../../../redux/layout/actionCreators'
import { useEffect, useRef, useState } from 'react'

const BtnCardsNav = ({
  handleMouseEnterContainer,
  handleMouseLeaveContainer,
  section,
}) => {
  const [heightBtnNavContainer, setHeightBtnNavContainer] = useState()
  const btnNavRef = useRef()
  const nameSectionLowerCase = section.name.toLowerCase()
  const dispatch = useDispatch()

  useEffect(() => {
    if (btnNavRef.current) {
      setHeightBtnNavContainer(btnNavRef.current.offsetHeight)
    }
  }, [btnNavRef])

  const handleClickBtnNav = () => {
    dispatch(
      addChoiceSection({ source: 'btnNav', nameSection: nameSectionLowerCase })
    )
  }

  return (
    <div
      className="btn-nav-container"
      onMouseEnter={() =>
        handleMouseEnterContainer(btnNavRef.current, section.colorRGBA)
      }
      onMouseLeave={() => handleMouseLeaveContainer(btnNavRef.current)}
    >
      <button
        ref={btnNavRef}
        type="button"
        className="btn-nav"
        onClick={handleClickBtnNav}
        data-name={nameSectionLowerCase}
      >
        {section.name}
      </button>
      {heightBtnNavContainer && (
        <span className="btn-nav--stripe-container">
          <span
            className="btn-nav--stripe btn-nav--stripe-left"
            style={{
              height: `${heightBtnNavContainer - 2}px`,
              backgroundColor: section.colorRGBA,
              borderColor: section.colorRGBA,
            }}
          ></span>
          <span
            className="btn-nav--stripe btn-nav--stripe-right"
            style={{
              height: `${heightBtnNavContainer - 2}px`,
              borderColor: section.colorRGBA,
            }}
          ></span>
        </span>
      )}
    </div>
  )
}

export default BtnCardsNav
