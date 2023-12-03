'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
    { name: 'Notes', href: '/notes'},
    { name: 'Games', href: '/game'},
];

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
{links.map((link) => {
        return (
          <li>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
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