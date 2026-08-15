export function Footer() {
  const linkClass =
    "group relative w-fit text-[14px] font-medium leading-none text-white/68 transition-colors duration-200 hover:text-white";

  return (
    <footer className="relative overflow-hidden border-t border-[#b997ff]/45 bg-[linear-gradient(135deg,#191a22_0%,#22202d_55%,#171820_100%)] px-6 py-8 text-white md:px-10 md:pb-8 md:pt-14">
      <div className="pointer-events-none absolute right-[12%] top-8 size-[220px] rounded-full bg-[#8b55ff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.22fr_0.7fr_0.82fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3.5">
              <span className="grid size-10 place-items-center rounded-full border border-white/15 bg-white text-[12px] font-extrabold text-[#6f4cd3] shadow-[0_8px_28px_rgba(255,255,255,.08)]">
                OP
              </span>
              <span className="text-[25px] font-extrabold leading-none tracking-[-.03em] text-white">Origin Peptides</span>
            </div>
            <p className="mt-5 max-w-[330px] text-[14px] font-medium leading-[1.8] text-white/66">
              High-purity research compounds for laboratory and preclinical research applications
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#dbcaff]">Useful Links</h3>
            <nav className="mt-5 grid gap-4">
              {["Products", "About", "Contact us"].map((item) => (
                <button className={linkClass} key={item} type="button">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#a978ff] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#dbcaff]">Legal</h3>
            <nav className="mt-5 grid gap-4">
              {["Privacy Policy", "Terms of Service", "Shipping Policy", "Refund Policy"].map((item) => (
                <button className={linkClass} key={item} type="button">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#a978ff] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-[#8b55ff]/12 blur-2xl" />
            <div className="relative">
              <h3 className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#dbcaff]">Newsletter</h3>
              <p className="mt-5 max-w-[360px] text-[14px] font-medium leading-[1.65] text-white/68">
                Subscribe to our Newsletter to be updated. We promise not to spam.
              </p>
              <div className="mt-5 flex h-11 w-full overflow-hidden rounded-full border border-white/14 bg-white/[.08] shadow-[0_14px_40px_rgba(0,0,0,.18)]">
                <input
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-5 text-[14px] text-white outline-none placeholder:text-white/42"
                  placeholder="Email"
                />
                <button
                  className="bg-[linear-gradient(135deg,#8f5de8,#6f46c7)] px-7 text-[14px] font-bold text-white transition duration-200 hover:brightness-110"
                  type="button"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] font-bold text-white/58">© 2026 Origin Peptides. All rights reserved</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <button className={linkClass} key={item} type="button">
                {item}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#a978ff] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
