import './bottom_design_node.scss';
import data from './node_details.json';

const TransactionDetails = () => {
  return (
    <div className="node_transaction">
    <div className="container">
      <div className="row row-cols-3">

        <div className="col">
          <div className="fitem">
            Unique Id:{data[0].unique_id}
          </div> 
        </div>

        <div className="col">
          <div className="fitem">Name:{data[0].name}</div> 
        </div>

        <div className="col">
          <div className="fitem">Acc. No.:{data[0].account_number}</div>
        </div>
        
        <div className="col">
          <div className="fitem">UPI_ID:{data[0].upi_id}</div>
        </div>

        <div className="col">
          <div className="fitem">Ph. No.:{data[0].phone_number}</div>
        </div>

        <div className="col">
          <div className="fitem">UPI Vendor:{data[0].upi_vendor}</div>
        </div>

        <div className="col">
          <div className="fitem">Transaction Count:{data[0].number_of_transactions}</div> 
        </div>

        <div className="col">
          <div className="fitem">Money in:{data[0].total_money_in}</div> 
        </div>

        <div className="col">
          <div className="fitem">Money out:{data[0].total_money_out}</div> 
        </div>

        <div className="col">
          <div className="fitem">Bank name:{data[0].bank_name}</div>
        </div>
        
        <div className="col">
          <div className="fitem">
              <button type="button" class="btn btn-primary" data-toggle="modal">
                  View
              </button>
          </div> 
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default TransactionDetails;

