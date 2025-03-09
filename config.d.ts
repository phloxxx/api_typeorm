declare module "../config.json" {
    const value: {
        database: {
            host: string;
            port: number;
            user: string;
            password: string;
            database: string;
        };
    };
    export default value;
}
