import Express from 'express';
import { Request, Response } from 'express';
import { DEBUG, COLOR } from './utils/debug';
import { APIUtils, APIStatusEnum }  from './utils/api.utils'
import jwt from 'jsonwebtoken';
import ENV from './environments/env.production'
import AuthToken from './middleware/token.middleware'
import MongoDBHelper from './helpers/mongodb.helper'
import MongoDBClient from 'mongodb'
//Environments
//const env = {
//    EXPRESS_PORT: process.env.EXPRESS_PORT || 5000,
//    NAME: process.env.EXPRESS_NAME || 'POS Micro-service made with NodeJS',
//    ENVIRONMENT: process.env.EXPRESS_ENVIRONMENT || 'Development',   
//};

//Variables
const debug = DEBUG();
const color = COLOR();
const app = Express();
const apiUtils = APIUtils(ENV);
const token = AuthToken(ENV);
const mongodb = MongoDBHelper.getInstance(ENV);

app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
// cors is missing

app.post('/login', (req: Request, res: Response) => {
    
    const {userName, password} = req.body;
    
    const mockUser = {
        username: 'robertomercado',
        pass: 'whatevermate',
        email: 'robertomercado@lilmonika.info',
        fullName: 'Roberto Mercado',
    }

    const mockRoles = ['Captura_Rol','Admon_Catalogos_Rol','Print_Rol']

    if(userName === mockUser.username && password === mockUser.pass) {

        const payload = {
            username: mockUser.username,
            email: mockUser.email,
            fullName: mockUser.fullName,
            roles: mockRoles        
        }

        jwt.sign(payload, ENV.TOKEN.SHAREDSECRET, {expiresIn: ENV.TOKEN.EXPIRES}, (err, token) => {
            if(err) {
                return res.status(APIStatusEnum.Internal_Server_Error).json(
                    apiUtils.BodyResponse(APIStatusEnum.Internal_Server_Error, 'Internal Server Error', 'JWT token creation error.', null, err)
                )
            }

            return res.status(APIStatusEnum.Success).json(
                apiUtils.BodyResponse(APIStatusEnum.Success, 'OK', 'JWT token succesfully created.', { userName: mockUser.username, token }, null)
            )
        });
    } else {
        return res.status(APIStatusEnum.Forbidden).json(
            apiUtils.BodyResponse(APIStatusEnum.Forbidden, 'Forbidden', 'Invalid login credentials.', {msg: 'Invalid credentials.'}, null)
        )
    }
})

//Routes
app.get('/products', token.verify, async (req: Request, res:Response) => {

    const result = await mongodb.db.collection('cars').find({}).toArray();
    
    res.status(APIStatusEnum.Success).json(
        apiUtils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'Successful request.', {
                result,
                authUser: req.body.authUser
            }
        )
    );
});


app.get('/product/:id', token.verify, async (req: Request, res:Response) => {
    const { id } = req.params;
    
    const _id = new MongoDBClient.ObjectID(id);

    const result = await mongodb.db.collection('cars').find({_id}).toArray();
    
    res.status(APIStatusEnum.Success).json(
        apiUtils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'Successful request.', {
                result,
                authUser: req.body.authUser
            }
        )
    );
});

//TODO: Search cars by category

//TODO: Search cars by keywords

//Start Express Server
app.listen(ENV.API.PORT, async() => {
    try {
        await mongodb.connect();
    } catch(error) {
        process.exit();
    }
    debug.express(`${color.express('Express')} Server ${color.success('started')} at port ${ENV.API.PORT} ..`);
});