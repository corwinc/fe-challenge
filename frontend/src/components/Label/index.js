import './style.css';

const Label = ({ label, onClick, isSelected = true }) => (
    <div
        className={`Label ${isSelected ? '' : 'Unselected'}`}
        id={`_${label.id}`}
        data-id={label.id}
        onClick={onClick}
    >
        {label.name}
    </div>
);

export default Label;