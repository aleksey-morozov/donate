module.exports = {
    mongo: {
        port: process.env.MONGO_PORT || '27017',
        host: process.env.MONGO_URI || 'localhost',
        user: process.env.MONGO_USER || '',
        password: process.env.MONGO_PASSWORD || '',
    },
}