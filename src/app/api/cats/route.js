import pool from "@/app/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM todo");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { id, title, description } = await req.json();
  if (!id || !title || !description) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }
  try {
    await pool.query(
      "INSERT INTO todo (id, title, description) VALUES (?, ?, ?)",
      [id, title, description]
    );
    const [[newtodo]] = await pool.query("SELECT * FROM todo");
    return new Response(
      JSON.stringify({ message: "Added successfully", todo: newtodo }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
export async function DELETE(req) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');
  console.log(id)

  if (!id) {
    console.log('id is required')
  }

  try {
    const [result] = await pool.query('DELETE FROM todo WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}