const config = {
    PORT: process.env.PORT || 3001,
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        USER: process.env.DB_USER || 'root',
        PASSWORD: process.env.DB_PASSWORD || '1004189034',
        NAME: process.env.DB_NAME || 'rubricac2',
        PORT: process.env.DB_PORT || 3306
    }
};

export default config;
