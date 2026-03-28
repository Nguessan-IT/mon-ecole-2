import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rqifbxpavgiomyjkxfao.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxaWZieHBhdmdpb215amt4ZmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDY2NzQsImV4cCI6MjA1ODQ4MjY3NH0.jJCMHP3cMv-5MpiMPxsNBqpUOJOhYMIFRl2WwZ1jNsE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
