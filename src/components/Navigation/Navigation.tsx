
import block from 'bem-cn-lite';

import { useAppSelector } from '../../hooks';

import './Navigation.scss';

const b = block('navigation');


const Navigation = () => {
    const isOpened = useAppSelector((state) => state.sidebar.isOpened);

    return <nav className={b({ closed: !isOpened })}>
        Quick links
    </nav>;
};

export default Navigation;
