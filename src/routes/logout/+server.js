import { error, redirect } from "@sveltejs/kit"

export const GET = async ({ locals }) => {
    const { error: err } = await locals.sb.auth.signOut()

    if (err) {
        throw error(500, "Something went wrong logging you out.")
    }

    throw redirect(303, "/")
}