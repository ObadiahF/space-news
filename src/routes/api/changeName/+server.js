import { supabaseClient as supabase } from '../../../lib/supabase'
import { userInfo } from '../../../stores/userInfo'
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
    const id = await locals.session.user.id
    const { name, displayName } = await request.json();
    const successfulWrite = await writeNameToDB(name, displayName, id)

    if (successfulWrite[0]) {
        return json({ success: true, errorMsg: ""})
    } else {
        return json({ success: false, errorMsg: successfulWrite[1] })
    }

}


const writeNameToDB = async (name, displayName, id) => {
    const { data, error } = await supabase
        .from('profiles')
        .update([
            { display_name: displayName, user_name: name },
        ])
        .eq("id", id)
        .select()

        if (!error) {
            userInfo.set(data);
            return [true]
        } else {
            console.log(error);
            return [false, error]
        }
}