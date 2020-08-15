import config from '../config'

const URL_VIDEOS = `${config.URL_BACKEND}/videos`

function getAll() {
  return fetch(`${URL_VIDEOS}`)
    .then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json()
        return responseJson
      }

      throw new Error('Não foi possível pegar os dados :(( ')
    })
}

function store(objetoDoVideo) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoDoVideo),
  })
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json()
        return resposta
      }

      throw new Error('Não foi possível cadastrar os dados :(')
    })
}

function drop(id) {
  return fetch(`${URL_VIDEOS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) {
      const responseJson = await response.json()
      return responseJson
    }

    throw new Error('Não foi possível deletar o vídeo :(')
  })
}

export default {
  getAll,
  store,
  drop,
}
