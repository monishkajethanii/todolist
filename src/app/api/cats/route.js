import pool from "@/app/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM todo");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(req) {
  const { id, title, description } = await req.json();
  if (!id || !title || !description) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO todo (id, title, description) VALUES (?, ?, ?)",
      [id, title, description]
    );
    const [[newtodo]] = await pool.query("SELECT * FROM todo");
     return new Response(JSON.stringify({ message: "Added successfully", todo: newtodo }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
