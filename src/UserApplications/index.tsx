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

export const UserApplications: React.FC = () => {

    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchApplications = async () => {
        setLoading(true);
        const res: { applications: Application[], status: number } = await GET();
        if (res.status === 200) {
            setApplications(res.applications);
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
    }

    useEffect(() => {
        fetchApplications();
    }, []);


    return (
        <Layout showSidebar={true} currentPage="apps">
            <section className="user-applications-container">
                <div className='user-applications-header'>
                    <h1 className='user-applications-title'>Your Applications</h1>
                    <button className='user-applications-new-app-button'>New Application</button>
                </div>
                {loading ? <Loader /> :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Date Applied</b></TableCell>
                                    <TableCell align="center"><b>Company</b></TableCell>
                                    <TableCell align="center"><b>Title</b></TableCell>
                                    <TableCell align="center"><b>Compensation</b></TableCell>
                                    <TableCell align="center"><b>Location</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Modify</b></TableCell>
                                    <TableCell align="center"><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applications.map((app) => (
                                    <TableRow
                                        key={app.applicationId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {app.dateApplied.toString()}
                                        </TableCell>
                                        <TableCell align="center">{app.companyName}</TableCell>
                                        <TableCell align="center">{app.positionTitle}</TableCell>
                                        <TableCell align="center">{app.compensation}</TableCell>
                                        <TableCell align="center">{app.location}</TableCell>
                                        <TableCell align="center">{app.status}</TableCell>
                                        <TableCell align="center"><EditIcon className='table-edit-button' /></TableCell>
                                        <TableCell align="center"><DeleteIcon className='table-delete-button' onClick={() => handleDelete(app)} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <DeleteModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} deleteApplication={deleteApplication} />
                <Snackbar open={openSuccessSnackbar} autoHideDuration={5000} onClose={() => setOpenSuccessSnackbar(false)}>
                    <Alert
                        onClose={() => setOpenSuccessSnackbar(false)}
                        severity='success'
                        variant='filled'
                        sx={{ width: "100%" }}
                    >Deleted application Successfully</Alert>
                </Snackbar>
            </section>



        </Layout>
    )
}