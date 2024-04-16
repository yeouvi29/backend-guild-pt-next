import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const { error, db } = await connectToDatabase();
  if (!db) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error fetching todos from the database" },
      { status: 500 }
    );
  }
  const todos = await db.collection("todos").find({}).toArray();

  return Response.json({ status: 200, todos });
}

export async function POST(req: Request) {
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

  const todo = await req.json();
  if (!todo) {
    return Response.json(
      { success: false, message: "Todo is required." },
      { status: 400 }
    );
  }
  try {
    const todos = db.collection("todos");
    await todos.insertOne(todo.todo);

    return Response.json({
      status: 200,
      message: "Todo is added successfully.",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error adding todo." },
      { status: 500 }
    );
  }
}
