import Link from "next/link";

export default function Logo() {
  return (
    <div className="font-bold text-2xl decoration-none">
      <Link href="/">
        <h3 style={{color:"#6366F1"}}>
          <span className="pi pi-home p-2 font-bold text-2xl "> </span>
          Log Search
        </h3>
      </Link>
    </div>
  );
}
