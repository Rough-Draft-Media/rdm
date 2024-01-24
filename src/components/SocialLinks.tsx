import Link from 'next/link'

const socials = [
    { name: 'tiktok', href: '/', current: 'true' },
    { name: 'instagram-alt', href: 'https://www.instagram.com/canitellyousmthpodcast/', current: 'false' },
    { name: 'youtube', href: '/about', current: 'false' },
]

export default function SocialLinks() {
    function iconClass(name: string) {
        return `bx bxl-${name} bx-sm`
    }

    return (
        <div className="flex flex-row items-center">
        {socials.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={'text-zinc-500 hover:text-zinc-900 h-11 w-11 flex items-center justify-center'}
            aria-current={item.current ? 'page' : undefined}
          >
            <i className={iconClass(item.name)}></i>
          </Link>
        ))}
      </div>
    )
}