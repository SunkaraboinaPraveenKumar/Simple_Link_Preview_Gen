const axios=require('axios')
const cheerio=require('cheerio')
const {object, string}=require('yup')

const schema=object({
    url:string().url().required()
});

const getUrlPreview=async(req,res)=>{
    try{
        console.log(req.body);
        const value = await schema.validate(req.body)
        console.log(value)

        const {data} = await axios.get(value.url)

        const $ = cheerio.load(data)

        const title = $('meta[property="og:title"]').attr('content')||$('title').text()

        const desc = $('meta[property="og:description"]').attr('content')||$('meta[property="description"]').attr('content')

        const image = $('meta[property="og:image"]').attr('content')||$('img').first().attr('src')

        const previewData={
            title:title||"No title Available",
            description:desc||"No Description Available",
            image:image||"No Image Available"
        };

        return res.status(200).json(previewData)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Something Went Wrong!!')
    }
}

module.exports={
    getUrlPreview
}