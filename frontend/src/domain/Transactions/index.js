import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';


import PageLayout from '../../components/PageLayout';
import TransactionListItem from './TransactionListItem';
import LabelsModal from './LabelsModal';
import { 
    TITLE, 
    LOAD_TRANSACTIONS_ERROR, 
    LOAD_LABELS_ERROR 
} from './constants';
import './style.css';

const Transactions = () => {
    const requestSize = 50;

    // Load transactions
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(null);
    const [isTransactionsError, setIsTransactionsError] = useState(false);

    const loadTransactions = (page) => {
        const url = `/transactions?page=${page}&size=${requestSize}`;
        setIsTransactionsError(false);

        fetch(url)
        .then((response) => {
            if (!response.ok) {
            throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            const updatedTransactions = [...transactions, ...response.items];
            setTransactions(updatedTransactions);
            setTotal(response.total);
        })
        .catch((error) => {
            setIsTransactionsError(true);
            console.error(error);
        })
    };

    useEffect(() => {
        loadTransactions(0);
    }, []);

    // Load available labels
    const [labels, setLabels] = useState(null);
    const [isLabelsError, setIsLabelsError] = useState(false);
    useEffect(() => {
        setIsLabelsError(false);
        fetch("/labels")
        .then((response) => {
            if (!response.ok) {
            throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            setLabels(response);
        })
        .catch((error) => {
            setIsLabelsError(true);
            console.error(error);
        })
    }, []);

    // Select transaction for tags editing in modal
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isLabelToggleError, setIsLabelToggleError] = useState(false);
    const handleLabelsClick = (transaction) => {
        setSelectedTransaction(transaction);
    }

    const handleModalClose = () => {
        setSelectedTransaction(null);
    }

    const setTransactionLabels = (response) => {
        const updatedTransaction = Object.assign({}, {
            ...selectedTransaction,
            'labels': response
        });
        setSelectedTransaction(updatedTransaction);

        const updatedTransactions = transactions.map(transaction => (
            transaction.id == selectedTransaction.id
                ? updatedTransaction
                : transaction
        ));
        setTransactions(updatedTransactions);
    };

    const toggleLabel = (labelId, isSelected) => {
        const url = isSelected 
            ? `/transactions/${selectedTransaction.id}/labels/${labelId}`
            : `/transactions/${selectedTransaction.id}/labels`;
        
        const options = isSelected 
        ? { method: 'DELETE'}
        : { method: 'PUT', body: JSON.stringify({ id: labelId }) };

        setIsLabelToggleError(false);

        fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
                }
                return response.json();
        })
        .then((response) => {
            setTransactionLabels(response);
        })
        .catch((error) => {
            setIsLabelToggleError(true);
            console.error(error);
        });
    };

    return (
        <PageLayout title={TITLE}>
            { isTransactionsError && <div>{LOAD_TRANSACTIONS_ERROR}</div> }
            { isLabelsError && <div>{LOAD_LABELS_ERROR}</div> }
            <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={loadTransactions}
                hasMore={(transactions.length < total) ? true : false}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                { transactions && transactions.map(transaction => (
                    <TransactionListItem
                        transaction={transaction}
                        handleLabelsClick={handleLabelsClick}
                        key={transaction.id} 
                    />
                ))}
            </InfiniteScroll>
            { selectedTransaction && (
                <LabelsModal 
                    transaction={selectedTransaction} 
                    labels={labels}
                    toggleLabel={toggleLabel}
                    handleClose={handleModalClose}
                    isError={isLabelToggleError}
                />
            )}
        </PageLayout>
    );
};

export default Transactions;
