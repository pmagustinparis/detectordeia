import { Metadata } from 'next';
import AnalyticsDashboard from './AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard | Admin',
  description: 'Dashboard de analytics interno',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
