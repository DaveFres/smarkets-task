import { Link } from 'react-router-dom';

import block from 'bem-cn-lite';

import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../Loading/Loading';

import { parseDate } from '../../utils';
import useEventsFetch from '../../hooks/useEventsFetch';

import football from '../../assets/football.svg';
import timeSvg from '../../assets/time.svg';

import './Aside.scss';

const b = block('aside');

const Aside = () => {
    const { data: asideData, loading, error } = useEventsFetch('popular/event_ids/sport/football/');
    const showAsideData = !loading && !error && asideData;

    return <aside className={b()}>
        <div className={b('header')}>
            Popular Events
        </div>
        <ul className={b('content')}>
            {loading && <Loading />}
            {(error || (!asideData && !loading)) && <ErrorPage />}
            {
                showAsideData && asideData.map((newsEl: any, idx: number) => {
                    const startTime = newsEl['start_datetime'];
                    const parsedDate = parseDate(startTime, newsEl.state);
                    const { id, full_slug } = newsEl;
                    const href = `/event/${id}${full_slug}`;

                    return (
                        <li key={idx}>
                            <Link to={href} className={b('event-link')}>
                                <img src={football} className={b('event-link-icon')} alt={`${newsEl.type} icon`} />
                                <span className={b('event-link-content')}>
                                    <div className={b('event-link-name')}>{newsEl.name}</div>
                                    <img src={timeSvg} alt="time svg" className={b('time-icon')} />
                                    <time className={b('event-link-time')} dateTime={startTime}>
                                        {parsedDate}
                                    </time>
                                    <span className={b('event-link-badge')}>115 euro</span>
                                </span>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    </aside>;
};

export default Aside;
