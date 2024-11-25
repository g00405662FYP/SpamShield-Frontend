import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cvditdbqsgrmtsrdepqr.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZGl0ZGJxc2dybXRzcmRlcHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMDkwMzcsImV4cCI6MjA0Nzc4NTAzN30.i86vNh0JmMjgPYP1icwrKhiOLJFDDyQ7cX70STq6GOs'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
