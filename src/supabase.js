import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ywbpjdlbijpasnkwlqzb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3YnBqZGxiaWpwYXNua3dscXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTQxMjEsImV4cCI6MjA3MDQ3MDEyMX0.i8jKvjUwf23SN_p3AYx17rTl3IhFZw-bQLPf7KItm04'
export const supabase = createClient(supabaseUrl, supabaseKey)