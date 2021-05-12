import './style.css';

const Tag = ({ label }) => {
    const styleBackground = () => {
        switch(label) {
            case 'Business':
                return 'pink';
            case 'Expensable':
                return 'purple';
            case 'Suspicious Transaction':
                return 'red';
            default:
                return 'rgb(231, 231, 231';
        }
    };

    return (
        <div
            className="Tag"
            style={{background: styleBackground()}}
        >
            {label}
        </div>
    );
}

export default Tag;