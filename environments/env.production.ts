export default {
    API: {
        NAME: 'NodeJS Microservice',
        PORT: 5000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SHAREDSECRET: 'KaTMyRgQ4MD5lzsaDlJw2uCFNN2exciJ3NahyvcH',
        EXPIRES: '120s'
    },
    MONGODB: {
        HOST: '127.0.0.1',
        PORT: 27017,
        USER_NAME: 'dboperator',
        USER_PASSWORD: 'whateverman123',
        DEFAULT_DATABASE: 'mtwdm'
    }
};