import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Portal API',
            version: '1.0.0',
            description: 'This is the API documentation for the Job Portal'
        },
        server: [
             {
                url: 'http://localhost:3000',
                description: 'Development server'
             }
        ]
    },
    apis: ['./src/routes/*.ts'],
};


export const OpenAPISpecs = swaggerJSDoc(options);