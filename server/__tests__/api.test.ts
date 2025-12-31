import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  res.status(201).json({ success: true, id: 1 });
});

app.post('/api/sow', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({ sow: {}, html: '<div>SOW</div>' });
});

describe('API Endpoints', () => {
  describe('POST /api/contact', () => {
    it('should return 201 for valid contact submission', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({
          name: 'Test User',
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/sow', () => {
    it('should return 401 for unauthenticated requests', async () => {
      const response = await request(app)
        .post('/api/sow')
        .send({});
      
      expect(response.status).toBe(401);
    });

    it('should return 200 for authenticated requests', async () => {
      const response = await request(app)
        .post('/api/sow')
        .set('Authorization', 'Bearer test-token')
        .send({});
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sow');
      expect(response.body).toHaveProperty('html');
    });
  });
});
