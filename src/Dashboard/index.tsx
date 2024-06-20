import React, { useContext, useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import { Layout } from '../components/Layout';
import { UserContext } from '../context/UserContext';
import WorkIcon from '@mui/icons-material/Work';
import DiamondIcon from '@mui/icons-material/Diamond';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ForwardIcon from '@mui/icons-material/Forward';
import { PieChart } from '@mui/x-charts/PieChart';
import { GET } from './getStats';
import { LineChart } from '@mui/x-charts';

export const Dashboard: React.FC = () => {

    const { user } = useContext(UserContext);
    const [totalCount, setTotalCount] = useState(0);
    const [appliedCount, setAppliedCount] = useState(0);
    const [offerCount, setOfferCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [stageCount, setStageCount] = useState(0);
    const [locations, setLocations] = useState<Array<{ value: number, label: string }>>([]);
    const [dateX, setDateX] = useState<Array<Date>>();
    const [dateY, setDateY] = useState<Array<number>>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            const res = await GET();
            if (res.status === 200) {
                setTotalCount(res.data?.totalCount!);
                setAppliedCount(res.data?.appliedCount!);
                setOfferCount(res.data?.offerCount!);
                setRejectedCount(res.data?.rejectedCount!);
                setStageCount(res.data?.stageCount!);
                const transformedLocations = (res.data?.topLocations || []).map((location: { [key: string]: number }) => {
                    const key: string = Object.keys(location)[0];
                    const value: number = location[key];
                    return { value, label: key };
                });
                console.log(res.data?.fiveDayAppCount);
                setLocations(transformedLocations);
                const tempDateX: Date[] = [];
                const tempDateY: number[] = [];
                (res.data?.fiveDayAppCount || []).forEach((obj: { [key: string]: number }) => {
                    const key: string = Object.keys(obj)[0];
                    const date: Date = new Date(key);
                    // date.setDate(date.getDate() + 1);
                    console.log(key);
                    const count: number = obj[key];
                    tempDateX.push(date);
                    tempDateY.push(count);
                });
                setDateX(tempDateX);
                setDateY(tempDateY);
                setLoading(false);
            }
            else {
                console.log(res.message);
            }
        }
        fetchStatistics();
    }, []);


    return (
        <Layout showSidebar>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.welcomeHeading}>Welcome, {user?.firstName}</h3>
                    <h1 className={styles.mainHeading}>Overall Statistics</h1>
                </div>
                {!loading &&
                    <>
                        <div className={styles.row}>
                            <div className={styles.box}>
                                <div className={styles.iconWrapper}>
                                    <WorkIcon className={styles.statIcon} />
                                </div>
                                <h1 className={styles.statHeading}>{totalCount}</h1>
                                <h3 className={styles.statTitle}>Total Applications</h3>
                                <p className={styles.statDescription}>Add more applications to increase your chances of success</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.iconWrapper}>
                                    <ForwardIcon className={styles.statIcon} />
                                </div>
                                <h1 className={styles.statHeading}>{stageCount}</h1>
                                <h3 className={styles.statTitle}>Proceeded Applications</h3>
                                <p className={styles.statDescription}>The number of applications in which you've moved to the next round of the hiring process</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.iconWrapper}>
                                    <DiamondIcon className={styles.statIcon} />
                                </div>
                                <h1 className={styles.statHeading}>{offerCount}</h1>
                                <h3 className={styles.statTitle}>Total Offers</h3>
                                <p className={styles.statDescription}>{offerCount > 0 ? "Congratulations! You're on the right path!" : "Don't be discouraged! Trust the process, and be consistent"}</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.iconWrapper}>
                                    <ThumbDownIcon className={styles.statIcon} />
                                </div>
                                <h1 className={styles.statHeading}>{rejectedCount}</h1>
                                <h3 className={styles.statTitle}>Rejected Applications</h3>
                                <p className={styles.statDescription}>What doesn't kill you makes you stronger</p>
                            </div>
                        </div>
                        <div className={`${styles.row} ${styles.chartRow}`}>
                            <div className={`${styles.chartWrapper} ${styles.pieChartWrapper}`}>
                                <h3 className={styles.statTitle}>Top Application Locations</h3>
                                <div className={styles.pieContainer}>
                                    <PieChart className={styles.pie} series={[{
                                        data: locations,
                                        highlightScope: { faded: 'global', highlighted: 'item' }
                                    }]} />
                                </div>
                            </div>
                            <div className={styles.chartWrapper}>
                                <h3 className={styles.statTitle}>Number of Applications According to Date</h3>
                                <LineChart
                                    xAxis={[
                                        {
                                            data: dateX,
                                            scaleType: 'time',
                                            valueFormatter: (date: Date) => date.toLocaleDateString(),
                                        }
                                    ]}
                                    series={[
                                        {
                                            data: dateY,
                                            // area: true,
                                            curve: 'linear'
                                        },
                                    ]}
                                    // width={800}
                                    height={300}
                                    className={styles.lineChart}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}