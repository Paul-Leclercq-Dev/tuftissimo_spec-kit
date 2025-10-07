'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AdminAuthService, AdminUser } from '@/services/adminAuthService';

export default function AdminDashboardPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadAdminInfo();
  }, []);

  const loadAdminInfo = async () => {
    try {
      const user = await AdminAuthService.getAdminMe();
      setAdminUser(user);
    } catch (err) {
      console.error('Error loading admin info:', err);
    }
  };

  return (
    <div className="p-8">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card Produits */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Produits</h3>
                <p className="text-sm text-slate-600">Gérer le catalogue</p>
              </div>
              <div className="text-3xl">🏷️</div>
            </div>
            <div className="mt-4">
              <Button 
                onClick={() => router.push('/admin/products')}
                className="w-full"
              >
                Gérer les produits
              </Button>
            </div>
          </div>

          {/* Card Commandes */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Commandes</h3>
                <p className="text-sm text-slate-600">Suivi des ventes</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
            <div className="mt-4">
              <Button 
                onClick={() => router.push('/admin/orders')}
                className="w-full"
              >
                Voir les commandes
              </Button>
            </div>
          </div>

          {/* Card Contact */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Messages</h3>
                <p className="text-sm text-slate-600">Demandes clients</p>
              </div>
              <div className="text-3xl">💬</div>
            </div>
            <div className="mt-4">
              <Button 
                onClick={() => router.push('/admin/contacts')}
                className="w-full"
              >
                Voir les messages
              </Button>
            </div>
          </div>
        </div>

        {/* Info Admin */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Informations de session</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700">Email:</span>
              <span className="ml-2 text-slate-600">{adminUser?.email}</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">Rôle:</span>
              <span className="ml-2 text-slate-600">{adminUser?.role}</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">Session expire:</span>
              <span className="ml-2 text-slate-600">
                {adminUser?.exp ? new Date(adminUser.exp * 1000).toLocaleString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}