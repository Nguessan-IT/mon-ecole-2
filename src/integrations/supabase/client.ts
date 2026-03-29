import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rcfwdpcsgifcenqysdbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjZndkcGNzZ2lmY2VucXlzZGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDM0ODUsImV4cCI6MjA3MTcxOTQ4NX0.gPi9x9l4okk1Hnu3P07cywAVHqrXPArRA8X7Qd68iZI";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
