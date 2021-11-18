import { DateTime, DurationLikeObject } from "luxon";

export const parseDate = (currDate: any, dateState: string) => {
    const now = DateTime.local();
    const currTime = DateTime.fromISO(currDate);
    const timeTypes: (keyof DurationLikeObject)[] = [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
    ];
    const diffObject = currTime.diff(now, timeTypes).toObject() as {
        [key: string]: number;
    };

    let parsedDateInWords = "";

    timeTypes.forEach((el) => {
        /* I assume that dateState contains the same types everywhere
         * upcoming - event is going to happen
         * live - event currently happening
         * ended - event ended, and backend not sending us events with that state field
         */
        if (diffObject[el] !== 0 && !parsedDateInWords) {
            switch (dateState) {
                case "upcoming":
                    parsedDateInWords = `in ${Math.ceil(diffObject[el])} ${el}`;
                    break;
                case "live":
                    parsedDateInWords = "live now";
                    break;
                default:
                    parsedDateInWords = "ended";
            }
        }
    });

    return parsedDateInWords;
};

export const randomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}