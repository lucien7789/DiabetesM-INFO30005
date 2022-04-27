const config = {
    "apiModules": {
        "dataApi": [
            {
                "prefix": "/sample",
                "path": "api/data/sampleApi.js"
            },
            {
                "prefix": "/user",
                "path": "api/data/userApi.js"
            },
            {
                "prefix": "/patient",
                "path": "api/data/patientOnlyApiTest.js",
                "authenticationLevel": 0
            },
            {
                "prefix": "/admin",
                "path": "api/data/adminOnlyApiTest.js",
                "authenticationLevel": 1
            }
        ],
        "viewApi": [
            {
                "prefix": "/about",
                "path": "api/views/aboutViewApi.js"
            },
            {
                "prefix": "/",
                "path": "api/views/homeViewApi.js"
            },
            {
                "prefix": "/auth",
                "path": "api/views/authViewApi.js"
            }
        ]
    },
    "authMiddleware": [
        {
            "level": 0,
            "path": "middleware/patientAuthMiddleware.js"
        },
        {
            "level": 1,
            "path": "middleware/adminAuthMiddleware.js"
        }
    ],
    "projectDir": __dirname
    
}

module.exports = config;