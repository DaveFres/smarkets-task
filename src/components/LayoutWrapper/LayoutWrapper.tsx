import block from 'bem-cn-lite';
import { Routes, Route } from "react-router-dom";

import Aside from '../Aside/Aside';
import EventPage from '../EventPage/EventPage';
import MainContent from '../MainContent/MainContent';
import Navigation from '../Navigation/Navigation';

import useEventsFetch from '../../hooks/useEventsFetch';

import './LayoutWrapper.scss';

const b = block('content-wrapper');

const LayoutWrapper = () => {
    const fetchResult = useEventsFetch('popular/event_ids/sport/football/?inplay_enabled=true&limit=10');

    return <main className={b()}>
        <Navigation />
        <Routes>
            <Route path="/" element={<MainContent eventsData={fetchResult} />} />
            <Route path="/event/:eventId/*" element={<EventPage eventsData={fetchResult} />} />
        </Routes>
        <Aside />
    </main>;
};

export default LayoutWrapper;
