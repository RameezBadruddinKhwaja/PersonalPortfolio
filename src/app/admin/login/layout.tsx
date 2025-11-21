export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No header/footer for login page - just the content
  return <>{children}</>
}
