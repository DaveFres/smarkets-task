import block from 'bem-cn-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';

import arrow from '../../assets/arrow-down.svg';
import { fetchData } from '../../modules/fetch-data';

import { randomInt } from '../../utils/index';

import './EventPage.scss';

const b = block('event-page');

const EventPage = ({ eventsData }: any) => {
    const { data: eventsList, loading, error } = eventsData;
    const [fullDataIsVisible, setFullDataIsVisible] = useState(false);
    const [league, setLeague] = useState(null);
    const { eventId } = useParams();

    const currentEventData = eventsList && eventsList.find((event: any) => event.id === eventId);

    useEffect(() => {
        const fetchLeague = async () => {
            const parentData = await fetchData(`events/${currentEventData['parent_id']}/`);

            if (parentData) {
                const leagueName = parentData.events[0].name;
                setLeague(leagueName);
            }
        }

        if (currentEventData) {
            fetchLeague();
        }
    }, [currentEventData]);


    if (loading) {
        return <Loading/>
    }

    if (error || !currentEventData) {
        return <ErrorPage />;
    }

    const { name } = currentEventData;
    const teams = name && name.split(' vs ');

    const handleCollapseClick = () => {
        setFullDataIsVisible(!fullDataIsVisible);
    }

    return <main className={b()}>
        <header className={b('name')}>
            {
                teams.map((team: string, idx: number) => {
                    return (
                        <div key={idx}>
                            {team}
                        </div>
                    );
                })
            }
            <div className={b('league')}>League: {league}</div>
        </header>
        <div className={b('main')}>
            <div className={b('info')}>
                <div className={b('info-content')}>
                    <div className={b('info-content-name')}>
                        Full-time result
                    </div>
                    <div className={b('info-stats')}>
                        traded: 148,465
                    </div>
                </div>
                <div className={b('collapse', { up: fullDataIsVisible })} onClick={handleCollapseClick}>
                    <img src={arrow} alt="collapse button" />
                </div>
            </div>
            <div className={b('full-info', { visible: fullDataIsVisible })}>
                <div className={b("overround-info")}>
                    <span className={b("overround-name-column")}>Contract</span>
                    <span className={b("last-price-area")}>Last Traded Price</span>
                    <span className={b("price-series")}>100.22%</span>
                    <span className={b("price-series overround bids")}>99.22%</span>
                </div>
                {
                    [teams[0], 'Draw', teams[1]].map((label, idx) => {
                        return (
                            <ul key={idx} className={b('contracts')}>
                                <div className={b('contract-name')}>
                                    {label}
                                </div>
                                <div className={b('last-price')}>
                                    {randomInt(40)}%
                                </div>
                                <div className={b('bid-offer-wrapper')}>
                                    <div className={b('offer', {collapsible: true})}>
                                        <div className={b('offer-price')}>
                                            5.3
                                        </div>
                                        <div className={b('offer-stake')}>
                                            £805
                                        </div>
                                    </div>
                                    <div className={b('bid')}>
                                        <div className={b('bid-price', { green: true })}>
                                            5.7
                                        </div>
                                        <div className={b('bid-stake')}>
                                            £205
                                        </div>
                                    </div>
                                </div>
                                <div className={b('bid-offer-wrapper')}>
                                    <div className={b('offer')}>
                                        <div className={b('offer-price', { blue: true })}>
                                            5.3
                                        </div>
                                        <div className={b('offer-stake')}>
                                            £269
                                        </div>
                                    </div>
                                    <div className={b('bid', {collapsible: true})}>
                                        <div className={b('bid-price')}>
                                            5.7
                                        </div>
                                        <div className={b('bid-stake')}>
                                            £250
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    </main>;
};

export default EventPage;
