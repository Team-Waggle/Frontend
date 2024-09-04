'use client'

import { createContext, useContext, useState } from "react"

interface ContextType {
    bIsLogin: boolean;

    setLogin: (flag: boolean) => void;
}

const defaultContext: ContextType = {
    bIsLogin: false,
    setLogin: ()=>{},
}

const MainContext = createContext<ContextType>(defaultContext);



const ContextProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
    const [bIsLogin, setIsLogin] = useState<boolean>(false);

    const setLogin = (flag: boolean) => {
        setIsLogin(flag);
    }

    return(
        <MainContext.Provider value={{bIsLogin, setLogin}}>
            {children}
        </MainContext.Provider>
    )
}

export default ContextProvider;