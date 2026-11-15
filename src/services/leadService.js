import api from './api';

export const leadService = {
  /**
   * Get paginated and filtered leads
   * GET /api/leads?status=X&search=Y&page=Z
   */
  getLeads: async (params) => {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  /**
   * Create a new lead
   * POST /api/leads
   */
  createLead: async (leadData) => {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },

  /**
   * Update an existing lead by ID
   * PUT /api/leads/:id
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Update just the status of a lead
   * PATCH /api/leads/:id/status
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a lead by ID
   * DELETE /api/leads/:id
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Get summary dashboard stats
   * GET /api/leads/stats
   */
  getLeadStats: async () => {
    const response = await api.get('/api/leads/stats');
    return response.data;
  },

  /**
   * Get monthly stats for chart
   * GET /api/leads/monthly-stats
   */
  getMonthlyStats: async () => {
    const response = await api.get('/api/leads/monthly-stats');
    return response.data;
  }
};
