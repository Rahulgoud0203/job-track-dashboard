import { createContext } from "react";

const ThemeContext = createContext({
  theme: true,
  changeTheme: () => {},
});

export default ThemeContext;
