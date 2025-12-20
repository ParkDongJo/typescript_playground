import React, { useContext } from "react";

type ContextProps = {
  authenticated: boolean;
  lang: string;
  theme: string;
}

function createContext<Props extends {}>() {
  const ctx = React.createContext<Props | undefined>(undefined);
  
  function useInnerContext() {
    const c = useContext(ctx);
    if (c === undefined) {
      throw new Error("useInnerContext must be used within a Provider");
    }
    return c;
  }
  return [useInnerContext, ctx.Provider] as const;
}

const AppContext = React.createContext<Partial<ContextProps>>({});

// const [useAppContext, AppContextProvider] = createContext<ContextProps>();

function Header() {
  return (
    <AppContext.Consumer>
      {({ authenticated, lang, theme }) => {
        if (authenticated && lang && theme) {
          return (
            <>
              <h1>Welcome!</h1>
              <p>Welcome to the app {lang} {theme}</p>
            </>
          )
        }
        return (<h1>Please sign up</h1>)
      }}
    </AppContext.Consumer>
  )
}

function App() {
  return (
    <AppContext.Provider 
      value={{ 
        authenticated: true, 
      }}
    >
      <Header />
    </AppContext.Provider>
  )
}

export default App;