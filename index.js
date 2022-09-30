const TENANT = 'xxx.us.qlikcloud.com';
const WEBINTEGRATIONID = 'xxx';
const APPID = 'xxx';
const IDENTITY = '123456';

// LISTOBJECT DEF
const regionListDef = {
    "qInfo": {
        "qType": "filter"
    },
    "qListObjectDef": {
        "qDef": {
            "qFieldDefs": ["Region"]
        },
        "qInitialDataFetch": [
            {
                "qLeft": 0,
                "qWidth": 1,
                "qTop": 0,
                "qHeight": 10
            }
        ]
    }
};

// HYPERCUBE DEF
const chartDef = {
    "qInfo": {
        "qType": "chart"
    },
    "qHyperCubeDef": {
        "qDimensions": [
            {
                "qDef": {
                    "qFieldDefs": ["Region"],
                    "qSortCriterias": [
                        {
                            "qSortByNumeric": 1
                        }
                    ]
                },
                "qNullSuppression": true
            }
        ],
        "qMeasures": [
            {
                "qDef":{
                    "qDef": "=Sum([Sales Quantity]*[Sales Price])"
                }
            }
        ],
        "qInitialDataFetch": [
            {
                "qLeft": 0,
                "qWidth": 2,
                "qTop": 0,
                "qHeight": 1000
            }
        ]
    }
};


// MAIN 
(async function main() {

    await qlikLogin();
    const qcsHeaders = await getQCSHeaders();
    const [session, enigmaApp] = await connectEnigma(qcsHeaders, APPID, IDENTITY);

    // REGION FILTER (LIST OBJECT)
    const regionListElem = document.querySelector("#region");
    const NebulaChartElem = document.querySelector("#nebula-chart");
    
    const regionObj = await enigmaApp.createSessionObject(regionListDef);
    const regionLayout = await regionObj.getLayout();
    renderFilter(regionListElem, regionLayout, regionObj)

    regionObj.on("changed", async () => {
        const regionLayout = await regionObj.getLayout();
        renderFilter(regionListElem, regionLayout, regionObj);
    });

    // CHART (HYPERCUBE)
    const chartObj = await enigmaApp.createSessionObject(chartDef);
    const chartLayout = await chartObj.getLayout();
    renderChart(chartLayout);

    chartObj.on("changed", async () => {
        const chartLayout = await chartObj.getLayout();
        renderChart(chartLayout);
    })
    

    // NEBULA CHART
    // renderNebulaChart(NebulaChartElem, enigmaApp);

})();

