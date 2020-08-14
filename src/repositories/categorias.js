import config from '../config'

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`

function getAll() {
  return fetch(`${URL_CATEGORIES}`)
    .then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json()
        return responseJson
      }

      throw new Error('Não foi possível pegar os dados :(( ')
    })
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json()
        return responseJson
      }

      throw new Error('Não foi possível pegar os dados :(( ')
    })
}

function drop(id) {
  return fetch(`${URL_CATEGORIES}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) {
      const responseJson = await response.json()
      return responseJson
    }

    throw new Error('Não foi possível deletar a categoria :(')
  })
}

function store(categoryObject) {
  return fetch(`${URL_CATEGORIES}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(categoryObject),
  })
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json()
        return resposta
      }

      throw new Error('Não foi possível cadastrar os dados :(')
    })
}

export default {
  getAll,
  getAllWithVideos,
  drop,
  store,
}
