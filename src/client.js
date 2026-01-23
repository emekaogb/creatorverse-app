import { createClient } from "@supabase/supabase-js";

const URL = 'https://aamgcceogsxwbktdvgzy.supabase.co';
const API_KEY = 'sb_publishable_7wGqrZ6iBHqU0guRNvZOlw_0Z-tLKa8'; // publishable key

export const supabase = createClient(URL, API_KEY);

