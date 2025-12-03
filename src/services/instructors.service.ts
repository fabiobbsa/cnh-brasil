import api from '@/lib/api';

export interface Instructor {
  id: string;
  professionalName?: string;
  bio?: string;
  experienceYears: number;
  pricePerHour: number;
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  user: {
    fullName: string;
    avatarUrl?: string;
    addressCity?: string;
    addressState?: string;
    latitude?: number;
    longitude?: number;
  };
  categories: Array<{
    category: {
      code: string;
      name: string;
    };
  }>;
}

export interface InstructorFilters {
  page?: number;
  limit?: number;
  category?: string;
  city?: string;
}

export const instructorsService = {
  async list(filters: InstructorFilters = {}): Promise<Instructor[]> {
    try {
      const params = new URLSearchParams();
      
      // Apenas adiciona filtros se tiverem valores
      if (filters.category) params.append('category', filters.category);
      if (filters.city) params.append('city', filters.city);
      
      const queryString = params.toString();
      const url = queryString ? `/instructors?${queryString}` : '/instructors';
      
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      console.error('List instructors error:', error.response?.data || error.message);
      throw error;
    }
  },

  async getById(id: string): Promise<Instructor> {
    const response = await api.get(`/instructors/${id}`);
    return response.data;
  },

  async create(data: any) {
    const response = await api.post('/instructors', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await api.patch(`/instructors/${id}`, data);
    return response.data;
  },
};
