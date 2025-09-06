import { getAuthService } from '@/auth/auth.service';
import type { Participant, Session, Tournament, User, NewUser } from '@/types';

const BASE_URL = 'http://localhost:8089';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const auth = getAuthService() as import('@/auth/auth.service').AuthService & {
    ready?: () => Promise<void>;
  };
  if (typeof auth.ready === 'function') {
    await auth.ready();
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = auth.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

export const api = {
  getSeances: () => request<Session[]>('/api/v1/seances/all'),
  getSeance: (seanceId: string) => request<Session>(`/api/v1/seances/${seanceId}`),
  createSeance: (data: Record<string, unknown>) =>
    request('/api/v1/seances', { method: 'POST', body: JSON.stringify(data) }),
  updateSeance: (seanceId: string, data: Record<string, unknown>) =>
    request(`/api/v1/seances/${seanceId}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateInscriptionPayment: (inscriptionId: string) =>
    request(`/api/v1/inscriptions/pay/${inscriptionId}`, { method: 'PUT' }),
  deleteSeance: (seanceId: string) => request(`/api/v1/seances/${seanceId}`, { method: 'DELETE' }),

  getTournaments: () => request<Tournament[]>('/api/v1/tournaments/all'),
  createTournament: (data: Record<string, unknown>) =>
    request('/api/v1/tournaments', { method: 'POST', body: JSON.stringify(data) }),
  deleteTournament: (tournamentId: string) => request(`/api/v1/tournaments/${tournamentId}`, { method: 'DELETE' }),

  getParticipants: (tournamentId: string) =>
    request<Participant[]>(`/api/v1/inscriptions/tournament/${tournamentId}`),
  deleteInscription: (inscriptionId: string) => request(`/api/v1/inscriptions/${inscriptionId}`, { method: 'DELETE' }),
  createInscription: (data: Record<string, unknown>) =>
    request('/api/v1/inscriptions', { method: 'POST', body: JSON.stringify(data) }),

  getUsers: () => request<User[]>('/api/v1/users/all'),
  createUser: (data: NewUser) =>
    request<User>('/api/v1/users/new', { method: 'POST', body: JSON.stringify(data) }),
};
