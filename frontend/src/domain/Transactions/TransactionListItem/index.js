import PropTypes from 'prop-types';

import Label from '../../../components/Label';
import './style.css';

const TransactionListItem = ({ transaction, handleLabelsClick }) => (
    <div className="Container">
        <div className="Container-left">
            <div className="Data Text">{transaction.text}</div>
            <div className="Data Parties-container">
                <div>{transaction.source}</div>
                <div>&#10140;</div>
                <div>{transaction.target}</div>
            </div>
        </div>
        <div className="Container-right">
            <div className="Data Amount">{`$${transaction.amount}`}</div>
            { transaction.labels.length == 0
                ? <div className="Labels-add" onClick={() => handleLabelsClick(transaction)}>+</div>
                : (
                    <div className="Labels" onClick={() => handleLabelsClick(transaction)}>
                        { transaction.labels.sort((a,b) => a.name > b.name).map(label => (
                            <Label key={label.id} transactionId={transaction.id} label={label} />
                        ))}
                    </div>
                )
            }
        </div>
    </div>
);

TransactionListItem.propTypes = {
    transaction: PropTypes.object.isRequired,
    handleLabelsClick: PropTypes.func.isRequired
}

export default TransactionListItem;