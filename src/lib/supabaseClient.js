import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://biqnznwwsslzaalsiuei.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpcW56bnd3c3NsemFhbHNpdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTQzMzEsImV4cCI6MjA5Nzc3MDMzMX0.zrHySjoX8vH8f3bS05lMzIJeolTnx7MI2v1k7MShAe0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)