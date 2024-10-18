import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { GET, GET_SEARCH } from './getApplications';
import { Application } from '../interfaces/Application';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "./UserApplications.module.scss";
import { Loader } from '../components/Loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from './DeleteModal';
import { DELETE } from './deleteApplication';
import { Alert, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { EditModal } from './EditModal';
import { PUT } from './editApplication';
import { NewAppModal } from './NewAppModal';
import { POST } from './submitApplication';

const appStatusMapping: any = {
    "APPLIED": "Applied",
    "OFFER": "Offer",
    "CODING_TEST": "Coding Test",
    "WAITLISTED": "Waitlsted",
    "ROUND_1": "Round 1",
    "ROUND_2": "Round 2",
    "ROUND_3": "Round 3",
    "ROUND_4": "Round 4",
    "ROUND_5": "Round 5",
    "REJECTED": "Rejected"
};

export const defaultApplication: Application = {
    companyName: '',
    applicationId: 0,
    dateApplied: new Date(),
    compensation: '',
    additionalInfo: '',
    location: '',
    positionTitle: '',
    status: ''
};


export const UserApplications: React.FC = () => {

    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<Application>(defaultApplication);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [appCount, setAppCount] = useState<number>(0);
    const [alertMessage, setAlertMessage] = useState("");
    const [newAppModalOpen, setNewAppModalOpen] = useState(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplications();
    }, [pageNumber, refresh, pageSize]);

    useEffect(() => {
        fetchSearchApplications();
        document.title = "Job Status Tracker | Your Applications";
    }, [search])


    const fetchApplications = async () => {
        setLoading(true);
        const res: { applications: Application[], count: number, status: number } = await GET(pageNumber, pageSize);
        if (res.status === 200) {
            setApplications(res.applications);
            console.log(res.applications);
            setAppCount(res.count);
            setPageCount(Math.ceil(res.count / pageSize));
        }
        else navigate('/login');
        setLoading(false);
    }

    const fetchSearchApplications = async () => {
        if (search) {
            // setLoading(true);
            const res = await GET_SEARCH(search);
            if (res.status === 200) {
                setApplications(res.applications);
            }
            // setLoading(false);
        }
        else {
            setRefresh(refresh => !refresh);
        }
    }

    const handleDelete = (app: Application) => {
        setSelectedApplication(app);
        setDeleteModalOpen(true);
    }
    const handleEdit = (app: Application) => {
        setSelectedApplication(app);
        setEditModalOpen(true);
    }

    const submitApplication = async (app: Partial<Application>) => {
        const res = await POST(app);
        if (res.status === 201) {
            setPageNumber(0);
            setAlertMessage("Created new application successfully!");
            setOpenSuccessSnackbar(true);
            setRefresh(prev => !prev);
        }
        setNewAppModalOpen(false);
    }

    const deleteApplication = async () => {
        const res = await DELETE(selectedApplication?.applicationId);
        if (res.status === 204) {
            setApplications(applications.filter(app => app.applicationId !== selectedApplication?.applicationId));
            setAlertMessage("Deleted application successfully!");
            setOpenSuccessSnackbar(true);
        }
        setDeleteModalOpen(false);
        setSelectedApplication(defaultApplication);
        setRefresh(prev => !prev);
    }

    const editApplication = async (app: Application) => {
        console.log(app);
        const res = await PUT(app);
        if (res.status === 201) {
            const updatedApplication = res.updatedApplication; // Assuming the updated application is in res.data
            setApplications(prevApps => prevApps.map(a => a.applicationId === updatedApplication.applicationId ? updatedApplication : a));
            setAlertMessage("Modified application successfully!");
            setOpenSuccessSnackbar(true);
        }
        setSelectedApplication(defaultApplication);
        setEditModalOpen(false);

    }


    return (
        <Layout showSidebar={true} currentPage="apps">
            <section className={styles.userApplicationsContainer}>
                <div className={styles.userApplicationsHeader}>
                    <h1 className={styles.userApplicationsTitle}>Your Applications</h1>
                    <button onClick={() => setNewAppModalOpen(true)} className={styles.newAppButton}>New Application</button>
                </div>
                <div className={styles.userApplicationsTableHeader}>
                    <h3>You have <span className={styles.count}>{appCount}</span> applications</h3>
                    <TextField value={search} onChange={e => setSearch(e.target.value)} placeholder='Search company name'></TextField>
                </div>
                {loading ? <Loader /> :
                    <>
                        {applications.length === 0 ? <p className={styles.noApplicationMessage}>{search ? "No applications found" : "No applications yet! Start applying now."}</p> :
                            <div className={styles.table}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow className={`${styles.row}`}>
                                                <TableCell className={styles.rowCell}><b>Date Applied</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Company</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Title</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Compensation</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Location</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Status</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Modify</b></TableCell>
                                                <TableCell className={styles.rowCell} align="center"><b>Delete</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {applications.map((app, index) => (
                                                <TableRow
                                                    key={app.applicationId}
                                                    className={`${index % 2 === 0 && styles.rowGray}`}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {app.dateApplied.toString().slice(0, 10)}
                                                    </TableCell>
                                                    <TableCell align="center">{app.companyName}</TableCell>
                                                    <TableCell align="center">{app.positionTitle}</TableCell>
                                                    <TableCell align="center">{app.compensation}</TableCell>
                                                    <TableCell align="center">{app.location}</TableCell>
                                                    <TableCell align="center">{appStatusMapping[app.status]}</TableCell>
                                                    <TableCell align="center"><EditIcon className={styles.editButton} onClick={() => handleEdit(app)} /></TableCell>
                                                    <TableCell align="center"><DeleteIcon className={styles.deleteButton} onClick={() => handleDelete(app)} /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {!search &&
                                    <div className={styles.paginationWrapper}>
                                        <ArrowBackIosNewIcon
                                            className={`${styles.paginationIcons} ${pageNumber === 0 && styles.paginationDisabled}`}
                                            onClick={() => setPageNumber(pageNumber => Math.max(0, pageNumber - 1))}
                                        />
                                        <span style={{display: 'flex', alignItems: 'center'}}>Page &nbsp;
                                            <TextField
                                                placeholder={`${pageNumber + 1}`}
                                                size='small'
                                                variant='standard'
                                                onBlur={e => (Number(e.target.value) >= 1 && Number(e.target.value) <= pageCount) && setPageNumber(Number(e.target.value) - 1)}
                                                sx={{width: "30px"}}
                                                autoComplete='off'
                                            >{pageNumber + 1} </TextField>
                                            &nbsp;of {pageCount}</span>
                                        <ArrowForwardIosIcon
                                            className={`${styles.paginationIcons} ${pageNumber + 1 === pageCount && styles.paginationDisabled}`}
                                            onClick={() => setPageNumber(pageNumber => Math.min(pageCount - 1, pageNumber + 1))}
                                        />
                                    </div>
                                }
                                {!search &&
                                    <div className={styles.center}>
                                        <span>
                                            Results per page: &nbsp;
                                            <Select color='info' size='small' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>20</MenuItem>
                                                <MenuItem value={30}>30</MenuItem>
                                                <MenuItem value={40}>40</MenuItem>
                                                <MenuItem value={50}>50</MenuItem>
                                            </Select>
                                        </span>
                                    </div>
                                }
                            </div>
                        }
                    </>

                }
                <NewAppModal open={newAppModalOpen} handleClose={() => setNewAppModalOpen(false)} submitApplication={submitApplication} />
                <EditModal open={editModalOpen} handleClose={() => { setEditModalOpen(false); setSelectedApplication(defaultApplication) }} application={selectedApplication} editApplication={editApplication} />
                <DeleteModal open={deleteModalOpen} handleClose={() => { setDeleteModalOpen(false); setSelectedApplication(defaultApplication) }} deleteApplication={deleteApplication} />
                <Snackbar open={openSuccessSnackbar} autoHideDuration={5000} onClose={() => setOpenSuccessSnackbar(false)}>
                    <Alert
                        onClose={() => setOpenSuccessSnackbar(false)}
                        severity='success'
                        variant='filled'
                        sx={{ width: "100%" }}
                    >{alertMessage}</Alert>
                </Snackbar>
            </section>
        </Layout>
    )
}