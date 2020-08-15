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

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([])
  const [stopRenderNewPages, setstopRenderNewPages] = useState(false)

  const [categorias, setCategorias] = useState([])
  const categoriasTitulo = categorias.map(({ titulo }) => titulo)
  const { handleChange, valoresForm } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  })

  const handleScroll = () => {
    setPage((prev) => prev + 1)
  }

  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      handleScroll()
    }
  }

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true)
      const newVideos = await videosRepository.getPerPage(page)
      setVideos((prev) => [...prev, ...newVideos])
      if (newVideos.length === 0) setstopRenderNewPages(true)
      setLoading(false)
    }

    if (!stopRenderNewPages) loadVideos()
  }, [page])

  useEffect(() => {
    categoriasRepository.getAll()
      .then((response) => setCategorias([
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

        const categoriaEscolhida = categorias
          .find((categoria) => categoria.titulo === valoresForm.categoria)

        videosRepository.store({
          titulo: valoresForm.titulo,
          url: valoresForm.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
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
      {loading && <p>Loading ...</p>}
    </PageDefault>
  )
}

export default CadastroVideo
