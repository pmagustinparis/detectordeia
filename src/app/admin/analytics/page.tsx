import { Metadata } from 'next';
import AnalyticsDashboardV2 from './AnalyticsDashboardV2';

export const metadata: Metadata = {
  title: 'Analytics Dashboard V2 | Admin',
  description: 'Elite Analytics Dashboard - Indie Hacker View',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboardV2 />;
}
