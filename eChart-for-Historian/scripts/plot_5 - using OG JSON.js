// Node.js server URL
const serverUrl = '/api';

const getData = document.querySelector('#getData');
getData.addEventListener('click', getValues);

let valuesArray = [];
let timeArray = [];
let samplesSource = 'WIN-9DBOGP80695.Simulation00052';
let chartType = {
    bar: 'bar',
    line: 'line'
};

const option = {
    title: {
        text: samplesSource,
        // textStyle: {align: center}
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
        let data = await fetch(serverUrl);
        let historianData = await data.json();
        console.log(historianData);
        // let timeStampsAndValues = historianData.Data[0].Samples;
        // timeStampsAndValues.forEach(value => {
        //     // console.log(value.Value);
        //     console.log(value.TimeStamp);
        //     timeArray.push(simplifyTime(value.TimeStamp));
        //     // valuesArray.push(Math.ceil(value.Value));
        //     valuesArray.push((parseInt(value.Value)).toFixed(0));
        //     plotChart();
        // })
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









