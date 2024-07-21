import dotenv from 'dotenv';
dotenv.config();

interface Config {
    PORT: number;
    MONGODB_URI: string;
    SECRET_KEY: string;
    DB_NAME: string;
    CORS_ORIGIN: string;
}

const config: Config = {
    PORT: parseInt(process.env.PORT || '1000', 10),
    MONGODB_URI: process.env.MONGODB_URI as string,
    SECRET_KEY: process.env.SECRET_KEY as string,
    DB_NAME: process.env.DB_NAME as string,
    CORS_ORIGIN: process.env.CORS_ORIGIN as string
};

export default config;
