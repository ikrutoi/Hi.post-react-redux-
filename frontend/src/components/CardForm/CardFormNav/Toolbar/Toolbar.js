import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { openDB } from 'idb'
import './Toolbar.scss'
import listNavBtnsCardtext from '../../../../data/cardtext/list-textarea-nav-btns.json'
import listNavBtnsCardphoto from '../../../../data/cardphoto/list-toolbar-cardphoto.json'
import ToolbarColor from './ToolbarColor/ToolbarColor'
import {
  addCardphoto,
  addCardtext,
} from '../../../../redux/cardEdit/actionCreators'
import { addIconToolbarCardtext } from '../../../../utils/cardFormNav/addIconToolbarCardtext.js'
import { addIconToolbarCardphoto } from '../../../../utils/cardFormNav/addIconToolbarCardphoto.js'
import { useIndexedDB } from '../../../../data/cardFormNav/useIndexedDB.js'

const Toolbar = ({
  nameSection,
  // handleClickBtnNav,
  setToolbarColorActive,
  // handleClickToolbar,
  // handleClickColor,
  toolbarColor,
}) => {
  // const [tooltip, setTooltip] = useState(null)
  const dispatch = useDispatch()
  const [listBtns, setListBtns] = useState(null)

  useEffect(() => {
    switch (nameSection) {
      case 'cardtext':
        setListBtns(listNavBtnsCardtext)
        break
      case 'cardphoto':
        setListBtns(listNavBtnsCardphoto)
        break

      default:
        break
    }
  }, [nameSection])

  // const handleMouseEnter = (evt) => {
  //   const toolbarElement = document.querySelector('.toolbar')
  //   const toolbarBtnElement = document.querySelectorAll('.toolbar-btn')[0]
  //   const widthToolbarBtn = toolbarBtnElement.getBoundingClientRect().width
  //   const leftToolbar = toolbarElement.getBoundingClientRect().left
  //   const target = evt.target
  //   const coords = target.getBoundingClientRect()
  //   const left = coords.left - leftToolbar
  //   const tooltipBtn = target.dataset.tooltip
  //   if (!tooltipBtn) {
  //     return
  //   }
  //   setTooltip({
  //     text: tooltipBtn,
  //     targetElement: target,
  //     left: `${left}`,
  //     widthbtn: widthToolbarBtn,
  //   })
  // }

  // const handleMouseLeave = () => {
  //   setTooltip(null)
  // }

  // const iconItalicRef = useRef(null)
  // const handleChoiceActive = (icon) => {
  //   if (icon === cardtext.textAlign || icon === cardtext.fontStyle) {
  //     return 'rgb(71, 71, 71)'
  //   }
  // }

  // useEffect(() => {
  //   btnRefs.current = listNavBtns.map(
  //     (_, i) => btnRefs.current[i] ?? createRef()
  //   )
  // }, [btnRefs])

  const handleClickToolbar = async (evt, i, section) => {
    const searchParentBtnNav = (el) => {
      if (el.classList.contains('toolbar-btn')) {
        return el
      } else if (el.parentElement) {
        return searchParentBtnNav(el.parentElement)
      }
      return null
    }

    const parentBtnNav = searchParentBtnNav(evt.target)

    // handleClickBtnNav(parentBtnNav)
    const btnTooltip = parentBtnNav.dataset.tooltip

    if (btnTooltip === 'color') {
      setToolbarColorActive(true)
    }
    if (
      btnTooltip === 'left' ||
      btnTooltip === 'center' ||
      btnTooltip === 'right' ||
      btnTooltip === 'justify'
    ) {
      dispatch(addCardtext({ textAlign: parentBtnNav.dataset.tooltip }))
    }

    if (section === 'cardphoto') {
      dispatch(addCardphoto({ icon: btnTooltip }))

      if (btnTooltip === 'download') {
        fileInputRef.current.click()
      }

      // const formData = new FormData()
      // formData.append('file', selectedFile)

      // try {
      //   const response = await fetch('/upload', {
      //     method: 'POST',
      //     body: formData,
      //   })

      //   if (response.ok) {
      //     alert('File uploaded successfully')
      //   } else {
      //     alert('Error loading file 0')
      //   }
      // } catch (error) {
      //   alert('Error loading file ' + error.message)
      // }
    }

    // switch (btnTooltip) {
    //   case 'download':
    //     dispatch(addCardphoto({icon: btnTooltip}))
    //     break;

    //   default:
    //     break;
    // }
    // }
  }

  // const [selectedFiles, setSelectedFiles] = useState([])
  const db = useIndexedDB()
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  // useEffect(() => {
  //   const initDB = async () => {
  //     const db = await openDB('files-db', 1, {
  //       upgrade(db) {
  //         db.createObjectStore('files', { autoIncrement: true })
  //       },
  //     })
  //     setDb(db)
  //   }
  //   initDB()
  // }, [])

  useEffect(() => {
    const loadData = async () => {
      if (db) {
        const tx = db.transaction('files', 'readonly')
        const store = tx.objectStore('files')
        const allFiles = await store.getAll()
        setSelectedFiles(allFiles)
      }
    }
    loadData()
  }, [db])

  const handleFileChange = async (event) => {
    const files = event.target.files
    const fileArray = Array.from(files)
    // setSelectedFile(event.target.files[0])

    setSelectedFiles([...selectedFiles, ...fileArray])

    if (db) {
      const tx = db.transaction('files', 'readwrite')
      const store = tx.objectStore('files')
      for (const file of fileArray) {
        await store.add(file)
      }
      await tx.done
    }
  }

  useEffect(() => {
    selectedFiles.map((file, i) => console.log('->', file.name))
  }, [selectedFiles])

  const addIconToolbar = (nameSection, nameBtn) => {
    switch (nameSection) {
      case 'cardphoto':
        return addIconToolbarCardphoto(nameBtn)
      case 'cardtext':
        return addIconToolbarCardtext(nameBtn)

      default:
        break
    }
  }

  return (
    <div className={`toolbar toolbar-${nameSection}`}>
      <div className={`toolbar-settings toolbar-settings-${nameSection}`}>
        {listBtns &&
          listBtns.map((btn, i) => {
            if (btn === 'download') {
              return (
                <button
                  className={`toolbar-btn toolbar-btn-${nameSection} toolbar--${btn}`}
                  data-tooltip={btn}
                  key={i}
                  // ref={btnRefs.current[i]}
                  onClick={(event) => handleClickToolbar(event, i, nameSection)}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                >
                  <input
                    ref={fileInputRef}
                    className="cardformnav-toolbar-input"
                    id="file-input"
                    key={`input-${i}`}
                    type="file"
                    onChange={handleFileChange}
                  ></input>
                  {addIconToolbar(nameSection, btn)}
                </button>
              )
            }
            return (
              <button
                className={`toolbar-btn toolbar-btn-${nameSection} toolbar--${btn}`}
                data-tooltip={btn}
                key={i}
                // ref={btnRefs.current[i]}
                onClick={(event) => handleClickToolbar(event, i, nameSection)}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                {addIconToolbar(nameSection, btn)}
              </button>
            )
          })}
      </div>
      <div className="toolbar-cardtext-more">
        {toolbarColor && (
          <ToolbarColor
            color={toolbarColor.color}
            // handleClickColor={handleClickColor}
          />
        )}
      </div>
    </div>
  )
}

export default Toolbar
