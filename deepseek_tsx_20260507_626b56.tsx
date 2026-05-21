'use client';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SourcingQueue from '@/components/admin/SourcingQueue';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingSourcing: 0 });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) router.push('/login');
    else if (user?.role === 'admin') fetch('/api/admin/stats').then(res=>res.json()).then(setStats);
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">Orders: {stats.totalOrders}</div>
        <div className="bg-white p-4 rounded shadow">Revenue: ${stats.totalRevenue}</div>
        <div className="bg-white p-4 rounded shadow">Pending Sourcing: {stats.pendingSourcing}</div>
      </div>
      <SourcingQueue />
      <AnalyticsChart />
    </div>
  );
}