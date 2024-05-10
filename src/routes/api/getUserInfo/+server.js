import { supabaseClient as supabase } from '../../../lib/supabase'
import { userInfo } from '../../../stores/userInfo'
import { json } from '@sveltejs/kit'

export const GET = async ({ request, locals }) => {
    const id = await locals.session.user.id
    const successfulRead = await getUserData(id)

    if (successfulRead[0]) {
        return json({ success: true, errorMsg: "", userInfo: successfulRead[1]})
    } else {
        return json({ success: false, errorMsg: successfulRead[1] })
    }

}


const getUserData = async (id) => {
    const { data, error } = await supabase
        .from('profiles')
        .select("*")
        .eq("id", id)

    if (!error) {
        userInfo.set(data);
        return [true, data]
    } else {
        console.log(error);
        return [false, error]
    }
}