import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteFavorito, getFavoritos } from '../servicos/favoritos';
import livroImg from '../imagens/livro.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`;

const ResultadoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;
    text-align: center;
    padding: 10px 50px;
    p {
        width: 200px;
        color: #FFF;
    }
    img {
        width: 150px;
    }
    &:hover {
        border: 5px solid rgb(53, 88, 243);
        border-radius: 25px;
    }
`;

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px;
`;

const TituloLivro = styled.p`
    color: #FFF;
    font-size: 18px;
    text-align: center;
    width: 100%;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background: none; /* Remove o fundo */
    border: 2px solid white; /* Borda branca */
    border-radius: 25px; /* Arredondamento */
    color: white; /* Cor do texto */
    font-size: 16px; /* Tamanho da fonte */
    padding: 10px 20px; /* Espaçamento interno */
    cursor: pointer; /* Muda o cursor para indicar clique */
    margin-top: 40px;

    &:hover {
        background-color: white; /* Fundo branco ao passar o mouse */
        color: #002F52; /* Cor do texto ao passar o mouse */
    }
`;

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  async function fetchFavoritos() {
    try {
      const favoritosDaApi = await getFavoritos();
      setFavoritos(favoritosDaApi);
    } catch (error) {
      toast.error("Erro ao carregar os favoritos.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  async function deletarFavorito(id) {
    try {
      await deleteFavorito(id);
      await fetchFavoritos();
      toast.success("Livro removido de favoritos!", {
        position: "top-right", // Alternativa válida
        autoClose: 3000,
      });

    } catch (error) {
      toast.error("Erro ao remover o livro dos favoritos.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <AppContainer>
      <div>
        <Titulo>Aqui estão seus livros favoritos:</Titulo>
        <ResultadoContainer>
          {favoritos.length !== 0 ? favoritos.map(favorito => (
            <Resultado key={favorito.id}>
              <img src={livroImg} alt='Imagem do livro' />
              <div>
                <TituloLivro>{favorito.nome}</TituloLivro>
                <Button onClick={() => deletarFavorito(favorito.id)}>
                  Remover favorito
                </Button>
              </div>
            </Resultado>
          )) : <p style={{ color: '#FFF' }}>Nenhum favorito encontrado.</p>}
        </ResultadoContainer>
      </div>
      <ToastContainer />
    </AppContainer>
  );
}

export default Favoritos;
