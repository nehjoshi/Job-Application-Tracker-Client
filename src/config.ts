interface Config {
    BASE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
  
  const getEnvVar = (name: string, defaultValue?: string): string => {
    const value = process.env[name];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
  };
  
  const config: Config = {
    BASE_URL: getEnvVar('REACT_APP_BASE_URL', 'http://localhost:5000/api/v1'),
    NODE_ENV: getEnvVar('NODE_ENV') as 'development' | 'production' | 'test',
  };
  
  export default config;
  