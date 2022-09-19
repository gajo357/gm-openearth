import { FC } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import LoginSpinner from "./components/LoginSpinner";
import Sidebar from "./components/Sidebar";
import { AuthConsumer, AuthProvider } from "./hooks/useAuth";

const App: FC = () => (
  <AuthProvider>
    <AuthConsumer>
      {({ loadingAuthState, authenticated }) => (
        <div>
          {loadingAuthState ? (
            <LoginSpinner />
          ) : (
            <>
              {authenticated && <Sidebar />}
              <div className="flex">
                <AppRoutes />
              </div>
            </>
          )}
        </div>
      )}
    </AuthConsumer>
  </AuthProvider>
);

export default App;
