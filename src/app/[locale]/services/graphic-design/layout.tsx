import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Graphic Design',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
