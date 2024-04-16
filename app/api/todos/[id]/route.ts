import { connectToDatabase } from "@/lib/mongodb";

// delete a todo from the database
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { error, db } = await connectToDatabase();
  if (!db) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Error fetching todos from the database",
      },
      { status: 500 }
    );
  }
  const id = params.id;
  if (!id) {
    return Response.json(
      { success: false, message: "Todo id is required." },
      { status: 404 }
    );
  }
  try {
    const todos = db.collection("todos");
    await todos.deleteOne({ id: id });

    return Response.json(
      {
        success: true,
        message: "Todo is deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ status: 500, message: "Error deleting todo." });
  }
}

// update a todo in the database
export async function PUT(
  req: Request & { body: { completed: boolean } },
  { params }: { params: { id: string } }
) {
  const { error, db } = await connectToDatabase();
  if (!db) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error fetching todos from the database" },
      { status: 500 }
    );
  }

  const id = params.id;
  const { completed } = req.body;
  if (!id) {
    return Response.json(
      { success: false, message: "Todo id is required." },
      { status: 404 }
    );
  }
  try {
    const todos = db.collection("todos");
    await todos.findOneAndUpdate({ id }, { $set: { completed } });

    return Response.json(
      {
        success: true,
        message: "Todo is updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error updating todo." },
      { status: 500 }
    );
  }
}
