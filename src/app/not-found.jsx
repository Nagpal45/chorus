import Link from "next/link";

export default function Notfound() {
  return (
    <div>
      <div>Notfound</div>
      <p>Sorry the page you are looking for doesnt exists.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
