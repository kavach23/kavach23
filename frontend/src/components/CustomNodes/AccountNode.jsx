import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { SizeCalculator } from "../../utils/Calculator";
import "./AccountNode.scss";

function AccountNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      className="account-node nodrag d-flex"
      style={{
        minHeight: data.money * 0.1 + "px",
        minWidth: data.money * 0.1 + "px",
      }}
    >
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <Handle type="source" position={Position.Right} isConnectable={false} />
      <p className="identifier flex-fill text-center align-self-center">
        {data.identifier}
      </p>
    </div>
  );
}

export default AccountNode;
