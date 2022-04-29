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
                "prefix": "/data-entry/blood-glucose",
                "path": "api/data/bloodGlucoseApi.js",
                "authenticationLevel": 0
            },
            {
                "prefix": "/patientData",
                "path": "api/data/patientDataApi.js",
                "authenticationLevel": 0
            },
            {
                "prefix": "/clinicianData",
                "path": "api/data/clinicianDataApi.js",
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
            },
            {
                "prefix": "/clinician",
                "path": "api/views/clinicianViewApi.js",
                "authenticationLevel": 1
            },
            {
                "prefix": "/patient",
                "path": "api/views/patientViewApi.js",
                "authenticationLevel": 0
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
