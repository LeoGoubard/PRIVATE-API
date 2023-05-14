import '@/styles/globals.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // offset navbar height
  return <section className='pt-20'>{children}</section>
}