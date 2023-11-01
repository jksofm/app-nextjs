import * as z from "zod";
export const ThreadValidation = z.object({
  thread: z.string().min(3, "Minimum 3 characters"),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  content: z.string().min(3, "Minimum 3 characters"),
});
export const searchValidation = z.object({
  searchString: z.string(),
});
