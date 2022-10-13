import { useState } from "react";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db, postToJSON } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  const initialQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", false),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(initialQuery)).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const postsQuery = query(
      collectionGroup(db, "posts"),
      where("published", "==", false),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} admin />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
