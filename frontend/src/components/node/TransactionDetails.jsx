import '../../css/bottom_design_node.scss';
import data from './node_details.json';

const TransactionDetails = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <div className="fitem">Unique Id:<b>{data[0].unique_id}</b></div> 
        </div>
        <div className="col-3">
          <div className="fitem">Name:<b>{data[0].name}</b></div> 
        </div>
        <div className="col-4">
          <div className="fitem">Acc. No.:<b>{data[0].account_number}</b></div>
        </div>
        
        <div className="col-3">
          <div className="fitem">UPI_ID:<b>{data[0].upi_id}</b></div>
        </div>
        </div>
        <div className="row">
        <div className="col-5">
          <div className="fitem">Ph. No.:<b>{data[0].phone_number}</b></div>
        </div>
        <div className="col-4">
          <div className="fitem">UPI Vendor:<b>{data[0].upi_vendor}</b></div>
        </div>

        <div className="col-3">
          <div className="fitem">Transaction Count:<b>{data[0].number_of_transactions}</b></div> 
        </div>

      </div>
      <div className="row">
        <div className="col-4">
          <div className="fitem">Money in:<b>{data[0].total_money_in}</b></div> 
        </div>
        <div className="col-4">
          <div className="fitem">Money out:<b>{data[0].total_money_out}</b></div> 
        </div>
        <div className="col-2">
          <div className="fitem">Bank name:<b>{data[0].bank_name}</b></div>
        </div>
        
        <div className="col-1">
          <div className="fitem"><button>View</button></div> 
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;

