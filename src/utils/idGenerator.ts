/**
 * Generate a random id for a task.
 * @returns {string} The random id.
 */

export function generateRandomId(): string {
  const dictionary =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 32;
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += dictionary.charAt(
      Math.floor(Math.random() * dictionary.length)
    );
  }
  //breakpoints with "-" every 8 characters
  return `task_${randomId.match(/.{1,8}/g)?.join("-")}`;
}
