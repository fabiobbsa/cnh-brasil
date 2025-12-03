import api from '@/lib/api';

export interface Category {
  id: string;
  code: string;
  name: string;
  description?: string;
  vehicleType?: string;
  displayOrder: number;
}

export const categoriesService = {
  async list(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data;
  },

  async getById(id: string): Promise<Category> {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};
