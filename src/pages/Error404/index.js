import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PageBlank from '../../components/PageBlank'

import './styles.css'

function Error404() {
  const history = useHistory()
  const [numberCount, setNumberCount] = useState(404)
  const [delayToKeyDown, setDelayToKeyDown] = useState(false)
  const wordsEasterEgg = ['Pare', 'com', 'isto', 'agora!', 'Volte',
    'para', 'a', 'home', '...', '..', '.', 'O', 'que', 'você', 'está',
    'esperando?', '...', '..', '.', 'ok', 'terei', 'que', 'fazer', 'isto',
    'à', 'força', '...', '..', '.', 'tchau :)']
  const [indexToWordsEasterEgg, setIndexToWordsEasterEgg] = useState(0)

  function decreaseOne() {
    if (numberCount > 0) setNumberCount(numberCount - 1)
    else {
      setNumberCount(wordsEasterEgg[indexToWordsEasterEgg])
      setIndexToWordsEasterEgg(indexToWordsEasterEgg + 1)
      if (indexToWordsEasterEgg === wordsEasterEgg.length - 1) {
        setTimeout(() => history.push('/'), 100)
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !delayToKeyDown) {
      decreaseOne()
      setDelayToKeyDown(true)
      setTimeout(() => setDelayToKeyDown(false), 100)
    }
  }

  return (
    <PageBlank>
      <h3>erro</h3>
      <div className="container">
        <div
          className="number-count-area"
          onClick={decreaseOne}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          {numberCount}
        </div>
      </div>
      <Link to="/">
        <p>Voltar para home</p>
      </Link>
    </PageBlank>
  )
}

export default Error404
