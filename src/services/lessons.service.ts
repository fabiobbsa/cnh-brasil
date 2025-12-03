import api from '@/lib/api';

export interface Lesson {
  id: string;
  scheduledDate: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  durationHours: number;
  pickupLocation: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  priceAgreed: number;
  instructor: {
    id: string;
    user: {
      fullName: string;
      avatarUrl?: string;
    };
  };
  student: {
    id: string;
    fullName: string;
  };
  category: {
    code: string;
    name: string;
  };
}

export interface CreateLessonData {
  instructorId: string;
  categoryId: string;
  scheduledDate: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  durationHours: number;
  pickupLocation: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  priceAgreed: number;
}

export const lessonsService = {
  async list(): Promise<Lesson[]> {
    const response = await api.get('/lessons');
    return response.data;
  },

  async getById(id: string): Promise<Lesson> {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  async create(data: CreateLessonData): Promise<Lesson> {
    const response = await api.post('/lessons', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateLessonData>) {
    const response = await api.patch(`/lessons/${id}`, data);
    return response.data;
  },

  async cancel(id: string, reason: string) {
    const response = await api.patch(`/lessons/${id}`, {
      status: 'CANCELLED',
      cancellationReason: reason,
    });
    return response.data;
  },
};
