import { useState, useEffect } from 'react';

import PageLayout from '../../components/PageLayout';
import TransactionListItem from './TransactionListItem';
import LabelsModal from './LabelsModal';
import * as constants from './constants';
import './style.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState(null);
    const [isError, setIsError] = useState(false);

    const [labels, setLabels] = useState(null);

    const [selectedTransaction, setSelectedTransaction] = useState(null);

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

    useEffect(() => {
        // setIsError(false);

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
            // setIsError(true);
            console.error(error);
        })
    }, []);

    const handleLabelsClick = (transaction) => {
        setSelectedTransaction(transaction);
    }

    const updateTransactionLabelState = (response) => {
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

    const addLabel = (labelId) => {
        const url = `/transactions/${selectedTransaction.id}/labels`;
        const data = {
            id: labelId
        };

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
            throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            updateTransactionLabelState(response);
        })
        .catch((error) => {
            // setIsError(true);
            console.error(error);
        })
    }

    const removeLabel = (labelId) => {
        fetch(`/transactions/${selectedTransaction.id}/labels/${labelId}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) {
            throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            updateTransactionLabelState(response);
        })
        .catch((error) => {
            // setIsError(true);
            console.error(error);
        })
    };

    const handleLabelClick = (labelId) => {
        const existingLabelIds = selectedTransaction.labels.map(label => label.id);
        existingLabelIds.includes(labelId) ? removeLabel(labelId) : addLabel(labelId);
    };

    const handleModalClose = () => {
        setSelectedTransaction(null);
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
                    handleLabelClick={handleLabelClick}
                    handleClose={handleModalClose}
                />
            )}
        </PageLayout>
    );
};

export default Transactions;
