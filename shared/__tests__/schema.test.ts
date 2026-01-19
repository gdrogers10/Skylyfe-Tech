import { sowFormSchema, type SowFormData } from '../schema';

describe('SOW Form Schema Validation', () => {
  const validFormData: SowFormData = {
    contact: {
      name: 'John Doe',
      email: 'john@example.com',
      organization: 'Acme Corp',
      role: 'CTO',
      phone: '555-1234',
    },
    projectBasics: {
      serviceTypes: ['ai-ml-genai'],
      projectTitle: 'AI Customer Service Bot',
      goals: 'Build an intelligent chatbot to handle customer inquiries',
      audience: 'Customer support team',
      desiredOutcomes: 'Reduce support tickets by 50%',
    },
    timeline: {
      duration: '4 weeks',
      budgetBand: '$5-15k',
    },
    techContext: {
      toolsOfInterest: ['AI/ML', 'Custom Development'],
      integrations: 'Salesforce CRM',
      dataSecurityNeeds: 'HIPAA compliance required',
    },
    deliverables: {
      suggested: ['AI strategy document', 'Custom ML model'],
      custom: ['Monthly analytics report'],
    },
    successMetrics: {
      predefined: ['Prototype delivered and functional'],
      custom: 'Customer satisfaction score above 90%',
    },
    legal: {
      ipOwnership: 'client',
      confidentiality: true,
      accessibility: true,
      dataSecurity: 'Data must be encrypted at rest',
    },
  };

  describe('Contact Section', () => {
    it('should validate valid contact information', () => {
      const result = sowFormSchema.safeParse(validFormData);
      expect(result.success).toBe(true);
    });

    it('should require name field', () => {
      const data = {
        ...validFormData,
        contact: { ...validFormData.contact, name: '' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('name'))).toBe(true);
      }
    });

    it('should require valid email', () => {
      const data = {
        ...validFormData,
        contact: { ...validFormData.contact, email: 'invalid-email' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('email'))).toBe(true);
      }
    });

    it('should allow optional organization, role, and phone', () => {
      const data = {
        ...validFormData,
        contact: { 
          name: 'John Doe', 
          email: 'john@example.com',
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('Project Basics Section', () => {
    it('should require at least one service type', () => {
      const data = {
        ...validFormData,
        projectBasics: { ...validFormData.projectBasics, serviceTypes: [] },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('serviceTypes'))).toBe(true);
      }
    });

    it('should require project title', () => {
      const data = {
        ...validFormData,
        projectBasics: { ...validFormData.projectBasics, projectTitle: '' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('projectTitle'))).toBe(true);
      }
    });

    it('should require goals with minimum 10 characters', () => {
      const data = {
        ...validFormData,
        projectBasics: { ...validFormData.projectBasics, goals: 'short' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('goals'))).toBe(true);
      }
    });

    it('should allow multiple service types', () => {
      const data = {
        ...validFormData,
        projectBasics: { 
          ...validFormData.projectBasics, 
          serviceTypes: ['ai-ml-genai', 'spatial-ar', 'iot-gps-tracking'] 
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('Timeline & Budget Section', () => {
    it('should accept all valid week durations', () => {
      const weekDurations = ['2 weeks', '4 weeks', '8 weeks', '12 weeks'];
      weekDurations.forEach(duration => {
        const data = {
          ...validFormData,
          timeline: { ...validFormData.timeline, duration },
        };
        const result = sowFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should accept all valid month durations', () => {
      const monthDurations = ['3 months', '6 months', '9 months', '12 months'];
      monthDurations.forEach(duration => {
        const data = {
          ...validFormData,
          timeline: { ...validFormData.timeline, duration },
        };
        const result = sowFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid duration', () => {
      const data = {
        ...validFormData,
        timeline: { ...validFormData.timeline, duration: '5 weeks' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should accept all valid budget bands', () => {
      const budgetBands = ['$500-$1k', '<$5k', '$5-15k', '$15-40k', '$40k+'];
      budgetBands.forEach(budgetBand => {
        const data = {
          ...validFormData,
          timeline: { ...validFormData.timeline, budgetBand },
        };
        const result = sowFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid budget band', () => {
      const data = {
        ...validFormData,
        timeline: { ...validFormData.timeline, budgetBand: '$100k' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('Tech Context Section', () => {
    it('should accept empty tools of interest', () => {
      const data = {
        ...validFormData,
        techContext: { ...validFormData.techContext, toolsOfInterest: [] },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept multiple tools of interest', () => {
      const data = {
        ...validFormData,
        techContext: { 
          ...validFormData.techContext, 
          toolsOfInterest: ['AI/ML', 'AR/VR', '3D Printing', 'IoT/GPS'] 
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should allow optional integrations and security needs', () => {
      const data = {
        ...validFormData,
        techContext: { 
          toolsOfInterest: [],
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('Deliverables Section', () => {
    it('should accept suggested and custom deliverables', () => {
      const data = {
        ...validFormData,
        deliverables: {
          suggested: ['AI strategy document', 'Custom ML model', 'API integrations'],
          custom: ['Weekly progress reports', 'User training sessions'],
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept empty deliverables arrays', () => {
      const data = {
        ...validFormData,
        deliverables: {
          suggested: [],
          custom: [],
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('Success Metrics Section', () => {
    it('should accept predefined and custom metrics', () => {
      const data = {
        ...validFormData,
        successMetrics: {
          predefined: ['Prototype delivered and functional', 'AR experience live and accessible'],
          custom: 'User adoption rate above 80%',
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should allow empty predefined metrics', () => {
      const data = {
        ...validFormData,
        successMetrics: {
          predefined: [],
          custom: 'Custom success criteria only',
        },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('Legal Section', () => {
    it('should accept all IP ownership options', () => {
      const ipOptions = ['client', 'shared', 'skylyfe'];
      ipOptions.forEach(ipOwnership => {
        const data = {
          ...validFormData,
          legal: { ...validFormData.legal, ipOwnership },
        };
        const result = sowFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid IP ownership option', () => {
      const data = {
        ...validFormData,
        legal: { ...validFormData.legal, ipOwnership: 'invalid' },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should require boolean for confidentiality', () => {
      const data = {
        ...validFormData,
        legal: { ...validFormData.legal, confidentiality: false },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should require boolean for accessibility', () => {
      const data = {
        ...validFormData,
        legal: { ...validFormData.legal, accessibility: false },
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('Full Form Submission', () => {
    it('should validate complete valid form data', () => {
      const result = sowFormSchema.safeParse(validFormData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validFormData);
      }
    });

    it('should fail with completely empty form', () => {
      const result = sowFormSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should fail with missing required sections', () => {
      const data = {
        contact: validFormData.contact,
      };
      const result = sowFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
