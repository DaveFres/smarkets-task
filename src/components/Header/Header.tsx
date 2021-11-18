import block from 'bem-cn-lite';
import { useAppDispatch } from '../../hooks';
import { toggle } from '../../features/sidebar-slice';

import burger from '../../assets/burger.svg';

import './Header.scss';

const b = block('header');

const Header = () => {
    const dispatch = useAppDispatch();

    const handleBurgerClick = () => {
        dispatch(toggle());
    };

    return <header className={b()}>
        <img src={burger} alt="burger menu" className={b('burger')} onClick={handleBurgerClick} />
        <a className={b('logo')} href='/'>
            <img
                width="100"
                height="23.06"
                src="https://smarkets.com/static/assets/smarkets-logo.33cf24e1279443342527.svg"
                alt="Smarkets logo"
            />
        </a>
    </header>;
};

export default Header;
