import { useState, useEffect } from 'react';

import PageLayout from '../../components/PageLayout';
import * as constants from './constants';
import './style.css';
import TransactionListItem from './TransactionListItem';

const Transactions = () => {
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

    return (
        <PageLayout title={constants.TITLE}>
            <div>
                { isError && <div>{constants.LOAD_ERROR}</div> }
                { transactions && transactions.map(transaction => (
                    <TransactionListItem transaction={transaction} key={transaction.id} />
                ))}
            </div>
        </PageLayout>
    );
};

export default Transactions;