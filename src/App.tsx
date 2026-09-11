import { useAppDispatch, useAppSelector } from "./hooks";
import { logout } from "./store";
import { Dashboard, LoginPage } from "./components/index";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return user ? (
    <Dashboard onLogout={() => dispatch(logout())} />
  ) : (
    <LoginPage />
  );
}

export default App;
