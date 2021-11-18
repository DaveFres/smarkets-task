import { useState, useEffect } from "react";
import { fetchData } from "../modules/fetch-data";

function useFetch(url: string) {
    const [data, setData] = useState<null | { [key: string]: any }>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setData(null);
        setError(null);
        setLoading(true);

        const fetchEventsData = async (url: string) => {
            const eventIds = await fetchData(url, setError);

            if (!eventIds) {
                setError("No data is recieved");
            }

            const eventIdsString = eventIds && eventIds["popular_event_ids"].join(",");

            const eventsData = await fetchData(`events/${eventIdsString}/`, setError)

            if (!eventsData) {
                setError("No data is recieved");
            } else {
                setData(eventsData.events);
            }

            setLoading(false);
        };

        fetchEventsData(url);
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
