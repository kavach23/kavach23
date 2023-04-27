import "./Flow.scss";
import "reactflow/dist/base.css";
// import "../../index1.scss";

import TransactionDetails from "../../components/node/TransactionDetails";
import EdgeTransactions from "../../components/edge/EdgeTransactions";
import AccountNode from "../../components/CustomNodes/AccountNode";

import React, { useCallback } from "react";
import { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";
import EntityManager from "../../components/EntityManager/EntityManager";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { identifier: "Account 1", money: 1000 },
    type: "accountNode",
  },
  {
    id: "2",
    position: { x: 200, y: 100 },
    data: { identifier: "Account 2", money: 400 },
    type: "accountNode",
  },
  {
    id: "3",
    position: { x: 200, y: -100 },
    data: { identifier: "Account 3", money: 200 },
    type: "accountNode",
  },
  {
    id: "4",
    position: { x: -200, y: 150 },
    data: { identifier: "Account 4", money: 500 },
    type: "accountNode",
  },
  {
    id: "5",
    position: { x: -200, y: 0 },
    data: { identifier: "Account 5", money: 100 },
    type: "accountNode",
  },
  {
    id: "6",
    position: { x: -200, y: -150 },
    data: { identifier: "Account 6", money: 300 },
    type: "accountNode",
  },
  {
    id: "7",
    position: { x: -400, y: 100 },
    data: { identifier: "Account 7", money: 600 },
    type: "accountNode",
  },
  {
    id: "8",
    position: { x: -400, y: -100 },
    data: { identifier: "Account 8", money: 700 },
    type: "accountNode",
  },
  {
    id: "9",
    position: { x: 400, y: 0 },
    data: { identifier: "Account 9", money: 800 },
    type: "accountNode",
  },
  {
    id: "10",
    position: { x: 400, y: -200 },
    data: { identifier: "Account 10", money: 900 },
    type: "accountNode",
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    style: { stroke: "black", strokeWidth: 3.6 },
  },
  {
    id: "e3-9",
    source: "3",
    target: "9",
    style: { stroke: "black", strokeWidth: 1.8 },
  },
  {
    id: "e3-10",
    source: "3",
    target: "10",
    style: { stroke: "black", strokeWidth: 1.8 },
  },
  {
    id: "e2-9",
    source: "2",
    target: "9",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "e5-6",
    source: "5",
    target: "1",
    style: { stroke: "black", strokeWidth: 1.5 },
  },
  {
    id: "e6-1",
    source: "6",
    target: "1",
    style: { stroke: "black", strokeWidth: 2 },
  },
  {
    id: "e4-1",
    source: "4",
    target: "1",
    style: { stroke: "black", strokeWidth: 1.9 },
  },
  {
    id: "e8-6",
    source: "8",
    target: "6",
    style: { stroke: "black", strokeWidth: 2 },
  },
  {
    id: "e7-4",
    source: "7",
    target: "4",
    style: { stroke: "black", strokeWidth: 2.3 },
  },
  {
    id: "e7-1",
    source: "7",
    target: "1",
    style: { stroke: "black", strokeWidth: 3 },
  },
];

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
};

const nodeTypes = { accountNode: AccountNode };
const Flow = () => {
  const [showTxPanel, setShowTxPanel] = useState(false);
  const [showNodeDetails, setShowNodeDetails] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleEdgeClick = (event, edge) => {
    setShowNodeDetails(false);
    setShowTxPanel(!showTxPanel);
  };

  const handleNodeClick = (event, edge) => {
    setShowTxPanel(false);
    setShowNodeDetails(!showNodeDetails);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
      >
        <Panel className="bg" position="bottom-center">
          {showNodeDetails === true ? <TransactionDetails /> : ""}
          {showTxPanel === true ? <EdgeTransactions /> : ""}
        </Panel>
        <Panel position="top-left">
          <EntityManager />
        </Panel>

        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
