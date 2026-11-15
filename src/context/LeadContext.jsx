import React, { createContext, useContext, useState } from 'react';
import { leadService } from '../services/leadService';
import toast from 'react-hot-toast';

const LeadContext = createContext(undefined);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 1 });

  const fetchLeads = async (params = {}) => {
    setIsLoading(true);
    try {
      const res = await leadService.getLeads(params);
      if (res.success) {
        setLeads(res.data);
        if (res.pagination) setPagination(res.pagination);
      }
    } catch (error) {
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  };

  const addLead = async (leadData) => {
    try {
      const res = await leadService.createLead(leadData);
      if (res.success) {
        setLeads(prev => [res.data, ...prev]);
        toast.success('Lead created successfully');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || 'Failed to create lead';
      toast.error(msg);
      throw error;
    }
  };

  const updateLead = async (id, data) => {
    try {
      const res = await leadService.updateLead(id, data);
      if (res.success) {
        setLeads(prev => prev.map(lead => lead._id === id || lead.id === id ? res.data : lead));
        toast.success('Lead updated successfully');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || 'Failed to update lead';
      toast.error(msg);
      throw error;
    }
  };

  const deleteLead = async (id) => {
    try {
      const res = await leadService.deleteLead(id);
      if (res.success) {
        setLeads(prev => prev.filter(lead => lead._id !== id && lead.id !== id));
        toast.success('Lead deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete lead');
      throw error;
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await leadService.updateLeadStatus(id, status);
      if (res.success) {
        setLeads(prev => prev.map(lead => lead._id === id || lead.id === id ? res.data : lead));
        toast.success(`Lead status updated to ${status}`);
        return res.data;
      }
    } catch (error) {
      toast.error('Failed to update status');
      throw error;
    }
  };

  const value = {
    leads,
    isLoading,
    pagination,
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}

export { LeadContext };
