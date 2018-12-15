let API = {
    "access_token":"eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIwY2EzODc5YS0yMjI0LTRkNjctYWExMy0wODY1NDQzMDNiZjUiLCJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbImNsaWVudHMucmVhZCIsImhpc3Rvcmlhbl9yZXN0X2FwaS5yZWFkIiwicGFzc3dvcmQud3JpdGUiLCJjbGllbnRzLnNlY3JldCIsImhpc3Rvcmlhbl9yZXN0X2FwaS5hZG1pbiIsImhpc3Rvcmlhbl9yZXN0X2FwaS53cml0ZSIsImNsaWVudC5hZG1pbiIsImNsaWVudHMud3JpdGUiLCJ1YWEuYWRtaW4iLCJzY2ltLndyaXRlIiwic2NpbS5yZWFkIl0sInNjb3BlIjpbImNsaWVudHMucmVhZCIsImhpc3Rvcmlhbl9yZXN0X2FwaS5yZWFkIiwicGFzc3dvcmQud3JpdGUiLCJjbGllbnRzLnNlY3JldCIsImhpc3Rvcmlhbl9yZXN0X2FwaS5hZG1pbiIsImhpc3Rvcmlhbl9yZXN0X2FwaS53cml0ZSIsImNsaWVudC5hZG1pbiIsImNsaWVudHMud3JpdGUiLCJ1YWEuYWRtaW4iLCJzY2ltLndyaXRlIiwic2NpbS5yZWFkIl0sImNsaWVudF9pZCI6ImFkbWluIiwiY2lkIjoiYWRtaW4iLCJhenAiOiJhZG1pbiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNGJlMWJiYzAiLCJpYXQiOjE1NDQ3NDcyNTMsImV4cCI6MTU0NDc5MDQ1MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJhZG1pbiIsImNsaWVudHMiLCJoaXN0b3JpYW5fcmVzdF9hcGkiLCJwYXNzd29yZCIsImNsaWVudCIsInVhYSIsInNjaW0iXX0.Ap4JfxnXSTWs7yYIsOA9_2BkS0JEGcMlVq9UAhehLSFijZ335hj7n7FpVMqu4jNJIV5PCXcBucy4KlSvInXCeh4yDVHSkGpp6TAC8Qa-qJwJXVvZwkoEyMNFx2CBXOyLIBsP0fewxs3C4SN0PhcID5nH3dH-x2KfI1zAoWbDFrrPCO-19iiR2uN_B0kote09S3p-a5RpFo7kD_JaSXAJUZIMDtkKF856yxb79cBqiIfvyvembkUJCvxzWyDwvKfUOfVo5nwKPf8tqFWsS63cCgRV6-EACu6IUpfFTd9hc6FnuujHE9V3dBCIuIAQ6rl1HOU1LomX9uGPNz2p-u9lZQ",
    "url": "http://10.1.1.31:80/historian-rest-api/v1/datapoints/calculated/WIN-9DBOGP80695.Simulation00052/2018-10-02T11:30:00.111Z/2018-10-09T11:30:11.111Z/1/10/5000"
};


let valuesArray = [];
let timeArray = [];
let samplesSource = 'WIN-9DBOGP80695.Simulation00052';
let chartType = {
    bar: 'bar',
    line: 'line'
};

const option = {
    title: {
        text: samplesSource
    },
    tooltip: {},
    legend: {
        data:[]
    },
    xAxis: {
        data: timeArray,
        // category: 'time'
    },
    yAxis: {},
    series: [{
        name: samplesSource,
        type: chartType.bar,
        data: valuesArray
    }]
};

async function getValues() {
    try {
        console.log('button clicked');

        let xhr = new XMLHttpRequest();
        // xhr.open('GET', `${API.url}`, true);
        // xhr.setRequestHeader('Authorization', 'Bearer ' + API.access_token);
        xhr.open('GET', `./data/WIN-9DBOGP80695.Simulation00052.json`, true);

        xhr.onload = async () => {
            if(xhr.status === 200) {
                console.log(xhr.responseText);
                let sampleValues = await JSON.parse(xhr.responseText);
                console.log(sampleValues);
                sampleValues.forEach(value => {
                    // console.log(value.Value);
                    // console.log(value.TimeStamp);
                    timeArray.push(simplifyTime(value.TimeStamp));
                    // valuesArray.push(Math.ceil(value.Value));
                    valuesArray.push((parseInt(value.Value)).toFixed(0));
                    plotChart();
                })

            }
        };

        xhr.send();

    } catch (e) {
        console.log(e);
    }
}

function simplifyTime(timestamp) {
    return timestamp.slice(0, 19);
}

let plot = echarts.init(document.querySelector('#main'));

function plotChart() {
    plot.setOption(option);
}





