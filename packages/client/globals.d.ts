declare module '*.svg' {
    const content: string;
    export default content;
}

declare global {
    interface Window {
        _devTools: {
            [key: string]: any
        };
    }
}

export {};