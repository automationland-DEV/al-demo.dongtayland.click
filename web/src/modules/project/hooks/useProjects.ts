'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ProjectService } from '../services/project.service';
import type { ProjectQuery } from '../models/project.model';

/**
 * Query key phai chua MOI tham so anh huong den ket qua, neu khong
 * doi filter se tra ve cache cu.
 */
const projectListKey = (query: ProjectQuery) => ['projects', query] as const;

export const useProjectList = (query: ProjectQuery) =>
  useQuery({
    queryKey: projectListKey(query),
    queryFn: () => ProjectService.list(query),
    // Giu du lieu trang truoc khi chuyen trang de bang khong bi trang trong
    placeholderData: keepPreviousData,
  });

export const useProjectFilterOptions = () =>
  useQuery({
    queryKey: ['project-filter-options'],
    queryFn: () => ProjectService.filterOptions(),
    staleTime: 5 * 60 * 1000,
  });

export const useProjectHighlights = () =>
  useQuery({
    queryKey: ['project-highlights'],
    queryFn: () => ProjectService.highlights(),
    staleTime: 5 * 60 * 1000,
  });
