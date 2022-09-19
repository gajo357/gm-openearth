import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestoreDoc, setFirestoreDoc, useAuth } from "../../hooks/useAuth";
import { MdLibraryAdd } from "react-icons/md";
import withRoles from "../../hooks/withRoles";
import { Roles } from "../../models/UserDto";
import TopNavigation from "../../components/TopNavigation";
import { TreesDto } from "../../models/TreeDto";
import Tree from "./Tree";

const MyTrees: React.FC = () => {
  const { user } = useAuth();
  const [trees, setTrees] = useState<TreesDto>({ trees: [], lastUpdate: "" });
  const [treeImgs, setTreeImgs] = useState<string[]>([]);

  useEffect(() => {
    const getTrees = () => {
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
    getTrees();
  }, []);

  useEffect(() => {
    const fetchImgs = async () => {
      const response = await fetch(
        "https://tree-nation.com/api/projects/3/species"
      );
      const responseJson = await response.json();
      const images = await Promise.all(
        responseJson.map((d: { id: number }) =>
          fetch(`https://tree-nation.com/api/species/${d.id}`)
            .then(response => response.json())
            .then((data: { image: string }) => data.image)
        )
      );
      setTreeImgs(images);
    };

    fetchImgs();
  }, []);

  return (
    <div className="content-container">
      <TopNavigation title="Account">
        <Link to="new-tree">
          <MdLibraryAdd size="24" className="top-navigation-icon" />
        </Link>
      </TopNavigation>

      <div className="content-list">
        {trees.trees.map(tree => (
          <Tree
            tree={tree}
            onDelete={() => {}}
            img={treeImgs[Math.round(Math.random() * treeImgs.length)]}
          />
        ))}
      </div>
    </div>
  );
};

export default withRoles(MyTrees, [Roles.User]);
