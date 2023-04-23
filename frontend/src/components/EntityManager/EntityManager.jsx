import "./EntityManager.scss";
import { BsPlusCircleFill, BsTable } from "react-icons/bs";
import AccListItem from "../AccListItem/AccListItem";
import TableModal from "../TableModal/TableModal";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useState, useEffect } from "react";
import storage from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Spinner } from "react-bootstrap";
import axios from "axios";

let files = [
  {
    id: 1,
    name: "File 1",
  },
  {
    id: 2,
    name: "File 2",
  },
  {
    id: 3,
    name: "File 3",
  },
];

let accounts = [
  {
    id: 1,
    name: "Account 1",
  },
  {
    id: 2,
    name: "Account 2",
  },
  {
    id: 3,
    name: "Account 3",
  },
  {
    id: 4,
    name: "Account 4",
  },
  {
    id: 5,
    name: "Account 5",
  },
  {
    id: 6,
    name: "Account 6",
  },
  {
    id: 7,
    name: "Account 7",
  },
  {
    id: 8,
    name: "Account 8",
  },
];

let transactions = [
  {
    id: 1,
    name: "Transaction 1",
  },
  {
    id: 2,
    name: "Transaction 2",
  },
  {
    id: 3,
    name: "Transaction 3",
  },
  {
    id: 4,
    name: "Transaction 4",
  },
  {
    id: 5,
    name: "Transaction 5",
  },
  {
    id: 6,
    name: "Transaction 6",
  },
  {
    id: 7,
    name: "Transaction 7",
  },
  {
    id: 8,
    name: "Transaction 8",
  },
  {
    id: 9,
    name: "Transaction 9",
  },
  {
    id: 10,
    name: "Transaction 10",
  },
  {
    id: 11,
    name: "Transaction 11",
  },
  {
    id: 12,
    name: "Transaction 12",
  },
  {
    id: 13,
    name: "Transaction 13",
  },
  {
    id: 14,
    name: "Transaction 14",
  },
  {
    id: 15,
    name: "Transaction 15",
  },
];

const EntityManager = (props) => {
  const [showPanel, setShowPanel] = useState(false);
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("pdf");
  const [waiting, setWaiting] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

  const [entities, setEntities] = useState([])
  const [transactions, setTransactions] = useState([])

  const upload = async () => {
    var filename = "current.pdf";
    if (mode == "jpg") {
      filename = "current.jpg";
    } else if (mode == "png") {
      filename = "current.png";
    }
    const fileRef = ref(storage, filename);
    await uploadBytes(fileRef, file);
    var fileUrl = await getDownloadURL(fileRef).then((url) => {
      return url;
    });
    return fileUrl;
  };
 

  const submit = async () => {
    setWaiting(true);
    const url = await upload();
    var body = {
      path: url,
      bank : "SBI"
    };
    var posturl = "http://127.0.0.1:5000/pdf";
    if (mode != "pdf") {
      posturl = "http://127.0.0.1:5000/img";
    }

    

    await axios({
      method: "post",
      url: posturl,
      data: body,
    })
      .then((response) => {
        const respData = JSON.parse(response.data)["data"]
        var entitylist = [];
        var transactionlist = [];
        for(var i in respData){
          const entity = JSON.parse(respData[i])
          const tslist = entity["transactions"]
          delete entity.transactions
          entitylist.push(entity)
          transactionlist = transactionlist.concat(tslist)
        }
        setEntities([...entities, ...entitylist]);
        setTransactions([...transactions, ...transactionlist])
      })
      .catch((error) => {
        console.log(error);
      });
    setWaiting(false);
  };

  // useEffect(()=>{
  //   console.log(entities)
  // }, [entities])

  return (
    <div className="entity-manager">
      <TableModal show={showTableModal} setShowTableModal={setShowTableModal} />
      <div className="collapse" id="collapsePanel">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row fileupload">
            <label className="pdfinput m-3">
              <input
                type="file"
                accept="pdf"
                className="hideinput"
                onChange={(event) => {
                  var ext = event.target.value.match(/\.([^\.]+)$/)[1];
                  if (ext == "pdf" || ext == "jpg" || ext == "png") {
                    setFile(event.target.files[0]);
                    setMode(ext);
                  } else {
                    alert("Please select a pdf or an image file.");
                  }
                }}
              />
              {file ? "Change" : "Browse"}
            </label>
            {waiting ? (
              <Spinner className="m-3" />
            ) : (
              <button className="btn btn-primary m-3" onClick={submit}>
                Send
              </button>
            )}
          </div>

          <div className="accordion" id="emAccordian">
            <div className="accordion-item">
              <div className="accordion-header" id="filesHeading">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#filesCollapse"
                  aria-expanded="true"
                  aria-controls="filesCollapse"
                >
                  <div className="inner-btn  d-flex flex-row justify-content-between">
                    <div className="h6 m-0">Files</div>
                    <div className="badge bg-secondary rounded-pill">
                      {files.length}
                    </div>
                  </div>
                </button>
              </div>
              <div
                id="filesCollapse"
                className="accordion-collapse collapse show"
                aria-labelledby="filesHeading"
                data-bs-parent="#emAccordian"
              >
                <div className="accordion-body">
                  {files.map((file) => {
                    return <AccListItem key={file.id}>{file.name}</AccListItem>;
                  })}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <div className="accordion-header" id="entitiesHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#entitiesCollapse"
                  aria-expanded="true"
                  aria-controls="entitiesCollapse"
                >
                  <div className="inner-btn  d-flex flex-row justify-content-between">
                    <div className="h6 m-0">Accounts</div>
                    <div className="badge bg-secondary rounded-pill">
                      {accounts.length}
                    </div>
                  </div>
                </button>
              </div>
              <div
                id="entitiesCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="entitiesHeader"
                data-bs-parent="#emAccordian"
              >
                <div className="accordion-body">
                  {accounts.map((entity) => {
                    return (
                      <AccListItem key={entity.id}>{entity.name}</AccListItem>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <div className="accordion-header" id="transactionsHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transactionsCollapse"
                  aria-expanded="true"
                  aria-controls="transactionsCollapse"
                >
                  <div className="inner-btn  d-flex flex-row justify-content-between">
                    <div className="h6 m-0">Transactions</div>
                    <div className="badge bg-secondary rounded-pill">
                      {transactions.length}
                    </div>
                  </div>
                </button>
              </div>
              <div
                id="transactionsCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transactionsHeader"
                data-bs-parent="#emAccordian"
              >
                <div className="accordion-body">
                  {transactions.map((transaction) => {
                    return (
                      <AccListItem key={transaction.id}>
                        {transaction.name}
                      </AccListItem>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => setShowTableModal(true)} className="table-btn">
            <BsTable /> Show Table
          </button>
        </div>
      </div>
      <button
        className="clp-btn"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePanel"
        onClick={() => {
          setShowPanel((prev) => !prev);
        }}
      >
        {!showPanel && <MdOutlineKeyboardArrowDown />}
        {showPanel && <MdOutlineKeyboardArrowUp />}
      </button>
    </div>
  );
};

export default EntityManager;
