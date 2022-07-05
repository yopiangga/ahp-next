import Link from "next/link";

export function FooterSection() {
  return (
    <div className="w-full py-10 lg:px-20 px-8 grid lg:grid-cols-2 grid-cols-1 gap-8 border-t border-gray-200">
      <div>
        <h4 className="text-lg lg:text-left text-center">
          Hak cipta © 2022 FlaRank.
        </h4>
      </div>
      <div className="flex flex-wrap lg:justify-end justify-center gap-4">
        <h4 className="text-lg">Pengembang : </h4>
        <Link href="https://www.instagram.com/loh.wisnu/">
          <a className="text-lg hover:text-primary">Adek</a>
        </Link>
        <Link href="https://www.instagram.com/prawirraa/">
          <a className="text-lg hover:text-primary">Adryan</a>
        </Link>
        <Link href="https://www.instagram.com/aan.m._/">
          <a className="text-lg hover:text-primary">Ainul</a>
        </Link>
        <Link href="https://www.instagram.com/alfian_py/">
          <a className="text-lg hover:text-primary">Alfian</a>
        </Link>
        <Link href="https://www.instagram.com/muh.arga12/">
          <a className="text-lg hover:text-primary">Arga</a>
        </Link>
      </div>
    </div>
  );
}
