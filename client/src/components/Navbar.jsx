function Navbar() {
  return (
    <div className="bg-zinc-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
     FinTrack Pro
      </h1>

      <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
        Logout
      </button>

    </div>
  );
}

export default Navbar;