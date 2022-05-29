import { useState, useEffect } from "react"

export default function useLocalStorage( key, defaultValue) {
    const [value, setvalue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        //To check if there is an existing object
        if(jsonValue != null){
            return JSON.parse(jsonValue)
        }
        //useState can take both function and values as parameters
        if(typeof defaultValue === "function") {
            return defaultValue()
        }
        else{
            return defaultValue
        }
    })
    //Saving to the local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setvalue]
}