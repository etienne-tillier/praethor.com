import { createClient } from "@supabase/supabase-js";

// Client Admin (bypass RLS)
// ⚠️ PROTECTION BUILD : Initialisation conditionnelle pour éviter le crash si les vars manquent (Build Docker/Nixpacks)
export const supabaseAdmin =
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
        ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        })
        : null;
