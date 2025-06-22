export const appConfiguration = () => ({
  port: Number(process.env.PORT) || 3000,
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/nest-pokemon',
  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 10,
});
