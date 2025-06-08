import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toaster } from "../components/ui/toaster"

export function useLocationToast(){
    const location = useLocation();
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get("toastTitle");
        const description = params.get("toastDescription");
        const type = params.get("toastType") || "info";

        const toastFromState = location.state?.toast;

        if (toastFromState) {
            const { title, description, type } = toastFromState;
            toaster.create({
                title: title,
                description: description,
                type: type
            });

            window.history.replaceState({}, document.title);
        } else if (title && description){
            toaster.create({
                title: title,
                description: description,
                type: type
            });

            const cleanUrl = location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }, [location]);
}