import { useState, useCallback } from "react";

const useHttp = (consumeData) => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (reqConfig) => {
        setIsLoading(true);

        try {
            const response = await fetch(reqConfig.url, {
                method: reqConfig.method || 'GET',
                headers: reqConfig.headers ? reqConfig.headers : {},
                body: reqConfig.body ? JSON.stringify(reqConfig.body) : null
            });

            const data = await response.json();
            consumeData(data);
            
        }catch(e){
            setHasError(true);
        }
        setIsLoading(false);

    }, [consumeData]);

    return { hasError, isLoading, sendRequest };
}

export default useHttp;
