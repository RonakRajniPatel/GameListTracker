'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
    { name: 'Home', href: '/', mobileOnly: true},
    { name: 'Notes', href: '/notes', mobileOnly: false},
    { name: 'Games', href: '/game', mobileOnly: false},
];

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
{links.map((link) => {
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={clsx({'md:hidden': link.mobileOnly},
                  "btn btn-default btn-sm",
                {
                  'btn btn-active btn-primary': pathname === link.href,
                },
                )}
            >
                <p className="md:block">{link.name}</p>
            </Link>
          </li>
        );
      })}
        </>
    )
}