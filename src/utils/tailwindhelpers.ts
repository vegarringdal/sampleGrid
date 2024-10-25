// TODO, maybe replace with tailwind-merge


/**
 * helper to use of classnames can gets really long, and somethings hard to read
 * with this you can have them on multible lines/split into categories
 * @param names
 * @returns
 */
export function classes(names: string[]) {
    return names.flatMap((e) => e.split(" ")).join(" ");
}

/**
 * sometimes you want to only show some class if true, else show something else
 * @param expression
 * @param ifTrue
 * @param ifFalse
 * @returns
 */
export function classIf(expression: boolean, ifTrueClasses: string | string[], ifFalseClasses: string | string[]) {
    if (expression) {
        if (Array.isArray(ifTrueClasses)) {
            return classes(ifTrueClasses);
        }
        return ifTrueClasses;
    } else {
        if (Array.isArray(ifFalseClasses)) {
            return classes(ifFalseClasses);
        }
        return ifFalseClasses;
    }
}

/**
 * sometimes you want to only show some class if true
 * @param expression
 * @param ifTrue
 * @param ifFalse
 * @returns
 */
export function classIfTrue(expression: boolean, ifTrueClasses: string | string[]) {
    if (expression) {
        if (Array.isArray(ifTrueClasses)) {
            return classes(ifTrueClasses);
        }
        return ifTrueClasses;
    } else {
        return " ";
    }
}

/**
 * sometimes you want to only show some class if false
 * @param expression
 * @param ifTrue
 * @param ifFalse
 * @returns
 */
export function classIfFalse(expression: boolean, ifFalseClasses: string | string[]) {
    if (expression) {
        return " ";
    } else {
        if (Array.isArray(ifFalseClasses)) {
            return classes(ifFalseClasses);
        }
        return ifFalseClasses;
    }
}