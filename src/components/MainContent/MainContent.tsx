import block from 'bem-cn-lite';
import { Link } from 'react-router-dom';

import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../Loading/Loading';

import { parseDate } from '../../utils';

import timeSvg from '../../assets/time.svg';

import './MainContent.scss';

const b = block('main-content');


const MainContent = ({ eventsData }: { [key: string]: any }) => {
    const { data: eventsList, loading, error } = eventsData;

    if (loading) {
        return <Loading/>;
    }

    if (error || !eventsList) {
        return <ErrorPage />;
    }

    return <main className={b()}>
        <div className={b('header')}>
            <h1 className={b('title')}>Football odds</h1>
            <h1 className={b('description')}>
                Trade and bet on a variety of football betting markets, including those on the Premier League,
                Champions League, La Liga, Bundesliga and MLS.
            </h1>
        </div>
        <div className={b('events-wrapper')}>
            <ul className={b('events-list')}>
                {eventsList.map((newsEl: any, idx: number) => {
                    const startTime = newsEl['start_datetime'];
                    const parsedDate = parseDate(startTime, newsEl.state);
                    const { name: matchName, id, full_slug } = newsEl;
                    const href = `/event/${id}${full_slug}`;
                    const teams = matchName && matchName.split(' vs ');

                    return (
                        <li key={idx} className={b('event-elem')}>
                            <Link to={href} className={b('event-link')}>
                                <div className={b('event-info')}>
                                    <div className={b('event-info-name')}>
                                        {
                                            teams.map((team: string, idx: number) => {
                                                return (
                                                    <div key={idx}>
                                                        {team}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <img src={timeSvg} alt="time svg" className={b('time-icon')} />
                                    <time className={b('event-info-time')} dateTime={startTime}>
                                        {parsedDate}
                                    </time>
                                    <span className={b('event-info-badge')}>115 euro</span>
                                </div>

                                <div className={b('event-contract-items')}>
                                    {
                                        [teams[0], 'Draw', teams[1]].map((label, elIdx) => {
                                            return (
                                                <div key={elIdx} className={b('event-contract-item')}>
                                                    <div className={b('contract-label')}>
                                                        {label}
                                                    </div>
                                                    <div className={b('bid-offer-wrapper')}>
                                                        <div className={b('offer')}>
                                                            <div className={b('offer-price')}>
                                                                5.3
                                                            </div>
                                                            <div className={b('offer-stake')}>
                                                                54
                                                            </div>
                                                        </div>
                                                        <div className={b('bid')}>
                                                            <div className={b('bid-price')}>
                                                                5.7
                                                            </div>
                                                            <div className={b('bid-stake')}>
                                                                41
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    </main>;
};

export default MainContent;
