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
        EXPIRES: '300s'
    },
    MONGODB: {
        HOST: 'mymongo',
        PORT: 28017,
        USER_NAME: 'dboperator',
        USER_PASSWORD: 'whateverman123',
        DEFAULT_DATABASE: 'mtwdm'
    }
};