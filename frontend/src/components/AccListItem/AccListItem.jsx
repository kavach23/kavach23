import "./AccListItem.scss";
import { MdDelete } from "react-icons/md";

const AccListItem = (props) => {
  return (
    <div className="acc-list-item">
      <div className="h7">{props.children}</div>
      <MdDelete className="delete-icon" />
    </div>
  );
};

export default AccListItem;
