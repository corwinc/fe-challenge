import Tag from '../../../components/Tag';
import './style.css';

const TransactionListItem = ({ transaction }) => (
    <div className="Container">
        <div className="Container-left">
            <div className="Data Text">{transaction.text}</div>
            <div className="Data Parties-container">
                <div className="Party">{transaction.source}</div>
                <div> TO  </div>
                <div className="Party">{transaction.target}</div>
            </div>
            <div className="Data Amount">{transaction.amount}</div>
        </div>
        <div className="Tags">
            { transaction.labels.map(label => (
                <Tag key={label.id} transactionId={transaction.id} label={label.name} />
            ))}
        </div>
    </div>
);

export default TransactionListItem;