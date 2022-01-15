import dbConnect from "../../../util/mongo"
import Resale from "../../../models/Resale"


const handler = async (req, res) => {
    const { method } = req;
  


    await dbConnect();

    if(method === "GET"){
        try{
            const resales = await Resale.find();
            res.status(200).json(resales);
        }catch(err){
            res.status(500).json(err)
        }

    }

    if(method === "POST"){
        try{
            const resale = await Resale.create(req.body);
            res.status(201).json(resale);
        }catch(err){
            res.status(500).json(err);
        }

    }

  }
  
  export default handler;