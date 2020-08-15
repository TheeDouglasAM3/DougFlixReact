import React, { useEffect, useState } from 'react'
import PageDefault from '../../components/PageDefault'
import BannerMain from '../../components/BannerMain'
import Carousel from '../../components/Carousel'
import categoriasRepository from '../../repositories/categorias'
import Loading from '../../components/Loading'

import './styles.css'

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos)
        console.log(categoriasComVideos)
        setIsLoaded(true)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error.message)
      })
  }, [])

  return (
    <PageDefault paddingAll={0} menuPathRoute="/cadastro/video" menuNameButton="Novo vídeo">
      {!isLoaded && <Loading /> }

      {(isLoaded && dadosIniciais.length === 0) && (
        <div className="alert-no-videos">
          <h2>A lista de vídeos está vazia...</h2>
          <h4>mas não se preocupe, adicione uma categoria e vídeo agora mesmo :)</h4>
        </div>
      )}

      {dadosIniciais.map((categoria, indice) => {
        if (categoria.videos.length > 0) {
          if (indice === 0) {
            return (
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={dadosIniciais[0].videos[0].titulo}
                  url={dadosIniciais[0].videos[0].url}
                  videoDescription={dadosIniciais[0].videos[0].description}
                />
                <Carousel
                  ignoreFirstVideo
                  category={dadosIniciais[0]}
                />
              </div>
            )
          }
          return (
            <Carousel
              key={categoria.id}
              category={categoria}
            />
          )
        }
        return (
          <div>
            <Carousel
              key={categoria.id}
              category={categoria}
            />
            <h3 className="category-without-video">Não possui nenhum vídeo nesta categoria :(</h3>
          </div>
        )
      })}

    </PageDefault>
  )
}

export default Home
