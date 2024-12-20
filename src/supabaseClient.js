// supabaseClient.js
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.SUPABASE_URL // Используем префикс VITE_
const supabaseKey = import.meta.env.SUPABASE_KEY // Используем префикс VITE_

// Проверяем, что переменные окружения определены
if (!supabaseUrl || !supabaseKey) {
	console.error("Ошибка: переменные окружения для Supabase не настроены!")
}

const supabase = createClient(
	"https://fkwivycaacgpuwfvozlp.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2l2eWNhYWNncHV3ZnZvemxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDc4MTEsImV4cCI6MjA0OTQ4MzgxMX0.44dYay0RWos4tqwuj6H-ylqN4TrAIabeQLNzBn6Xuy0",
)

export default supabase
