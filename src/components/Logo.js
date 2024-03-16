import Link from "next/link";

export default function Logo() {
    return (
        <div className="p-2 font-bold text-5xl decoration-none">
            <Link href="/">


                <h3>
                    <span className="pi pi-home p-2 font-bold text-5xl "> </span>
                    Log Search</h3>

            </Link>

        </div>
    );
}