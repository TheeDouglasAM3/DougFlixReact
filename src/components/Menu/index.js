import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import './styles.css'
import Button from '../Button'
// import ButtonLink from './components/ButtonLink'

function Menu({ menuPathRoute, menuNameButton }) {
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="dougflix" />
      </Link>

      <Button as={Link} className="ButtonLink" to={menuPathRoute}>
        {menuNameButton}
      </Button>
    </nav>
  )
}

export default Menu
