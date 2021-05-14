import { useState, useEffect } from 'react';

import PageLayout from '../../components/PageLayout';
import TransactionListItem from './TransactionListItem';
import LabelsModal from './LabelsModal';
import * as constants from './constants';
import './style.css';

const Transactions = () => {

    // Load transactions
    const [transactions, setTransactions] = useState(null);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        setIsError(false);

        fetch("/transactions")
        .then((response) => {
            if (!response.ok) {
            throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            setTransactions(response.items);
        })
        .catch((error) => {
            setIsError(true);
            console.error(error);
        })
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
            <div>
                { isError && <div>{constants.LOAD_ERROR}</div> }
                { transactions && transactions.map(transaction => (
                    <TransactionListItem
                        transaction={transaction}
                        handleLabelsClick={handleLabelsClick}
                        key={transaction.id} 
                    />
                ))}
            </div>
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
