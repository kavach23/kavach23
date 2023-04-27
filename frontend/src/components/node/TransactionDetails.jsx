import "./bottom_design_node.scss";
import data from "./node_details.json";

const TransactionDetails = () => {
  return (
    <div className="node_transaction">
      <div className="container">
        <div className="row row-cols-3">
          <div className="col">
            <div className="fitem">
              <span>Unique Id:</span>
              {data[0].unique_id}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Name:</span>
              {data[0].name}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Acc. No.:</span>
              {data[0].account_number}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>UPI_ID:</span>
              {data[0].upi_id}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Ph. No.:</span>
              {data[0].phone_number}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>UPI Vendor:</span>
              {data[0].upi_vendor}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Transaction Count:</span>
              {data[0].number_of_transactions}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Money in:</span>
              {data[0].total_money_in}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Money out:</span>
              {data[0].total_money_out}
            </div>
          </div>

          <div className="col">
            <div className="fitem">
              <span>Bank name:</span>
              {data[0].bank_name}
            </div>
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
