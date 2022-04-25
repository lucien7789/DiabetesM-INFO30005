const config = {
    "apiModules": {
        "dataApi": [
            {
                "prefix": "/sample",
                "path": "api/data/sampleApi.js"
            }
        ],
        "viewApi": [
            {
                "prefix": "/about",
                "path": "api/views/aboutViewsApi.js"
            },
            {
                "prefix": "/patient",
                "path": "api/views/patientViewsApi.js"
            },
            {
                "prefix": "/",
                "path": "api/views/homeViewApi.js"
            }
        ]
    },
    "projectDir": __dirname
    
}

module.exports = config;