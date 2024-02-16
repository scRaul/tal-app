import { ExternalLink } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col p-4 shadow-2xl shadow-black">
      <section className="flex flex-col md:flex-row px-10 justify-around gap-2">
        <div>
          <p className="font-semibold underline text-lg">Contact</p>
          <ol className="">
            <li>
              <a href="" className="flex gap-1 items-baseline">
                Linkedin
                <ExternalLink size={10} />
              </a>
            </li>
            <li>
              <a href="" className="flex gap-1 items-baseline">
                Linkedin
                <ExternalLink size={10} />
              </a>
            </li>
            <li>
              <a href="" className="flex gap-1 items-baseline">
                Linkedin
                <ExternalLink size={10} />
              </a>
            </li>
          </ol>
        </div>
        <div className="flex-grow"></div>
      </section>
      <footer className="flex flex-col items-center py-5">
        <Logo href="/" />
        <p>Copyright © 2024 Raul Ramirez</p>
      </footer>
    </footer>
  );
}
