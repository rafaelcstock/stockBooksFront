import styled from 'styled-components';

import Logo from '../Logo';
import OpcoesHeader from '../opcoesHeader';

const AppHeader = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: space-around;
`

function Header() {
    return (
        <AppHeader>
            <Logo />
            <OpcoesHeader />
        </AppHeader>
    );
}

export default Header;