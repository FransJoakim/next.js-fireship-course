import { db, getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

export async function getServerSideProps(props) {
  const { username } = props.query;

  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const q = query(
      collection(db, "users", userDoc.id, "posts"),
      where("published", "==", false),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(q)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin />
    </main>
  );
}
