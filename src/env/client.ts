import { z } from 'zod'

const envClient = {
  NEXT_PUBLIC_PLACEHOLDER_API_BASE_URL:
    process.env.NEXT_PUBLIC_PLACEHOLDER_API_BASE_URL,
}

const envSchema = z.object({
  NEXT_PUBLIC_PLACEHOLDER_API_BASE_URL: z.string(),
})

const validateEnv = envSchema.safeParse(envClient)

if (!validateEnv.success) {
  console.error(validateEnv.error)
  process.exit(1)
}

export const env = validateEnv.data
