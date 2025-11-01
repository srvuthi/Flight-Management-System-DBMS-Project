import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic CRUD operations
export const apiService = {
  // Flights
  getFlights: () => api.get('/flights'),
  getFlight: (id) => api.get(`/flights/${id}`),
  createFlight: (data) => api.post('/flights', data),
  updateFlight: (id, data) => api.put(`/flights/${id}`, data),
  deleteFlight: (id) => api.delete(`/flights/${id}`),
  searchFlights: (params) => api.get('/flights/search/query', { params }),

  // Passengers
  getPassengers: () => api.get('/passengers'),
  getPassenger: (id) => api.get(`/passengers/${id}`),
  createPassenger: (data) => api.post('/passengers', data),
  updatePassenger: (id, data) => api.put(`/passengers/${id}`, data),
  deletePassenger: (id) => api.delete(`/passengers/${id}`),

  // Airlines
  getAirlines: () => api.get('/airlines'),
  getAirline: (id) => api.get(`/airlines/${id}`),
  createAirline: (data) => api.post('/airlines', data),
  updateAirline: (id, data) => api.put(`/airlines/${id}`, data),
  deleteAirline: (id) => api.delete(`/airlines/${id}`),

  // Airports
  getAirports: () => api.get('/airports'),
  getAirport: (id) => api.get(`/airports/${id}`),
  createAirport: (data) => api.post('/airports', data),
  updateAirport: (id, data) => api.put(`/airports/${id}`, data),
  deleteAirport: (id) => api.delete(`/airports/${id}`),

  // Bookings
  getBookings: () => api.get('/bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (data) => api.post('/bookings', data),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),

  // Crew
  getCrew: () => api.get('/crew'),
  getCrewMember: (id) => api.get(`/crew/${id}`),
  createCrewMember: (data) => api.post('/crew', data),
  updateCrewMember: (id, data) => api.put(`/crew/${id}`, data),
  deleteCrewMember: (id) => api.delete(`/crew/${id}`),

  // Procedures, Functions, Triggers
  getProcedures: () => api.get('/procedures/procedures'),
  getFunctions: () => api.get('/procedures/functions'),
  getTriggers: () => api.get('/procedures/triggers'),
  executeProcedure: (procedureName, parameters) => 
    api.post('/procedures/execute', { procedureName, parameters }),
  getRoutineDetails: (type, name) => api.get(`/procedures/details/${type}/${name}`),

  // Dashboard
  getDashboardStats: () => api.get('/dashboard/stats'),
  getTables: () => api.get('/dashboard/tables'),
  getTableData: (tableName) => api.get(`/dashboard/table/${tableName}`),

  // Finance
  getFinance: () => api.get('/finance'),
  getFinanceRecord: (id) => api.get(`/finance/${id}`),
  createFinance: (data) => api.post('/finance', data),
  updateFinance: (id, data) => api.put(`/finance/${id}`, data),
  deleteFinance: (id) => api.delete(`/finance/${id}`),
  getFinanceStats: () => api.get('/finance/stats/summary'),

  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifySession: () => api.get('/auth/verify'),
};

export default api;
