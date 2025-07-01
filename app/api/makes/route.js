import Make from "../../models/make.model.js"
import dbconnect from "../../lib/mongodb.js"

await dbconnect();
export async function GET() {
  const makes = await Make.find({});
  return Response.json(makes);
}
