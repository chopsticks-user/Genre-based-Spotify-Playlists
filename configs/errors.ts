
export interface PlaytifyError extends Error {

};

export function createError(
    modulePath: string, calleeName: string, error: any): Error {
    return new Error(`${modulePath}/${calleeName}: \n\t${error}`);
}
