import '../../css/bottom_design_edge.scss';
import edge_details from './edge_details.json';
const EdgeTransactions = () => {


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="fitem">Unique Id:<b>{edge_details[0].unique_id}</b></div> 
        </div>
        <div className="col">
          <div className="fitem">Name:<b>{edge_details[0].name}</b></div> 
        </div>
        <div className="col">
          <div className="fitem">Acc. No.:<b>{edge_details[0].account_number}</b></div> 
        </div>
        <div className="col">
          <div className="fitem">Number of transactions:<b>{edge_details[0].number_of_transaction}</b></div> 
        </div> 
      </div>
      <div className="row">
        <div className="col">
          <div className="fitem">Amount Sent:<b>{edge_details[0].total_money_in}</b></div> 
        </div>
        <div className="col">
          <div className="fitem">Amount Received::<b>{edge_details[0].total_money_out}</b></div> 
        </div>
        <div className="col">
          <div className="fitem"><button>Transaction Details</button></div> 
        </div>
      </div>
    </div>
  );
};

export default EdgeTransactions;

