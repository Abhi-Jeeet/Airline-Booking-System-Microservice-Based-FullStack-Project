import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flights - AeroLink',
  description: 'Search and book flights with AeroLink. Find the best deals on air travel.',
};

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flights-layout">
      {children}
    </div>
  );
} 