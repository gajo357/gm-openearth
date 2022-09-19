import React, { useCallback, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import withOutAuth from "../../hooks/withOutAuth";
import { UserLoginDto } from "../../models/UserDto";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      console.log(email, pass);
      login(email, pass).catch(e => alert(e));
    },
    [login, email, pass]
  );

  return (
    <section className="flex justify-center items-center flex-wrap mx-auto">
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <input
            type="email"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-gray-800 hover:bg-green-600 
            text-green-500 hover:text-white font-medium text-sm leading-snug uppercase rounded shadow-md 
            transition duration-150 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default withOutAuth(Login);
