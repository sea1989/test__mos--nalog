import React from 'react'
import './style.css'

// import { ReactComponent as CloseModal } from '../../assets/img/close-modal.svg'

export default function Modal({ active, setActive, data }) {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div onClick={() => setActive(false)} className="modal__button_close">
          {/* <CloseModal /> */}
        </div>
        <h1>{data.countriesName}</h1>
        <div className="modal__slider">
          <ul className="modal__list">
            <li className="modal__item">{data.continent}</li>
            <li className="modal__item">{data.location}</li>
            <li className="modal__item">{data.abbreviation}</li>
            <li className="modal__item">{data.countriesName}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
