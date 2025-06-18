const BASE_URL = 'http://localhost:8089';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export const api = {
  getSeances: () => request<any[]>('/api/v1/seances/all'),
  createSeance: (data: any) => request('/api/v1/seances', { method: 'POST', body: JSON.stringify(data) }),
  updateInscriptionPayment: (inscriptionId: string) =>
    request(`/api/v1/inscriptions/pay/${inscriptionId}`, { method: 'PUT' }),
  deleteSeance: (seanceId: string) => request(`/api/v1/seances/${seanceId}`, { method: 'DELETE' }),

  getTournaments: () => request<any[]>('/api/v1/tournaments/all'),
  createTournament: (data: any) => request('/api/v1/tournaments', { method: 'POST', body: JSON.stringify(data) }),
  deleteTournament: (tournamentId: string) => request(`/api/v1/tournaments/${tournamentId}`, { method: 'DELETE' }),

  getParticipants: (tournamentId: string) => request<any[]>(`/api/v1/inscriptions/tournament/${tournamentId}`),
  deleteInscription: (inscriptionId: string) => request(`/api/v1/inscriptions/${inscriptionId}`, { method: 'DELETE' }),
};
