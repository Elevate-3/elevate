interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // add more VITE_ environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
