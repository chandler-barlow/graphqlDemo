export function mergeDefs(
  defs: string[],
  type: "Query" | "Mutation" | "Type"
): string {
  if (type === "Type") {
    return defs.reduce((acc, e) => acc + e, "\n");
  }
  return `type ${type} {
        ${defs.reduce((acc: any, e: any) => `${acc}\n${e}`, "")}
    }`;
}

export const genSchema = (...args: string[]) => mergeDefs(args, "Type");
