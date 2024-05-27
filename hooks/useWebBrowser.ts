import { useState } from 'react'
import * as WebBrowser from 'expo-web-browser';

export type WebBrowserOpenAction = (url: string) => Promise<void>;

export function useWebBrowser(): WebBrowserOpenAction {
    const [result, setResult] =
        useState<WebBrowser.WebBrowserAuthSessionResult | null>(null);
    return async (url: string) => {
        let res = await WebBrowser.openBrowserAsync(url);
        setResult(res);
    };
}