export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-") // Replace spaces or underscores with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word characters
};
