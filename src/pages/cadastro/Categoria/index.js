import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import categoriasRepository from '../../../repositories/categorias'
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'

import './styles.css'

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([])
  const valoresIniciaisForm = {
    titulo: '',
    descricao: '',
    cor: '#DDDDDD',
  }

  const { handleChange, valoresForm, clearForm } = useForm(valoresIniciaisForm)
  const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/'
    : 'https://dougflixreact.herokuapp.com/'

  useEffect(() => {
    fetch(`${URL}categorias`)
      .then(async (response) => {
        const responseJSON = await response.json()
        setCategorias([
          ...responseJSON,
        ])
      })
  }, [
    valoresForm.titulo,
  ])

  function handleSubmit(event) {
    event.preventDefault()
    setCategorias([
      ...categorias, valoresForm,
    ])

    categoriasRepository.store(valoresForm)

    clearForm()
  }

  function deleteCategory(event, id) {
    categoriasRepository.drop(id)
    event.target.parentNode.parentNode.classList.add('hide')
  }

  // mudar cor do form style={{background: valoresForm.cor}}
  return (
    <PageDefault menuPathRoute="/cadastro/video" menuNameButton="Novo vídeo">
      <h1 style={{ color: valoresForm.cor }}>
        Cadastro de Categoria:
        {valoresForm.titulo}
      </h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          maxLength={32}
          value={valoresForm.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          maxLength={256}
          value={valoresForm.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          maxLength={8}
          value={valoresForm.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      { categorias.length === 0 && (
      <div>
        Loading...
      </div>
      )}
      <br />
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            <p>
              {categoria.titulo}
            </p>
            <div>
              <i className="fas fa-trash-alt" onClick={(event) => deleteCategory(event, categoria.id)} aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria
