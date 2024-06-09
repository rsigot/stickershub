import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SessionWarningModal({ open, onClose }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="modal-modal-title">Sesión duplicada</h2>
                <p id="modal-modal-description">
                    Ya tienes una sesión activa en otro dispositivo o navegador.
                </p>
                <Button onClick={onClose}>Aceptar</Button>
            </Box>
        </Modal>
    );
}
