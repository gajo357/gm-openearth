import React, { useCallback, useEffect, useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import { getFirestoreDoc, setFirestoreDoc, useAuth } from "../../hooks/useAuth";
import withRoles from "../../hooks/withRoles";
import { Roles } from "../../models/UserDto";

const Account: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const getAccount = () => {
    return getFirestoreDoc("account", user!.uid)
      .then(async doc => {
        if (!doc.exists()) {
          await setFirestoreDoc("account", user!.uid, {
            name,
            address
          });
          return { name, address };
        } else {
          return doc.data();
        }
      })
      .then(data => {
        setName(data.name);
        setAddress(data.address);
      });
  };

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      setFirestoreDoc("account", user!.uid, {
        name,
        address
      }).then(() => getAccount());
    },
    [name, address]
  );

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="content-container">
      <TopNavigation title="Account" />

      <div className="flex justify-center items-center flex-wrap mx-auto p-2">
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="primary-button inline-block px-7 py-3 font-medium text-sm leading-snug uppercase"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRoles(Account, [Roles.User]);
