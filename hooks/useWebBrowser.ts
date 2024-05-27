import { useState } from 'react'
import * as WebBrowser from 'expo-web-browser';

export function useWebBrowser() {
    const [result, setResult] =
        useState<WebBrowser.WebBrowserAuthSessionResult | null>(null);
    return async (url: string) => {
        let res = await WebBrowser.openBrowserAsync(url);
        setResult(res);
    };
}