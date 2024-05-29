import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Application } from '../interfaces/Application';
import { MenuItem, Select, TextField } from '@mui/material';

interface Props {
    open: boolean,
    handleClose: () => void,
    submitApplication: (app: Partial<Application>) => void
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

export const NewAppModal: React.FC<Props> = ({ open, handleClose, submitApplication }) => {

    const [name, setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [compensation, setCompensation] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [status, setStatus] = useState<string>('APPLIED');
    const [additionalInfo, setAdditionalInfo] = useState<string>("");


    const determineIfDisabled = () => {
        if (name === "" || title === "" || compensation === "" || location === "" || status === "") return true;
        return false;
    }

    const sendBackValues = () => {
        let obj = {
            companyName: name,
            positionTitle: title,
            location: location,
            status: status,
            additionalInfo: additionalInfo,
            compensation: compensation
        }
        submitApplication(obj);
        setName("");
        setCompensation("");
        setLocation("");
        setStatus("APPLIED");
        setAdditionalInfo("");
        setTitle("");
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
                    <Typography id="modal-modal-title" variant="h3" component="h3" style={{overflow: 'hidden'}}>
                        <b>New Application</b>
                    </Typography>
                    <div className="edit-modal-row">
                        <TextField onChange={e => setName(e.target.value)} label="Company Name" variant='outlined' value={name} />
                        <TextField onChange={e => setTitle(e.target.value)} label="Position Title" variant='outlined' value={title} />
                        <TextField onChange={e => setCompensation(e.target.value)} label="Compensation" variant='outlined' value={compensation} />

                    </div>
                    <div className="edit-modal-row">
                        <TextField onChange={e => setLocation(e.target.value)} label="Location" variant='outlined' value={location} />
                        <TextField onChange={e => setAdditionalInfo(e.target.value)} label="Addition Info" variant='outlined' value={additionalInfo} />
                        <Select placeholder='Application Status' onChange={e => setStatus(e.target.value)} value={status} defaultValue='APPLIED'>
                            <MenuItem value="APPLIED">Applied</MenuItem>
                            <MenuItem value="OFFER">Offer</MenuItem>
                            <MenuItem value="WAITLISTED">Waitlisted</MenuItem>
                            <MenuItem value="ROUND_1">Round 1</MenuItem>
                            <MenuItem value="ROUND_2">Round 2</MenuItem>
                            <MenuItem value="ROUND_3">Round 3</MenuItem>
                            <MenuItem value="ROUND_4">Round 4</MenuItem>
                            <MenuItem value="ROUND_5">Round 5</MenuItem>
                            <MenuItem value="REJECTED">Rejected</MenuItem>
                        </Select>
                    </div>
                    <Button onClick={() => determineIfDisabled() ? null : sendBackValues()} disabled={determineIfDisabled()} style={{ margin: '10px auto', display: 'block' }} variant='contained' color='success'>Add application</Button>
                </Box>
            </Modal>
        </div>
    );
}
