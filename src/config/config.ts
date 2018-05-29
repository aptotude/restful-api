export class Config {
  public environment: string;
  public loggly: {
    inputToken: string,
    level?: string,
    subdomain: string,
    tags: string[]
  };
  public mailgun: {
    domain: string,
    key: string
  };
  public mongo: {
    host: string,
    port: string,
    database: string
  };
  public passwordReset: {
    company: string,
    from: string,
    url: string
  };
  public server: {
    host: string,
    port: string
  };

  constructor(env?: string) {
    this.environment = process.env.ENVIRONMENT;

    this.mailgun = {
      domain: process.env.MAILGUN_DOMAIN,
      key: process.env.MAILGUN_KEY
    };

    this.mongo = {
      database: process.env.MONGO_DATABASE,
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT
    };

    this.passwordReset = {
      company: process.env.PASSWORD_RESET_COMPANY,
      from: process.env.FROM,
      url: process.env.URL
    };

    this.server = {
      host: process.env.SERVER_HOST,
      port: process.env.SERVER_PORT
    };
  }
}
