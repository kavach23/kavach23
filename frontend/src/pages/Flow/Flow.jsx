import "./Flow.scss";
import "reactflow/dist/base.css";

import TransactionDetails from '../../components/node/TransactionDetails';
import EdgeTransactions from '../../components/edge/EdgeTransactions';

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
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

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
        onConnect={onConnect}
        fitView
      >
        <Panel className="bg" position="bottom-center">
        {
          showNodeDetails === true ? 
          <TransactionDetails />
          :
          ""
        }
        {
          showTxPanel === true ? 
          <EdgeTransactions />
          :
          ""
        }
        </Panel>
        <Panel position="top-left">
          <EntityManager />
        </Panel>
        
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Flow;
