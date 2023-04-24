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

class Queue {
  constructor() {
    this.items = {}
    this.frontIndex = 0
    this.backIndex = 0
  }
  enqueue(item) {
    this.items[this.backIndex] = item
    this.backIndex++
    return item + ' inserted'
  }
  dequeue() {
    const item = this.items[this.frontIndex]
    delete this.items[this.frontIndex]
    this.frontIndex++
    return item
  }
  peek() {
    return this.items[this.frontIndex]
  }
  get printQueue() {
    return this.items;
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length === 0;
  }
}

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

  const [adj, setAdj] = useState([])
  // const [weight, setWeight] = useState()

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
      bank: "SBI"
    };
    var posturl = "http://127.0.0.1:5000/pdf";
    if (mode != "pdf") {
      posturl = "http://127.0.0.1:5000/img";
    }


    const bfs = (adj) => {
      const q = new Queue();
      var done = [];
      var depth = new Array(adj.length + 1);
      for (var i = 0; i < adj.length; i++) {
        if (adj[i].length !== 0) {
          q.enqueue(i);
          depth[i] = 0;
          // done.push(i);
          break;
        }
      }

      while (q.isEmpty !== true) {
        var curr = q.peek();
        if (curr === undefined) break;
        q.dequeue();
        done.push(curr);
        for (var i = 0; i < adj[curr].length; i++) {
          var flag1 = 0;
          for (var k = 0; k < done.length; k++) {
            if (done[k] === adj[curr][i][0]) {
              console.log("Donnee", done[k])
              flag1 = 1;
            }
          }
          if (flag1 === 1) continue;
          depth[adj[curr][i][0]] = depth[curr] + 1;
          q.enqueue(adj[curr][i][0])
        }
        console.log(curr, q.isEmpty(), q.peek());
        // break;

      }

      console.log(depth);
    }


    await axios({
      method: "post",
      url: posturl,
      data: body,
    })
      .then((response) => {
        // const respData = JSON.parse((response.data)[0])

        console.log(response.data)
        // console.log(respData)

        // setEntities([...entities, ...entitylist]);
        // setTransactions([...transactions, ...transactionlist])


        var txns = [];

        for (var i = 0; i < response.data[1].length; i++) {
          var str = response.data[1][i]
          var curr = JSON.parse(str)
          txns.push(curr)
          // console.log(str,curr)
        }

        // console.log(txns)
        setTransactions(txns);

        var ent = [];
        for (var i = 0; i < response.data[0].length; i++) {
          var str = response.data[0][i]
          var curr = JSON.parse(str)
          ent.push(curr)
          // console.log(str,curr)
        }

        setEntities(ent)

        const weights = new Map();

        var adj_temp = new Array(txns.length + 1)

        for (i = 0; i < txns.length; i++) {
          adj_temp[i] = new Array(0);
        }
        console.log(txns)
        for (var i = 0; i < txns.length; i++) {
          var obj = txns[i]
          var u = obj["fromid"]
          var v = obj["toid"]

          // console.log(obj, txns)

          // console.log(u, v, adj_temp[u])
          var flag = 0
          for (var j = 0; j < adj_temp[u].length; j++) {
            if (adj_temp[u][j][0] === v) {

              adj_temp[u][j][1] += parseFloat(obj["value"])
              flag = 1
            }
          }

          if (flag === 0) {
            var val = parseFloat(obj["value"])
            adj_temp[u].push([v, val])
          }

        }

        console.log(adj_temp)
        setAdj(adj_temp);

        bfs(adj_temp);

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
