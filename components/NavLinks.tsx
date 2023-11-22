'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
    { name: 'Home', href: '/'},
    { name: 'Notes', href: '/notes'},
];

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
{links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
                "py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover",
              {
                'bg-button-background text-blue-600': pathname === link.href,
              },
              )}
            >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
        </>
    )
}