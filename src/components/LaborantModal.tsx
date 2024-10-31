import '../App.css';
import { useDispatch } from 'react-redux';
import { laborantModalFunc } from '../redux/laborantModalSlice';
import { GrClose } from "react-icons/gr";
import React from 'react';

type LaborantModalProps = {
    title: string;
    content: React.ReactNode;
}

export const LaborantModal: React.FC<LaborantModalProps> = ({ title, content }) => {
    const dispatch = useDispatch();

    return (
        <div className="modal-overlay">
            <div className="laborant-input-container">
                <div className="header-container">
                    <h2>{title}</h2>
                    <GrClose size={36} style={{ cursor: 'pointer' }} onClick={() => dispatch(laborantModalFunc())} />
                </div>
                <form className="laborant-form">
                    {content}
                </form>
            </div>
        </div>
    );
}

export default LaborantModal;
