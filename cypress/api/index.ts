import { agent as request } from "supertest";

export default { 
    /**
     * Login by api
     * @returns response from `/user/login` endpoint
     */
    _loginApi: async function(_envUrl, _username, _password){
        const response = await request(_envUrl)
        .post('/user/login')
        .send({
            username:_username,
            password:_password
        })
        .expect('Content-Type', /json/)
        .expect(200);

        return response;
    }
};