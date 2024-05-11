import { supabaseClient as supabase } from '../../../lib/supabase'
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
    const {
        postInfo,
        isDraft,
        name,
        display_name,
        tags
    } = await request.json();
    const successfulWrite = await writeNameToDB(name, display_name, isDraft, postInfo, tags)

    if (successfulWrite[0]) {
        return json({ success: true, errorMsg: "" })
    } else {
        return json({ success: false, errorMsg: successfulWrite[1] })
    }

}


const writeNameToDB = async (name, display_name, isDraft, postInfo, tags) => {
    const { data, error } = await supabase
        .from('posts')
        .insert({
            author: name,
            author_display_name: display_name,
            is_draft: isDraft,
            post_info: postInfo,
            tags: tags,
            api_article: false,
        })
        .select()

    if (!error) {
        return [true]
    } else {
        return [false, error]
    }
}