import React from 'react';
import logo from '../../imagens/logoGaara.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 35px;
    align-items: center;
`

const LogoImg = styled.img`
    margin-top: 10px;
    margin-right: 10px;
    max-width: 50px;
`

function Logo() {
    return (
        <LogoContainer>
            <Link to="/">
                <LogoImg src={logo} alt='logo' />
            </Link>
            <p><strong>Stock</strong> Books</p>
        </LogoContainer>
    );
}

export default Logo;
