import { Link } from 'react-router-dom';
import { TbShoppingBag, TbUser } from 'react-icons/tb'; // Importa os ícones
import styled from 'styled-components';

const icones = [
    <TbUser color="#8b0000;" size="50px" />, // Ícone do perfil
    <TbShoppingBag color="#8b0000;" size="50px" /> // Ícone da sacola
];
const textoOpcoes = ['Categorias', 'Favoritos', 'Estante'];

const TextoContainer = styled.ul`
    display: flex;
    margin: 0 50px 0 25px;
    padding: 0;
    list-style: none;
`;

const Texto = styled.li`
    padding: 35px 10px;
    cursor: pointer;
    min-width: 100px;
    font-size: 16px;
    font-family: 'Noto Serif JP', serif; /* Fonte oriental */
    text-align: center;
    color: #4b3621; /* Marrom escuro */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        color: #8b0000; /* Vermelho mais forte */
    }
`;

const IconeContainer = styled.ul`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
`;

const Icone = styled.li`
    margin-right: 50px;
    width: 35px;
    :hover {
        border: 5px solid #8b0000;
        border-radius: 50px;
    }
`;

function OpcoesHeader() {
    return (
        <>
            <TextoContainer>
                {textoOpcoes.map((texto) => (
                    <Link to={`/${texto.toLowerCase()}`} key={texto}>
                        <Texto>
                            <p>{texto}</p>
                        </Texto>
                    </Link>
                ))}
            </TextoContainer>

            <IconeContainer>
                {icones.map((icone, index) => (
                    <Link to="/" key={index}>
                        <Icone>
                            <img src={icone} alt='' />
                        </Icone>
                    </Link>
                ))}
            </IconeContainer>
        </>
    );
}

export default OpcoesHeader;
