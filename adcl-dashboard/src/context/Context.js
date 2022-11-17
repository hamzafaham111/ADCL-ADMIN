import { createContext, useState } from "react";

const ADCLContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [val, setVal] = useState(true)
    return (
        <ADCLContext.Provider value={{ val, setVal }
        }>
            {children}
        </ADCLContext.Provider>
    )
}

export default ADCLContext;