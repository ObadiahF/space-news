import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    login: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const { data, error: err } = await locals.sb.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        })

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return { success: false, message: "Incorrect login details" }
            }
            return { success: false, message: "Server error, please try again later." }
        }

        throw redirect(303, "/")
    },
}