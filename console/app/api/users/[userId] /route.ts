import { type NextRequest, NextResponse } from "next/server";

// Define a type for our User
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

// Fake database of users
const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Buyer",
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Seller",
    createdAt: "2023-02-20T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    createdAt: "2023-03-25T00:00:00.000Z",
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  console.log("User ID:", userId);

  // Find the user in our fake database
  const user = users.find((u) => u.id === userId);

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
