import block from 'bem-cn-lite';

import './Loading.scss';

const b = block('loading');

// TO DO: use spinner from library
const Loading = () => {
    return <div className={b()}>
       loading...
    </div>;
};

export default Loading;
