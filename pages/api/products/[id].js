import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;

  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if(!token || token !== process.env.token){
      return res.status(401).json("ไม่มีสิทธิ์ในการเพิ่มข้อมูล")
  }
    try {
      const product = await Product.findByIdAndUpdate(id,req.body,{
        new:true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if(!token || token !== process.env.token){
      return res.status(401).json("ไม่มีสิทธิ์ในการเพิ่มข้อมูล")
  }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The fish has been deleted!!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
