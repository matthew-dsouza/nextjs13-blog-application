import { postsData } from "@/data";
import Post from "@/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>My Posts</h1>

      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={"test@email.com"}
            date={post.datepublished}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="pt-6">
          No posts created yet. &nbsp;
          <Link href={"/create-post"} className="underline">
            Create New
          </Link>
        </div>
      )}
    </div>
  );
}
