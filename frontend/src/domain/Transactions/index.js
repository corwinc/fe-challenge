import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';


import PageLayout from '../../components/PageLayout';
import TransactionListItem from './TransactionListItem';
import LabelsModal from './LabelsModal';
import * as constants from './constants';
import './style.css';

const Transactions = () => {
    const requestSize = 50;

    // Load transactions
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(null);
    const [isError, setIsError] = useState(false);

    const loadTransactions = (page) => {
        const url = `/transactions?page=${page}&size=${requestSize}`;
        setIsError(false);

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
            setIsError(true);
            console.error(error);
        })
    }

    useEffect(() => {
        loadTransactions(0);
    }, []);

    // Load available labels
    const [labels, setLabels] = useState(null);
    useEffect(() => {
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
            console.error(error);
        })
    }, []);

    // Select transaction for tags editing in modal
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const handleLabelsClick = (transaction) => {
        setSelectedTransaction(transaction);
    }

    const handleModalClose = () => {
        setSelectedTransaction(null);
    }

    // Edit labels
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
            // setIsError(true);
            console.error(error);
        })
    }

    return (
        <PageLayout title={constants.TITLE}>
            { isError && <div>{constants.LOAD_ERROR}</div> }
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
                />
            )}
        </PageLayout>
    );
};

export default Transactions;
