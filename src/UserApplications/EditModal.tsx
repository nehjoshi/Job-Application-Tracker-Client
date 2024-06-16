import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Application } from '../interfaces/Application';
import { MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import styles from './UserApplications.module.scss';
import dayjs from 'dayjs';

interface Props {
    open: boolean,
    handleClose: () => void,
    application: Application | null,
    editApplication: (app: Application) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: "1px solid transparent",
    boxShadow: 24,
    p: 4,
};

export const EditModal: React.FC<Props> = ({ open, handleClose, application, editApplication }) => {

    const [name, setName] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [compensation, setCompensation] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [dateApplied, setDateApplied] = useState<string | Date>();

    console.log(application);

    useEffect(() => {
        setName(application?.companyName!);
        setTitle(application?.positionTitle!);
        setCompensation(application?.compensation!);
        setLocation(application?.location!);
        setStatus(application?.status!);
        setDateApplied(application?.dateApplied!)
    }, [application])

    const determineIfDisabled = () => {
        if (name === "" || title === "" || compensation === "" || location === "" || status === "") return true;
        return false;
    }

    const sendBackValues = () => {
        let obj = {
            applicationId: application?.applicationId!,
            companyName: name || application?.companyName!,
            positionTitle: title || application?.positionTitle!,
            location: location || application?.location!,
            status: status || application?.status!,
            dateApplied: dateApplied || application?.dateApplied!,
            additionalInfo: application?.additionalInfo!,
            compensation: compensation || application?.compensation!
        }
        editApplication(obj);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h3" style={{ overflow: 'hidden' }}>
                        <b>Edit Application</b>
                    </Typography>
                    <div className={styles.editModalRow}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={dayjs(dateApplied)} onChange={date => setDateApplied(date?.toISOString())} className={styles.modalRowItem} label="Basic date picker" />
                        </LocalizationProvider>
                        <TextField className={styles.modalRowItem} onChange={e => setName(e.target.value)} label="Company Name" variant='standard' value={name} />
                        <TextField className={styles.modalRowItem} onChange={e => setTitle(e.target.value)} label="Position Title" variant='standard' value={title} />

                    </div>
                    <div className={styles.editModalRow}>
                        <TextField className={styles.modalRowItem} onChange={e => setCompensation(e.target.value)} label="Compensation" variant='standard' value={compensation} />
                        <TextField className={styles.modalRowItem} onChange={e => setLocation(e.target.value)} label="Location" variant='standard' value={location} />
                        <Select className={styles.modalRowItem} placeholder='Application Status' onChange={e => setStatus(e.target.value)} value={status} variant='standard'>
                            <MenuItem value="APPLIED">Applied</MenuItem>
                            <MenuItem value="OFFER">Offer</MenuItem>
                            <MenuItem value="CODING_TEST">Coding Test</MenuItem>
                            <MenuItem value="WAITLISTED">Waitlisted</MenuItem>
                            <MenuItem value="ROUND_1">Round 1</MenuItem>
                            <MenuItem value="ROUND_2">Round 2</MenuItem>
                            <MenuItem value="ROUND_3">Round 3</MenuItem>
                            <MenuItem value="ROUND_4">Round 4</MenuItem>
                            <MenuItem value="ROUND_5">Round 5</MenuItem>
                            <MenuItem value="REJECTED">Rejected</MenuItem>
                        </Select>
                    </div>
                    <Button onClick={() => determineIfDisabled() ? null : sendBackValues()} disabled={determineIfDisabled()} style={{ margin: '10px auto', display: 'block' }} variant='contained' color='success'>Save Changes</Button>
                </Box>
            </Modal>
        </div>
    );
}
