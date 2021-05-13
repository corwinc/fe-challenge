import { useEffect, useState } from 'react';
import Label from '../../../components/Label';
import './style.css';

const LabelsModal = ({ transaction, labels, handleLabelClick, handleClose }) => {
    const isSelected = (id) => {
        const labelIds = transaction.labels.map(label => label.id);
        return labelIds.includes(id);
    }

    return (
        <div className="Modal-overlay">
            <div className="Modal-container">
                <div className="Modal-close" onClick={handleClose}>x</div>
                <div className="Modal-title">{`Edit Labels: ${transaction.text}`}</div>
                <div className="Modal-labels">
                    { labels.map(label => (
                        <Label
                            label={label}
                            onClick={e => handleLabelClick(e.target.dataset.id)}
                            isSelected={isSelected(label.id)}
                            key={label.id} 
                        />
                    )) }
                </div>
            </div>
        </div>
    );
};

export default LabelsModal;