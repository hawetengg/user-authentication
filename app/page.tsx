// app/page.tsx

import { redirect } from "next/navigation";

export default function Home() {
  // Perform the redirection on the server side
  redirect("/signup");

  // Optionally, you can provide fallback content or a loading spinner here
  return <p>Redirecting...</p>;
}
