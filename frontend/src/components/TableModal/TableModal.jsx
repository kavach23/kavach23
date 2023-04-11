import { useState } from "react";
import "./TableModal.scss";
import Modal from "react-bootstrap/Modal";

let accounts = [
  {
    uid: "1",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "2",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "3",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "4",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "5",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "6",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "7",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "8",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "9",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "10",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "11",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "12",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "13",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "14",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "15",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "16",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "17",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "18",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "19",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
  {
    uid: "20",
    identifier: "Name - John Doe",
    moneyIn: "₹1,20,000",
    moneyOut: "₹3,00,000",
    transactions: 7,
  },
];

let transactions = [
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
  {
    uid: 1,
    from: "Name: Jane Doe",
    to: "UPI: 1234567789@oksbi",
    amount: "₹10,000",
    date: "2023-04-10",
    type: "UPI",
  },
];

const AccountCard = (props) => {
  return (
    <div className="table-card row">
      <h6 className="text-center m-0 col-1 uid rb">{props.uid}</h6>
      <h6 className="text-center m-0 col-5 id rb">{props.identifier}</h6>
      <h6 className="text-center m-0 col-2 mi rb">{props.moneyIn}</h6>
      <h6 className="text-center m-0 col-2 mo rb">{props.moneyOut}</h6>
      <h6 className="text-center m-0 col-2 tr">{props.transactions}</h6>
    </div>
  );
};

const TxnCard = (props) => {
  return (
    <div className="table-card row">
      <h6 className="text-center m-0 col-1 uid rb">{props.uid}</h6>
      <h6 className="text-center m-0 col-3 id rb">{props.from}</h6>
      <h6 className="text-center m-0 col-3 mi rb">{props.to}</h6>
      <h6 className="text-center m-0 col-2 mo rb">{props.amount}</h6>
      <h6 className="text-center m-0 col-2 mo rb">{props.date}</h6>
      <h6 className="text-center m-0 col-1 tr">{props.type}</h6>
    </div>
  );
};

const AccountsBody = (props) => {
  return (
    <div className="acc-body">
      <div className="table-header row">
        <h6 className="text-center m-0 col-1 uid rb">UID</h6>
        <h6 className="text-center m-0 col-5 id rb">Identifier</h6>
        <h6 className="text-center m-0 col-2 mi rb">Money In</h6>
        <h6 className="text-center m-0 col-2 mo rb">Money Out</h6>
        <h6 className="text-center m-0 col-2 tr">Transactions</h6>
      </div>
      <div className="scrollable">
        {accounts.map((account) => (
          <AccountCard
            key={account.uid}
            uid={account.uid}
            identifier={account.identifier}
            moneyIn={account.moneyIn}
            moneyOut={account.moneyOut}
            transactions={account.transactions}
          />
        ))}
      </div>
    </div>
  );
};

const TransactionsBody = (props) => {
  return (
    <div className="acc-body">
      <div className="table-header row">
        <h6 className="text-center m-0 col-1 uid rb">UID</h6>
        <h6 className="text-center m-0 col-3 id rb">From</h6>
        <h6 className="text-center m-0 col-3 mi rb">To</h6>
        <h6 className="text-center m-0 col-2 mo rb">Amount</h6>
        <h6 className="text-center m-0 col-2 mo rb">Date</h6>
        <h6 className="text-center m-0 col-1 tr">Type</h6>
      </div>
      <div className="scrollable">
        {transactions.map((transaction) => (
          <TxnCard
            uid={transaction.uid}
            from={transaction.from}
            to={transaction.to}
            amount={transaction.amount}
            date={transaction.date}
            type={transaction.type}
          />
        ))}
      </div>
    </div>
  );
};

const TableModal = (props) => {
  const [displaying, setDisplaying] = useState("accounts");
  return (
    <div>
      <Modal
        className="table-modal"
        show={props.show}
        size="lg"
        onHide={() => props.setShowTableModal(false)}
        centered
      >
        <Modal.Header
          id="contained-modal-title-vcenter"
          className="mx-auto b-0"
        >
          <h4 className="m-0">List of {displaying}</h4>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div className="d-flex flex-row">
            <button
              className={`flex-fill header-btn ${
                displaying === "accounts" && "btn-selected"
              }`}
              onClick={() => setDisplaying("accounts")}
            >
              Accounts
            </button>
            <button
              className={`flex-fill header-btn ${
                displaying === "transactions" && "btn-selected"
              }`}
              onClick={() => setDisplaying("transactions")}
            >
              Transactions
            </button>
          </div>
          {displaying === "accounts" && <AccountsBody />}
          {displaying === "transactions" && <TransactionsBody />}
          <button className="export">Export as CSV</button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TableModal;
