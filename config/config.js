/**
 * Created by Administrator on 2016/7/20.
 */
const path =  require('path');

const App = {
    
    version: "0.1.0",
    
    dev: {
        db:{
           connection : "mongodb://localhost:27017/hunter"  
        } ,
        session: {
            host: "127.0.0.1",
            port: '27017',
            db: "session",
            url: 'mongodb://127.0.0.1:27017/hunter',
            ttl: 60 * 60 * 24 * 7 //7 days
        },
        cookie: { 
            maxAge: 60 * 60 * 24 * 7 
        }
    },
    
    product:{
        db:{
            connection : "mongodb://localhost:27017/hunter"
        } ,
        session: {
            host: "127.0.0.1",
            port: '27017',
            db: "session",
            url: 'mongodb://127.0.0.1:27017/hunter',
            ttl: 60 * 60 * 24 * 7 //7 days
        },
        cookie: {
            maxAge: 60 * 60 * 24 * 7
        }
    }
}

const env = App.dev

module.exports = {
    dbSource: env.db.connection,
    session : env.session,
    cookie: env.cookie
}