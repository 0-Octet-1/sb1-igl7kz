import { describe, it, expect, vi } from 'vitest';
import { updateModuleProgress, getCourseProgress, generateCertificate } from '../../lib/api/progress';
import { submitQuizAnswers } from '../../lib/api/quiz';

vi.mock('../../lib/api/progress');
vi.mock('../../lib/api/quiz');

describe('Course Progress Integration', () => {
  const userId = 'test-user';
  const courseId = 'test-course';
  const moduleId = 'test-module';

  it('should update progress after completing module', async () => {
    const mockQuizAnswers = {
      question1: 'answer1',
      question2: 'answer2'
    };

    vi.mocked(submitQuizAnswers).mockResolvedValue({
      id: 'quiz-1',
      score: 100,
      passed: true
    });

    vi.mocked(updateModuleProgress).mockResolvedValue({
      completed: true,
      progress: 100
    });

    await submitQuizAnswers(userId, courseId, moduleId, mockQuizAnswers);

    await updateModuleProgress(userId, courseId, moduleId, {
      completed: true,
      timeSpent: 300,
      lastAccessed: new Date()
    });

    const progress = await getCourseProgress(userId, courseId);
    expect(progress.completedModules).toContain(moduleId);
  });

  it('should generate certificate when course completed', async () => {
    const mockProgress = {
      progress: 100,
      completedModules: ['module1', 'module2'],
      totalModules: 2,
      completed: true
    };

    vi.mocked(getCourseProgress).mockResolvedValue(mockProgress);
    vi.mocked(generateCertificate).mockResolvedValue({
      id: 'cert-1',
      certificateNumber: 'CERT-123',
      issuedAt: new Date()
    });

    const progress = await getCourseProgress(userId, courseId);
    
    if (progress.progress === 100) {
      const certificate = await generateCertificate(userId, courseId);
      expect(certificate).toBeDefined();
      expect(certificate.certificateNumber).toMatch(/CERT-\d+/);
    }
  });
});