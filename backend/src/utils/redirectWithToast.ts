// backend/src/utils/redirectWithToast.ts

import { Response } from "express";

interface ToastRedirectOptions {
    title: string;
    description: string;
    type?: "error" | "success" | "warning" | "info";
    to?: string;
}

export function redirectWithToast(
    res: Response, {
    title,
    description,
    type = "error",
    to = "/entrar"
} : ToastRedirectOptions) {
    const redirectUrl = new URL(`http://localhost:3000${to}`);
    redirectUrl.searchParams.set("toastTitle", title);
    redirectUrl.searchParams.set("toastDescription", description);
    redirectUrl.searchParams.set("toastType", type);
    return res.redirect(redirectUrl.toString());
}