// app/(auth)/layout.tsx

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AuthLayout({ children }) {
  return children;
}
