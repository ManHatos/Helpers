/** Require at least `N` number of elements of type `T` */
export type AtLeast<T, N extends number = 1, R extends unknown[] = []> = R["length"] extends N ? [...R, ...T[]] : AtLeast<T, N, [T, ...R]>;
/** Require exactly `N` number of elements of type `T` */
export type Exactly<T, N extends number, R extends unknown[] = []> = R["length"] extends N ? R : Exactly<T, N, [T, ...R]>;
/** Require at most `X` number of elements of type `T`
 *	@note `X` is offset by 1, if `X` is 2, the limit will be 1 at most
 */
export type AtMost<T, X extends number, A extends T[] = []> = A | {
    0: AtMost<T, X, [T, ...A]>;
}[[T, ...A]["length"] extends X ? never : 0];
/** Require the length of an array of elements of type `T` to be in between `N` at least and `X` at most
 *	@note As this makes use of `Array.AtMost`, `X` is also offset by 1, if `X` is 2, the limit will be 1 at most
 */
export type Ranged<T, N extends number, X extends number> = AtLeast<T, N> & AtMost<T, X>;
