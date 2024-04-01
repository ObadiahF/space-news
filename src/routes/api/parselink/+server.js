import axios from 'axios';
import cheerio from 'cheerio';
import { json } from '@sveltejs/kit'


export const POST = async ({ request }) => {
    const { link } = await request.json();

    const info = await fetchOgMetadata(link);
    return json({ success: true, info: info })
}

async function fetchOgMetadata(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);
        const ogMetadata = {};

        // Select all meta tags with property starting with "og:"
        $('meta[property^="og:"]').each((index, element) => {
            const property = $(element).attr('property');
            const content = $(element).attr('content');

            // Remove the "og:" prefix from the property name
            const keyWithoutPrefix = property.replace(/^og:/, '');
            ogMetadata[keyWithoutPrefix] = content;
        });

        return ogMetadata;
    } catch (error) {
        console.log(error);
        return null;
    }
}