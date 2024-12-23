import Input from "../Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getLivros } from "../../servicos/livros";
import { getFavoritos, postFavorito } from "../../servicos/favoritos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    width: 100%;
`;

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`;

const Subtitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`;

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    p {
        width: 200px;
        font-size: 24px;
        font-weight: bold;
    }
    img {
        width: 100px;
    }
    &:hover {
        width: 40%;
        margin-left: 25em;
        border: 5px solid white;
        border-radius: 25px;
    }
`;

const Button = styled.button`
    background: none; 
    border: 2px solid white; 
    border-radius: 25px;
    color: white; 
    font-size: 14px; 
    padding: 10px 20px;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
        background-color: white; 
        color: #002F52; 
    }
`;

function Pesquisa() {
    const [livrosPesquisados, setLivrosPesquisados] = useState([]);
    const [livros, setLivros] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        fetchLivros();
        fetchFavoritos();
    }, []);

    async function fetchLivros() {
        const livrosDaApi = await getLivros();
        setLivros(livrosDaApi);
    }

    async function fetchFavoritos() {
        const favoritosDaApi = await getFavoritos();
        setFavoritos(favoritosDaApi);
    }

    async function insertLivro(id) {
        // Verifica se o livro já está nos favoritos
        const livroJaFavoritado = favoritos.some(favorito => favorito.id === id);

        if (livroJaFavoritado) {
            toast.warn("Este livro já está nos favoritos!", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            await postFavorito(id);
            toast.success(`Livro de id: ${id} favoritado!`, {
                position: "top-right",
                autoClose: 3000,
            });
            fetchFavoritos(); // Atualiza a lista de favoritos
        } catch (error) {
            toast.error("Erro ao favoritar o livro.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre seu livro em nossa estante</Subtitulo>
            <Input
                placeholder="Escreva sua próxima leitura!"
                onBlur={evento => {
                    const textoDigitado = evento.target.value;
                    const resultadoPesquisa = livros.filter(livro =>
                        livro.nome.includes(textoDigitado)
                    );
                    setLivrosPesquisados(resultadoPesquisa);
                }}
            />
            {livrosPesquisados.map(livro => (
                <Resultado key={livro.id}>
                    <p>{livro.nome}</p>
                    <Button onClick={() => insertLivro(livro.id)}>
                        Adicionar Favorito
                    </Button>
                </Resultado>
            ))}
            <ToastContainer />
        </PesquisaContainer>
    );
}

export default Pesquisa;
