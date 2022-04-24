export async function Async<T>(
  promise: Promise<T>
): Promise<[T | null, unknown | null]> {
  try {
    const result = await Promise.resolve(promise);
    return [result, null];
  } catch (error) {
    return [null, error];
  }
}
