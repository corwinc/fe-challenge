import PropTypes, { arrayOf } from 'prop-types';
import Label from '../../../components/Label';
import { TITLE } from './constants';
import './style.css';

const LabelsModal = ({ transaction, labels, toggleLabel, handleClose }) => {
    const isSelected = (id) => (transaction.labels.map(label => label.id).includes(id));

    return (
        <div className="Modal-overlay">
            <div className="Modal-container">
                <div className="Modal-close" onClick={handleClose}>&#x2715;</div>
                <div className="Modal-title">{`${TITLE}${transaction.text}`}</div>
                <div className="Modal-labels">
                    { labels.map(label => (
                        <Label
                            label={label}
                            onClick={e => toggleLabel(e.target.dataset.id, isSelected(label.id))}
                            isSelected={isSelected(label.id)}
                            key={label.id} 
                        />
                    )) }
                </div>
            </div>
        </div>
    );
};

LabelsModal.propTypes = {
    transaction: PropTypes.object.isRequired,
    labels: PropTypes.array.isRequired,
    toggleLabel: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default LabelsModal;