import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cgrzyfszpvvvpixlivaw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncnp5ZnN6cHZ2dnBpeGxpdmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDM1MzMsImV4cCI6MjAyMzc3OTUzM30.LyIi7Yi5GVL9Ssp4jMfziD3jUe76oTifmDpWVlP8FTw'
export const supabase = createClient(supabaseUrl, supabaseKey)