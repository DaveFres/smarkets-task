import block from 'bem-cn-lite';

import './ErrorPage.scss';

const b = block('error-page');

const Header = () => {
    return <div className={b()}>
       Sorry, something went wrong
    </div>;
};

export default Header;
