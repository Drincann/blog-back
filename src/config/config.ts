export default {
  port: 8080,
  host: undefined, // default 127.0.0.1
  env: 'dev',
} as {
  port: number;
  host: string | undefined;
  env: 'dev' | 'prod';
}