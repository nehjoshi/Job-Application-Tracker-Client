import { useEffect, useState } from 'react';
import { GET } from './getStats';

interface Location {
    value: number;
    label: string;
}

interface Statistics {
    totalCount: number;
    offerCount: number;
    rejectedCount: number;
    stageCount: number;
    locations: Location[],
    dateX: Date[];
    dateY: number[];
}

const defaultStatistics: Statistics = {
    totalCount: 0,
    offerCount: 0,
    rejectedCount: 0,
    stageCount: 0,
    locations: [],
    dateX: [],
    dateY: []
};

export const useStatistics = () => {

    const [statistics, setStatistics] = useState<Statistics>(defaultStatistics);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            const res = await GET();
            if (res.status === 200) {
                const transformedLocations = (res.data?.topLocations || []).map((location: { [key: string]: number }) => {
                    const key: string = Object.keys(location)[0];
                    const value: number = location[key];
                    return { value, label: key };
                });
                const tempDateX: Date[] = [];
                const tempDateY: number[] = [];
                (res.data?.fiveDayAppCount || []).forEach((obj: { [key: string]: number }) => {
                    const key: string = Object.keys(obj)[0];
                    const date: Date = new Date(key);
                    const count: number = obj[key];
                    tempDateX.push(date);
                    tempDateY.push(count);
                });
                setStatistics({
                    totalCount: res.data?.totalCount!,
                    offerCount: res.data?.offerCount!,
                    rejectedCount: res.data?.rejectedCount!,
                    stageCount: res.data?.stageCount!,
                    locations: transformedLocations,
                    dateX: tempDateX,
                    dateY: tempDateY,
                })
                setLoading(false);
            }
            else {
                console.log(res.message);
            }
        }
        fetchStatistics();
    }, []);

    return { statistics, loading };

}