import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';

function CadastroCategoria() {

    const [categorias, setCategorias] = useState([]);
    const valoresIniciaisForm = {
        nome: 'Nome da categoria',
        descricao: 'Insira uma descrição',
        cor: '#000000'
    }
    const [valoresForm, setValoresForm] = useState(valoresIniciaisForm);

    function handleValores(chave, valor) {
        setValoresForm({
            ...valoresForm,
            [chave]: valor
        })
    }

    function handleChange(event) {

        handleValores(
            event.target.getAttribute('name'),
            event.target.value
        )
    }
    //mudar cor do form style={{background: valoresForm.cor}}
    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {valoresForm.nome}</h1>


            <form onSubmit={function handleSubmit(event) {
                event.preventDefault()
                setCategorias([
                    ...categorias, valoresForm
                ])
                setValoresForm(valoresIniciaisForm)
            }}>

                <FormField
                    label="Nome da Categoria"
                    type="text"
                    name="nome"
                    maxLength={32}
                    value={valoresForm.nome}
                    onChange={handleChange}
                />

                <FormField
                    label="Descrição"
                    type="text"
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

                <button>
                    Cadastrar
                </button>
            </form>

            <ul>
                {categorias.map((categoria, index) => {
                    return (
                        <li key={`${categoria}${index}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;