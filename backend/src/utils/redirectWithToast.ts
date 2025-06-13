// backend/src/utils/redirectWithToast.ts

import { Response } from "express";

interface ToastRedirectOptions {
    title: string;
    description: string;
    type?: "error" | "success" | "warning" | "info";
    to?: string;
    json?: boolean;
}

export function redirectWithToast(
    res: Response, {
    title,
    description,
    type = "error",
    to = "/entrar",
    json = false
} : ToastRedirectOptions) {
    if(json) {
        return res.status(400).json({
            toast: {
                title, description, type
            }
        });
    } else {
        const redirectUrl = new URL(`http://localhost:3000${to}`);
        redirectUrl.searchParams.set("toastTitle", title);
        redirectUrl.searchParams.set("toastDescription", description);
        redirectUrl.searchParams.set("toastType", type);
        return res.redirect(redirectUrl.toString());
    }
}