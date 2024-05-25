


export function createError(
    modulePath: string, calleeName: string, error: any): Error {
    return new Error(`${modulePath}/${arguments.callee.name}: ` + error);
}
