import Label from '../../../components/Label';
import './style.css';

const TransactionListItem = ({ transaction, handleLabelsClick }) => (
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
        { transaction.labels.length == 0
            ? <div className="Labels-add" onClick={() => handleLabelsClick(transaction)}>+</div>
            : (
                <div className="Labels" onClick={() => handleLabelsClick(transaction)}>
                    { transaction.labels.map(label => (
                        <Label key={label.id} transactionId={transaction.id} label={label} />
                    ))}
                </div>
            )
        }

    </div>
);

export default TransactionListItem;