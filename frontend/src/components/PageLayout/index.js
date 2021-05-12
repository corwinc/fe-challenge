import './style.css';

const PageLayout = ({ title, children }) => (
    <div className="Page">
        { title && (
            <div className="Page-title">{title}</div>
        )}
        { children }
    </div>
);

export default PageLayout;