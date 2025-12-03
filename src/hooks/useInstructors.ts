import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instructorsService, InstructorFilters } from '@/services/instructors.service';

export const useInstructors = (filters: InstructorFilters = {}) => {
  return useQuery({
    queryKey: ['instructors', filters],
    queryFn: () => instructorsService.list(filters),
  });
};

export const useInstructor = (id: string) => {
  return useQuery({
    queryKey: ['instructor', id],
    queryFn: () => instructorsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: instructorsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
    },
  });
};

export const useUpdateInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      instructorsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', variables.id] });
    },
  });
};
