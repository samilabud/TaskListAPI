import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('End to End tests for API Task List', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET) - Show list of task created', async () => {
    const response = await request(app.getHttpServer()).get('/tasks');

    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          status: expect.any(String),
        }),
      ]),
    );
  });

  it('/tasks (POST)', async () => {
    const postData = {
      title: 'Task',
      description: 'Task 2 description',
    };
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(postData);

    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '1',
          title: 'First task',
          description: 'Some Task',
          status: 'PENDING',
        }),
        expect.objectContaining({
          id: expect.any(String),
          title: postData.title,
          description: postData.description,
          status: 'PENDING',
        }),
      ]),
    );
    expect(response.body).toHaveLength(2);
  });

  afterAll(async () => {
    await app.close();
  });
});
