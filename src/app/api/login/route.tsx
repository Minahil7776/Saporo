import { NextRequest } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcrypt';


export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ username }).select('+password');

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return new Response(
      JSON.stringify({ error: "Invalid Password" }),
      {status: 401, headers: { "Content-Type": "application/json" }},
    );
  }
  return new Response(
      JSON.stringify({ message: "Login Successfull", user }),
      {status: 200, headers: { "Content-Type": "application/json" }},
    );
}
