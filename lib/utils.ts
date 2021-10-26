/* Converts string from snake case, by replacing _ with ' ' */
export const deSnake = (input?: string) =>
  input ? input.replace(/_/g, ' ') : '';
