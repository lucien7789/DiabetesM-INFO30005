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
            },
            {
                "prefix": "/data-entry/blood-glucose",
                "path": "api/data/bloodGlucoseApi.js"
            }
            // {
            //     "prefix": "/data-entry/exercise",
            //     "path": "api/data/exerciseApi.js"
            // },
            // {
            //     "prefix": "/data-entry/weight",
            //     "path": "api/data/weightApi.js"
            // },
            // {
            //     "prefix": "/data-entry/insulin",
            //     "path": "api/data/insulinApi.js"
            // }
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
            },
            {
                "prefix": "/patient",
                "path": "api/views/patientViewsApi.js"
            },
            {
                "prefix": "/patient/data",
                "path": "api/views/dataViewApi.js"
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