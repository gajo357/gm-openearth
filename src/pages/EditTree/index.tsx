import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withRoles from "../../hooks/withRoles";
import { Roles } from "../../models/UserDto";
import TopNavigation from "../../components/TopNavigation";
import TreeForm from "../../components/TreeForm";
import { TreeDto, TreesDto } from "../../models/TreeDto";
import { getFirestoreDoc, setFirestoreDoc, useAuth } from "../../hooks/useAuth";

const EditTree: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trees, setTrees] = useState<TreesDto>({ trees: [], lastUpdate: "" });

  useEffect(() => {
    const getAccount = () => {
      return getFirestoreDoc("trees", user!.uid)
        .then(async doc => {
          if (!doc.exists()) {
            await setFirestoreDoc("trees", user!.uid, trees);
            return trees;
          } else {
            return doc.data() as TreesDto;
          }
        })
        .then(data => {
          setTrees(data);
        });
    };
    getAccount();
  }, []);

  const treeToUpdate = useMemo(
    () => trees.trees.find(t => t.id === id),
    [trees, id]
  );

  const onSubmit = (tree: TreeDto) => {
    setFirestoreDoc("trees", user!.uid, {
      ...trees,
      trees: trees.trees.map(t => (t.id === id ? tree : t)),
      lastUpdate: new Date().toISOString()
    }).then(() => navigate("/"));
  };

  return (
    <div className="content-container">
      <TopNavigation title="New tree" />

      {treeToUpdate && <TreeForm tree={treeToUpdate} onSubmit={onSubmit} />}
    </div>
  );
};

export default withRoles(EditTree, [Roles.User]);
