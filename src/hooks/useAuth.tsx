import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  ReactNode
} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User as FbUser
} from "firebase/auth";
import { Roles } from "../models/UserDto";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8gsH55PIrOw4CwfXCGaVm5h-wFMZur9Y",
  authDomain: "calories-740cc.firebaseapp.com",
  projectId: "calories-740cc",
  storageBucket: "calories-740cc.appspot.com",
  messagingSenderId: "765333331814",
  appId: "1:765333331814:web:5dd886702e9448746772a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

interface ContextProps {
  user: FbUser | undefined;
  roles: Roles[];
  authenticated: boolean;
  isAdmin: boolean;
  loadingAuthState: boolean;
  hasAnyRole: (roles: Roles[]) => boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<ContextProps>({
  user: undefined,
  roles: [],
  authenticated: false,
  isAdmin: false,
  loadingAuthState: false,
  hasAnyRole: () => false,
  login: _ => Promise.resolve(),
  logout: () => Promise.resolve()
});

const useAuth = () => useContext(AuthContext);
const AuthConsumer = AuthContext.Consumer;

interface Props {
  children: ReactNode;
}

const tokenAsString = (token: string | object | undefined) => {
  if (typeof token === "string") return token;
  if (typeof token === "object") return token.toString();
  return "";
};

const extractCustomClaims = async (user: FbUser, forceRefresh?: boolean) => {
  //   const token = await user.getIdTokenResult(forceRefresh);

  return [Roles.User, Roles.Admin];
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<FbUser>();
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [roles, setRoles] = useState<Roles[]>([]);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, async fbUser => {
        try {
          console.log(fbUser);
          if (!fbUser) {
            setUser(undefined);
            setRoles([]);
          } else {
            setUser(fbUser);
            const roles = await extractCustomClaims(fbUser);
            setRoles(roles);
          }

          setLoadingAuthState(false);
        } catch (err) {
          console.error(err);
          err instanceof Error ? alert(err?.message) : alert(err);
        }
      }),
    []
  );

  const login = useCallback((email: string, pass: string) => {
    setLoadingAuthState(true);
    return signInWithEmailAndPassword(firebaseAuth, email, pass)
      .then(() => {}) // small hack to make it Promise<void>
      .catch(error => {
        setLoadingAuthState(false);

        console.log(error);
        // if (error.code === "auth/wrong-password") {
        //   throw new UserError(1601, error.message);
        // }
        throw new Error(error.message);
      });
  }, []);

  const logout = useCallback(() => {
    setLoadingAuthState(true);
    return firebaseAuth.signOut().catch(e => {
      setLoadingAuthState(false);
      throw e;
    });
  }, []);

  const hasAnyRole = useCallback(
    (neededRoles: Roles[]) =>
      neededRoles.find(role => roles.includes(role)) !== undefined,
    [roles]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user ? true : false,
        roles,
        isAdmin: roles.find(r => r === Roles.Admin) !== undefined,
        loadingAuthState,
        hasAnyRole,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthConsumer, useAuth };
