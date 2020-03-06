import React, { useContext, useReducer, useState } from 'react'
import Button from './Button'
import { EosIconStore, iconsReducer } from '../utils/EosIcons.store'
import selectIconContext from '../utils/selectIconContext'
import deSelectIconContext from '../utils/deSelectIconContext'
import GeneratingFont from './GeneratingFont'
import Modal from './Modal'
import axios from 'axios'

const CustomizeIconsPanel = () => {
  const value = useContext(EosIconStore)

  const [state, dispatch] = useReducer(iconsReducer, value)
  // eslint-disable-next-line
  const [allSelect, setAllSelect] = useContext(selectIconContext)
  // eslint-disable-next-line
  const [allDeSelect, setAllDeSelect] = useContext(deSelectIconContext)

  const [modal, showModal] = useState(false)

  const selectAll = e => {
    e.preventDefault()
    setAllSelect(true)
    return dispatch({
      type: 'ADD_ALL_ICONS'
    })
  }

  const deselectAll = e => {
    e.preventDefault()
    setAllSelect(false)
    setAllDeSelect(true)
    return dispatch({
      type: 'REMOVE_ALL_ICONS'
    })
  }

  const generateFont = e => {
    e.preventDefault()
    if (state.multipleIcons.length > 0) {
      showModal(true)
      const eosIcons = []
      const json = { eos_icons: eosIcons, extended_icons: state.multipleIcons }
      const postReqUrl = 'https://eos-icons-picker-api.herokuapp.com/iconsapi'
      axios
        .post(postReqUrl, { icons_config: json })
        .then(data => console.log(data))
    } else {
      window.alert(
        `Please select at least one icon to generate a custom icon font`
      )
    }
  }

  return (
    <>
      <div className='icons-picker-footer'>
        <div className='select-all-icons' onClick={selectAll}>
          Select all <i className='eos-icons'>select_all</i>
        </div>
        <div className='deselect-all-icons' onClick={deselectAll}>
          Deselect all <i className='eos-icons'>clear</i>
        </div>
        <div className='generate-div'>
          <span>{state.multipleIcons.length} icons selected</span>
          <Button primary type='submit' onClick={generateFont}>
            Generate font
          </Button>
        </div>
      </div>
      {modal ? (
        <Modal>
          <GeneratingFont redirect='/thankyou' />
        </Modal>
      ) : null}
    </>
  )
}

export default CustomizeIconsPanel