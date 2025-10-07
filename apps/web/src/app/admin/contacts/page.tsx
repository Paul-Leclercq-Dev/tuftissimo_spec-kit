'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ContactService, Contact } from '@/services/contactService';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContactService.getContacts();
      setContacts(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      console.error('Error loading contacts:', err);
      setError('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: number, status: string) => {
    try {
      await ContactService.updateContact(id, { status });
      await loadContacts(); // Recharger la liste
    } catch (err) {
      console.error('Error updating contact status:', err);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-red-100 text-red-800',
      'read': 'bg-yellow-100 text-yellow-800',
      'replied': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Messages de contact</h1>
        <div className="text-sm text-slate-600">
          {contacts.length} message{contacts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">
            {contacts.filter(c => c.status === 'new').length}
          </div>
          <div className="text-sm text-slate-600">Nouveaux</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">
            {contacts.filter(c => c.status === 'read').length}
          </div>
          <div className="text-sm text-slate-600">Lus</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {contacts.filter(c => c.status === 'replied').length}
          </div>
          <div className="text-sm text-slate-600">Répondus</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-slate-600">
            {contacts.filter(c => c.status === 'closed').length}
          </div>
          <div className="text-sm text-slate-600">Fermés</div>
        </div>
      </div>

      {/* Liste des messages */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-slate-900">Messages récents</h2>
        </div>
        
        <div className="divide-y divide-slate-200">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-6 hover:bg-slate-50">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-slate-900">{contact.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                      {ContactService.translateStatus(contact.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-2">{contact.email}</p>
                  
                  <div className="bg-slate-50 rounded-md p-3 mb-3">
                    <p className="text-sm text-slate-800 whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    Reçu le {new Date(contact.createdAt).toLocaleString('fr-FR')}
                  </p>
                </div>

                <div className="ml-4 flex flex-col space-y-2">
                  {contact.status === 'new' && (
                    <Button 
                      size="sm"
                      onClick={() => updateContactStatus(contact.id, 'read')}
                      variant="outline"
                    >
                      Marquer lu
                    </Button>
                  )}
                  
                  {contact.status === 'read' && (
                    <>
                      <Button 
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'replied')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Marquer répondu
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'new')}
                        variant="outline"
                      >
                        Marquer nouveau
                      </Button>
                    </>
                  )}
                  
                  {contact.status === 'replied' && (
                    <Button 
                      size="sm"
                      onClick={() => updateContactStatus(contact.id, 'closed')}
                      variant="outline"
                    >
                      Fermer
                    </Button>
                  )}
                  
                  {contact.status === 'closed' && (
                    <Button 
                      size="sm"
                      onClick={() => updateContactStatus(contact.id, 'read')}
                      variant="outline"
                    >
                      Rouvrir
                    </Button>
                  )}
                  
                  <Button 
                    size="sm"
                    onClick={() => window.open(`mailto:${contact.email}?subject=Re: Votre message&body=Bonjour ${contact.name},\n\nMerci pour votre message.\n\nCordialement,\nL'équipe Tuftissimo`)}
                    variant="outline"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Répondre par email
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">Aucun message trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}