import './bottom_design_edge.scss';
import edge_details from './edge_details.json';
const EdgeTransactions = () => {


  return (
    <div className="edge_transaction">
    <div className="container">
      <div className="row row-cols-3">
        <div className="col">
          <div className="fitem">Unique Id:{edge_details[0].unique_id}</div> 
        </div>
        <div className="col">
          <div className="fitem">Name:{edge_details[0].name}</div> 
        </div>
        <div className="col">
          <div className="fitem">Acc. No.:{edge_details[0].account_number}</div> 
        </div>
        <div className="col">
          <div className="fitem">Number of transactions:{edge_details[0].number_of_transaction}</div> 
        </div> 
        <div className="col">
          <div className="fitem">Amount Sent:{edge_details[0].total_money_in}</div> 
        </div>
        <div className="col">
          <div className="fitem">Amount Received::{edge_details[0].total_money_out}</div> 
        </div>
        </div>
        <div className="row row-cols-1">
        <div className="col">
          <div className="fitem"><button>Transaction Details</button></div> 
        </div>
        </div>
    </div>
    </div>
  );
};

export default EdgeTransactions;

