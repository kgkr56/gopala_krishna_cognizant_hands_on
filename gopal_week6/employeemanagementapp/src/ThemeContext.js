import { createContext } from 'react';

// Creates a new Context with a default value of 'light'.
// Any component nested under a <ThemeContext.Provider> can read this value
// with useContext(), without it being passed down through props.
const ThemeContext = createContext('light');

export default ThemeContext;
