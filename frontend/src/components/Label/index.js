import PropTypes from 'prop-types';

import './style.css';

const Label = ({ label, onClick, isSelected }) => (
    <div
        className={`Label ${isSelected ? '' : 'Unselected'}`}
        id={`_${label.id}`}
        data-id={label.id}
        onClick={onClick}
    >
        {label.name}
    </div>
);

Label.propTypes = {
    label: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool
};

Label.defaultProps = {
    isSelected: true
}

export default Label;