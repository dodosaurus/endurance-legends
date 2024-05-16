import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <div className="flex h-14 items-center justify-center border-b border-gray-200">
        <Link href="/" className="flex z-40 font-semibold text-2xl">
          endurance<span className="text-cyan-600">vault</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar