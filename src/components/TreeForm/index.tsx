import React, { useCallback, useEffect, useState } from "react";
import { setFirestoreDoc } from "../../hooks/useAuth";
import { TreeDto } from "../../models/TreeDto";

interface Props {
  tree: TreeDto;
  onSubmit: (tree: TreeDto) => void;
}

const TreeForm: React.FC<Props> = ({ tree, onSubmit: onSubmitParent }) => {
  const [formData, setFormData] = useState(tree);

  useEffect(() => {
    setFormData(tree);
  }, [tree]);

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      onSubmitParent(formData);
    },
    [formData]
  );

  return (
    <div className="flex justify-center items-center flex-wrap mx-auto p-2">
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <input
            type="text"
            className="form-input"
            placeholder="Species"
            value={formData.species}
            onChange={e =>
              setFormData(f => ({ ...f, species: e.target.value }))
            }
          />
        </div>

        <div className="mb-6">
          <input
            type="number"
            className="form-input"
            placeholder="Est year of planting"
            min={1500}
            max={2023}
            value={formData.year}
            onChange={e =>
              setFormData(f => ({ ...f, year: parseInt(e.target.value) }))
            }
          />
        </div>

        <div className="mb-6">
          <input
            type="number"
            className="form-input"
            placeholder="Height (m)"
            min={0}
            max={300}
            value={formData.height}
            onChange={e =>
              setFormData(f => ({ ...f, height: parseInt(e.target.value) }))
            }
          />
        </div>

        <div className="mb-6">
          <input
            type="number"
            className="form-input"
            placeholder="Trunk circumference (m)"
            min={0}
            max={300}
            value={formData.trunkCircumference}
            onChange={e =>
              setFormData(f => ({
                ...f,
                trunkCircumference: parseInt(e.target.value)
              }))
            }
          />
        </div>

        <div className="text-center">
          <button type="submit" className="submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TreeForm;
