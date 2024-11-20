import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-10 flex md:flex-row flex-col items-center justify-between px-10 text-white">
      <p>&copy; 2024. Developed by Ajeesh</p>
      <ul className="md:w-1/6 w-full md:my-0 my-2 flex items-center justify-between">
        <li>
          <Link href={"https://www.ajeeshrs.online/"}>About</Link>
        </li>
        <li>
          <Link href={"https://x.com/ajeeshRS_"}>X</Link>
        </li>
        <li>
          <Link href={"https://www.ajeeshrs.online/"}>Contact</Link>
        </li>
      </ul>
    </footer>
  );
}
