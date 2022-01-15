import dbConnect from "../../../util/mongo";
import Resale from "../../../models/Resale";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;


  await dbConnect();

  if (method === "GET") {
    try {
      const resale = await Resale.findById(id);
      res.status(200).json(resale);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const resale = await Resale.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(resale);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Resale.findByIdAndDelete(id);
      res.status(200).json("รายการขายคืนถูกลบ");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
export default handler;
