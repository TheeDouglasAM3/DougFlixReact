import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageDefault from '../../../components/PageDefault'
import useForm from '../../../hooks/useForm'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import videosRepository from '../../../repositories/videos'
import categoriasRepository from '../../../repositories/categorias'
import ListItem from '../../../components/ListItem'

function CadastroVideo() {
  const history = useHistory()
  const [videos, setVideos] = useState([])
  const [categorias, setCategorias] = useState([])
  const categoriasTitulo = categorias.map(({ titulo }) => titulo)
  const { handleChange, valoresForm } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  })

  useEffect(() => {
    categoriasRepository.getAll()
      .then((response) => setCategorias([
        ...response,
      ]))
    videosRepository.getAll()
      .then((response) => setVideos([
        ...response,
      ]))
  }, [])

  function deleteVideo(event, id) {
    videosRepository.drop(id)
    event.target.parentNode.parentNode.classList.add('hide')
  }

  return (
    <PageDefault menuPathRoute="/cadastro/categoria" menuNameButton="Nova categoria">
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={(event) => {
        event.preventDefault()
        // alert('Video Cadastrado com sucesso!!!1!');

        const categoriaEscolhida = categorias
          .find((categoria) => categoria.titulo === valoresForm.categoria)

        videosRepository.store({
          titulo: valoresForm.titulo,
          url: valoresForm.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            console.log('Cadastrou com sucesso!')
            history.push('/')
          })
      }}
      >
        <FormField
          label="Titulo do Vídeo"
          type="text"
          name="titulo"
          maxLength={64}
          value={valoresForm.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          type="text"
          name="url"
          maxLength={128}
          value={valoresForm.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          maxLength={32}
          value={valoresForm.categoria}
          onChange={handleChange}
          suggestions={categoriasTitulo}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <br />
      <ul>
        {videos.map((video) => (
          <ListItem
            key={video.id}
            name={video.titulo}
            iconClassName="fas fa-trash-alt"
            onClickFunction={(event) => deleteVideo(event, video.id)}
          />
        ))}
      </ul>
    </PageDefault>
  )
}

export default CadastroVideo
