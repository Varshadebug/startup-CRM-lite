import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source
 * @property {string} [notes]
 * @property {string} createdAt
 */

const LeadContext = createContext(undefined);

/**
 * LeadProvider component that wraps the app and manages lead state.
 * Initializes from localStorage if available.
 * 
 * @param {{ children: React.ReactNode }} props 
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('crm_leads');
    if (savedLeads) {
      try {
        return JSON.parse(savedLeads);
      } catch (e) {
        console.error('Failed to parse leads from localStorage', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('crm_leads', JSON.stringify(leads));
  }, [leads]);

  /**
   * Adds a new lead. Generates a unique ID and createdAt timestamp.
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData 
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
  };

  /**
   * Updates an existing lead by ID.
   * @param {string} id 
   * @param {Partial<Omit<Lead, 'id' | 'createdAt'>>} updates 
   */
  const updateLead = (id, updates) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, ...updates } : lead));
  };

  /**
   * Deletes a lead by ID.
   * @param {string} id 
   */
  const deleteLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  /**
   * Retrieves a lead by ID.
   * @param {string} id 
   * @returns {Lead | undefined}
   */
  const getLeadById = (id) => {
    return leads.find(lead => lead.id === id);
  };

  const value = {
    leads,
    addLead,
    updateLead,
    deleteLead,
    getLeadById
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

/**
 * Custom hook to use the LeadContext.
 * @returns {{
 *   leads: Lead[],
 *   addLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => void,
 *   updateLead: (id: string, updates: Partial<Lead>) => void,
 *   deleteLead: (id: string) => void,
 *   getLeadById: (id: string) => Lead | undefined
 * }}
 * @throws {Error} If used outside of LeadProvider
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}

export { LeadContext };
