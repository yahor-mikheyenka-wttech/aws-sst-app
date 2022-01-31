import { createContext } from "react";

interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (arg: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
	isAuthenticated: false,
  setIsAuthenticated: (arg) => {},
});

export default AppContext;