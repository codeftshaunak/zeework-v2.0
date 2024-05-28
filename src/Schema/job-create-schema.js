import { z } from "zod";

// schema for first step form
// const MAX_FILE_SIZE = 100 * 1024 * 1024;
// const ACCEPTED_FILE_TYPES = [];
export const firstStepSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  categories: z
    .array(z.object({ _id: z.string(), value: z.string(), label: z.string() }))
    .refine((value) => value?.length > 0, {
      message: "At least one category is required",
    }),

  skills: z.array(z.string()).min(1),
  job_type: z.string().min(1),
  amount: z
    .string()
    .refine(
      (value) => {
        return !isNaN(parseFloat(value));
      },
      {
        message: "Amount must be a valid number",
      }
    )
    .transform((value) => parseFloat(value)),

  // file: z
  //   .custom((file) => typeof file instanceof File, {
  //     message: "Expected a file",
  //   })
  //   .refine(
  //     (file) =>
  //       typeof file === "string" ||
  //       (file.size <= MAX_FILE_SIZE &&
  //         (!ACCEPTED_FILE_TYPES.length ||
  //           ACCEPTED_FILE_TYPES.includes(file.type))),
  //     {
  //       message: `File must be less than ${
  //         MAX_FILE_SIZE / (1024 * 1024)
  //       } MB and of a supported type`,
  //     }
  //   )
  //   .optional(),
});
// schema for second step form
export const secondStepSchema = z.object({
  experience: z.enum(["Entry", "Intermediate", "Expert"]),
});

// schema for third step form
export const thirdStepSchema = z.object({
  durations: z.string(),
});
