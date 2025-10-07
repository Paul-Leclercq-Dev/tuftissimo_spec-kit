import { api } from '@/lib/api';

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
  orderId?: number;
  userId?: number;
}

export interface CreateContactData {
  name: string;
  email: string;
  message: string;
  userId?: number;
}

export interface CustomOrderRequest {
  width?: number;
  height?: number;
  colors?: string;
  inspirationUrl?: string;
  notes?: string;
  materialCode?: 'COTTON_A' | 'COTTON_B' | 'WOOL_A';
  sizeCode?: 'S' | 'M' | 'L';
  backing?: 'ADHESIVE' | 'NON_ADHESIVE';
  requesterName?: string;
  requesterEmail?: string;
}

export class ContactService {
  /**
   * Créer un nouveau message de contact
   */
  static async createContact(contactData: CreateContactData): Promise<Contact> {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Failed to send contact message');
    }
  }

  /**
   * Récupérer tous les contacts (admin)
   */
  static async getContacts(): Promise<Contact[]> {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw new Error('Failed to fetch contacts');
    }
  }

  /**
   * Récupérer un contact par ID (admin)
   */
  static async getContact(id: number): Promise<Contact> {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw new Error('Failed to fetch contact');
    }
  }

  /**
   * Mettre à jour un contact (admin)
   */
  static async updateContact(id: number, updateData: Partial<Contact>): Promise<Contact> {
    try {
      const response = await api.put(`/contact/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw new Error('Failed to update contact');
    }
  }

  /**
   * Supprimer un contact (admin)
   */
  static async deleteContact(id: number): Promise<void> {
    try {
      await api.delete(`/contact/${id}`);
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw new Error('Failed to delete contact');
    }
  }

  /**
   * Créer une demande de devis personnalisé (custom order)
   * Note: L'API custom-order pourrait être utilisée ici selon l'implémentation backend
   */
  static async createCustomOrderRequest(requestData: CustomOrderRequest): Promise<any> {
    try {
      // Pour l'instant, créons un contact avec les informations de devis
      const contactMessage = `Demande de devis personnalisé:
      
Dimensions: ${requestData.width ? `${requestData.width}cm` : 'non spécifié'} x ${requestData.height ? `${requestData.height}cm` : 'non spécifié'}
Couleurs: ${requestData.colors || 'non spécifié'}
Matériau: ${requestData.materialCode || 'non spécifié'}
Taille: ${requestData.sizeCode || 'non spécifié'}
Support: ${requestData.backing || 'non spécifié'}

${requestData.inspirationUrl ? `URL d'inspiration: ${requestData.inspirationUrl}` : ''}

Notes: ${requestData.notes || 'Aucune note spéciale'}`;

      const contactData: CreateContactData = {
        name: requestData.requesterName || 'Client',
        email: requestData.requesterEmail || '',
        message: contactMessage
      };

      return await this.createContact(contactData);
    } catch (error) {
      console.error('Error creating custom order request:', error);
      throw new Error('Failed to create custom order request');
    }
  }

  /**
   * Traduire le statut en français
   */
  static translateStatus(status: string): string {
    const translations: Record<string, string> = {
      'new': 'Nouveau',
      'read': 'Lu',
      'replied': 'Répondu',
      'closed': 'Fermé'
    };
    return translations[status] || status;
  }
}