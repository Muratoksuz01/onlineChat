import { createContext } from "react";

export const AuthContext = createContext({
  username: "",
  id: null,
  status: false,
});
