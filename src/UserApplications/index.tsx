import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { GET } from './getApplications';
import { Application } from '../interfaces/Application';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./UserApplications.scss";
import { Loader } from '../components/Loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from './DeleteModal';
import { DELETE } from './deleteApplication';
import { Alert, Snackbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const appStatusMapping: any = {
    "APPLIED": "Applied",
    "OFFER": "Offer",
    "WAITLISTED": "Witlsted",
    "ROUND_1": "Round 1",
    "ROUND_2": "Round 2",
    "ROUND_3": "Round 3",
    "ROUND_4": "Round 4",
    "ROUND_5": "Round 5",
    "REJECTED": "Rejected"
}

export const UserApplications: React.FC = () => {

    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [appCount, setAppCount] = useState<number>(0);
    const navigate = useNavigate();

    const fetchApplications = async () => {
        setLoading(true);
        const res: { applications: Application[], count: number, status: number } = await GET(pageNumber);
        if (res.status === 200) {
            setApplications(res.applications);
            console.log(res.applications);
            setAppCount(res.count);
            setPageCount(Math.ceil(res.count / 10));
        }
        else navigate('/login');
        setLoading(false);
    }

    const handleDelete = (app: Application) => {
        setDeleteModalOpen(true);
        setSelectedApplication(app);
    }

    const deleteApplication = async () => {
        const res = await DELETE(selectedApplication?.applicationId);
        if (res.status === 204) {
            setApplications(applications.filter(app => app.applicationId !== selectedApplication?.applicationId));
        }
        setDeleteModalOpen(false);
        setSelectedApplication(null);
        setOpenSuccessSnackbar(true);
        setPageNumber(0);
    }

    useEffect(() => {
        fetchApplications();
    }, [pageNumber]);


    return (
        <Layout showSidebar={true} currentPage="apps">
            <section className="user-applications-container">
                <div className='user-applications-header'>
                    <h1 className='user-applications-title'>Your Applications</h1>
                    <button className='user-applications-new-app-button'>New Application</button>
                </div>
                {loading ? <Loader /> :
                    <>
                        {applications.length === 0 ? <p className='no-application-message'>No applications yet! Start applying now.</p> :
                            <div className='user-applications-table'>
                                <h3>You have {appCount} applications</h3>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow className='table-header-row'>
                                                <TableCell className='table-header-row-cell'><b>Date Applied</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Company</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Title</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Compensation</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Location</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Status</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Modify</b></TableCell>
                                                <TableCell className='table-header-row-cell' align="center"><b>Delete</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {applications.map((app, index) => (
                                                <TableRow
                                                    key={app.applicationId}
                                                    className={`${index % 2 == 0 && 'row-gray'}`}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {app.dateApplied.toString()}
                                                    </TableCell>
                                                    <TableCell align="center">{app.companyName}</TableCell>
                                                    <TableCell align="center">{app.positionTitle}</TableCell>
                                                    <TableCell align="center">{app.compensation}</TableCell>
                                                    <TableCell align="center">{app.location}</TableCell>
                                                    <TableCell align="center">{appStatusMapping[app.status]}</TableCell>
                                                    <TableCell align="center"><EditIcon className='table-edit-button' /></TableCell>
                                                    <TableCell align="center"><DeleteIcon className='table-delete-button' onClick={() => handleDelete(app)} /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className="user-applications-pagination-wrapper">
                                    <ArrowBackIosNewIcon
                                        className={`user-applications-pagination-icons ${pageNumber === 0 && "pagination-disabled"}`}
                                        onClick={() => setPageNumber(pageNumber => Math.max(0, pageNumber - 1))}
                                    />
                                    <p>Page {pageNumber + 1} of {pageCount}</p>
                                    <ArrowForwardIosIcon
                                        className={`user-applications-pagination-icons ${pageNumber + 1 === pageCount && "pagination-disabled"}`}
                                        onClick={() => setPageNumber(pageNumber => Math.min(pageCount - 1, pageNumber + 1))}
                                    />
                                </div>
                            </div>
                        }
                    </>

                }
                <DeleteModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} deleteApplication={deleteApplication} />
                <Snackbar open={openSuccessSnackbar} autoHideDuration={5000} onClose={() => setOpenSuccessSnackbar(false)}>
                    <Alert
                        onClose={() => setOpenSuccessSnackbar(false)}
                        severity='success'
                        variant='filled'
                        sx={{ width: "100%" }}
                    >Deleted application successfully</Alert>
                </Snackbar>
            </section>
        </Layout>
    )
}