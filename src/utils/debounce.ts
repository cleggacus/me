type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(func: F, delay: number): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null;

    return function debounced(this: any, ...args: Parameters<F>) {
        const context = this;

        clearTimeout(timeoutId!);

        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
