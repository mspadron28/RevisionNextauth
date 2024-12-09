'use client'
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl">Welcome, {session?.user?.username}!</h1>
        <p>Your email: {session?.user?.last_name}</p>
      </div>
    </div>
  );
};

export default Dashboard;
