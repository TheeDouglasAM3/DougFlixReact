import React from 'react'

import './styles.css'

const ListItem = ({ name, iconClassName, onClickFunction }) => (
  <li>
    <p>
      {name}
    </p>
    <div>
      <i className={iconClassName} aria-hidden="true" onClick={(event) => onClickFunction(event)} />
    </div>
  </li>
)

export default ListItem
