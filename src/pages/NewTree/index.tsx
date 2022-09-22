import React from "react";
import { useNavigate } from "react-router-dom";
import withRoles from "../../hooks/withRoles";
import { Roles } from "../../models/UserDto";
import TopNavigation from "../../components/TopNavigation";
import TreeForm from "../../components/TreeForm";
import { TreeDto } from "../../models/TreeDto";
import { updateFirestore, useAuth } from "../../hooks/useAuth";
import { arrayUnion } from "firebase/firestore";

const NewTree: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (tree: TreeDto) => {
    updateFirestore("trees", user!.uid, {
      trees: arrayUnion({ ...tree, created: new Date().toISOString() }),
      lastUpdate: new Date()
    }).then(() => navigate("/"));
  };

  return (
    <div className="content-container">
      <TopNavigation title="New tree" />

      <TreeForm
        tree={{
          id: new Date().getMilliseconds().toString(),
          species: "",
          year: 1950,
          trunkCircumference: 20,
          height: 10,
          created: new Date().toISOString()
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default withRoles(NewTree, [Roles.User]);
