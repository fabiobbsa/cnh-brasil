import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonsService, CreateLessonData } from '@/services/lessons.service';

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: lessonsService.list,
  });
};

export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => lessonsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLessonData) => lessonsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateLessonData> }) =>
      lessonsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['lesson', variables.id] });
    },
  });
};

export const useCancelLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      lessonsService.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};
