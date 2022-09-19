import React from "react";
import { Link } from "react-router-dom";
import { TreeDto } from "../../models/TreeDto";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

interface Props {
  tree: TreeDto;
  img: string;
  onDelete: () => void;
}

const Tree: React.FC<Props> = ({ tree, img, onDelete }) => {
  return (
    <div className="tree">
      <div className="avatar-wrapper">
        <img src={img} alt="" className="avatar" />
      </div>

      <div className="tree-content">
        <p className="tree-owner">
          {tree.species}
          <small className="timestamp">
            {new Date(tree.created).toLocaleDateString()}
          </small>
        </p>
        <p className="tree-text">Est year: {tree.year}</p>
        <p className="tree-text">Height (m): {tree.height}</p>
        <p className="tree-text">Trunk circ (m): {tree.trunkCircumference}</p>
      </div>

      <div className="tree-actions">
        <MdDeleteOutline className="text-red" size="28" onClick={onDelete} />
        <Link to={`/edit-tree/${tree.id}`}>
          <MdEdit size="28" />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Tree;
