const config = {
    "apiModules": {
        "dataApi": [
            {
                "prefix": "/sample",
                "path": "api/data/sampleApi.js"
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
                "path": "api/views/aboutViewsApi.js"
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